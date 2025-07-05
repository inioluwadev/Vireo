import { AdminPage } from "@/components/admin/admin-page";
import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';
import type { User } from "@supabase/supabase-js";

export default async function Page() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Redirect to home page if not authenticated
    return redirect('/login');
  }

  // Fetch waitlist data
  const { data: waitlist, error: waitlistError } = await supabase
    .from('waitlist')
    .select('email, created_at')
    .order('created_at', { ascending: false });

  // Fetch settings data
  const { data: settings, error: settingsError } = await supabase
    .from('site_settings')
    .select('*');

  if (waitlistError) console.error("Error fetching waitlist:", waitlistError.message);
  if (settingsError) console.error("Error fetching settings:", settingsError.message);


  return (
    <main>
      <AdminPage 
        user={user} 
        waitlist={waitlist ?? []}
        settings={settings ?? []}
      />
    </main>
  );
}
