import { AdminPage } from "@/components/admin/admin-page";
import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  // Fetch all data in parallel
  const [
    { data: waitlist, error: waitlistError },
    { data: settings, error: settingsError },
    { data: features, error: featuresError }
  ] = await Promise.all([
    supabase.from('waitlist').select('email, created_at').order('created_at', { ascending: false }),
    supabase.from('site_settings').select('*'),
    supabase.from('features').select('*').order('created_at', { ascending: true })
  ]);

  const schemaError = settingsError?.code === '42P01' || featuresError?.code === '42P01';

  if (waitlistError) console.error("Error fetching waitlist:", waitlistError.message);
  if (featuresError && !schemaError) console.error("Error fetching features:", featuresError.message);
  if (settingsError && !schemaError) console.error("Error fetching settings:", settingsError.message);

  return (
    <main>
      <AdminPage 
        user={user} 
        waitlist={waitlist ?? []}
        settings={settings ?? []}
        features={features ?? []}
        schemaError={schemaError}
      />
    </main>
  );
}
