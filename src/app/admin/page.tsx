import { AdminPage } from "@/components/admin/admin-page";
import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';
import type { User } from "@supabase/supabase-js";

export default async function Page() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Redirect to home page if not authenticated
    return redirect('/');
  }

  return (
    <main>
      <AdminPage user={user} />
    </main>
  );
}
