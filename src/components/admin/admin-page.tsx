import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersTable } from "@/components/admin/users-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { signOut } from "@/app/actions";
import { WaitlistTable } from "./waitlist-table";
import { SiteSettings } from "./site-settings";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";

const users = [
  {
    id: "usr_1",
    name: "Amina Okoro",
    email: "amina.o@vireo.africa",
    role: "Admin",
    status: "Active",
    avatarUrl: "https://placehold.co/100x100.png",
  },
  {
    id: "usr_2",
    name: "Jide Bello",
    email: "jide.b@vireo.com",
    role: "Student",
    status: "Active",
    avatarUrl: "https://placehold.co/100x100.png",
  },
  {
    id: "usr_3",
    name: "Fatima Al-Hassan",
    email: "fatima.a@vireo.co",
    role: "Architect",
    status: "Banned",
    avatarUrl: "https://placehold.co/100x100.png",
  },
  {
    id: "usr_4",
    name: "Kwame Asante",
    email: "kwame.a@vireo.io",
    role: "Student",
    status: "Active",
    avatarUrl: "https://placehold.co/100x100.png",
  },
  {
    id: "usr_5",
    name: "Zuri Kimani",
    email: "zuri.k@vireo.design",
    role: "Client",
    status: "Active",
    avatarUrl: "https://placehold.co/100x100.png",
  },
   {
    id: "usr_6",
    name: "John Doe",
    email: "john.d@vireo.com",
    role: "Architect",
    status: "Active",
    avatarUrl: "https://placehold.co/100x100.png",
  },
];


type WaitlistItem = {
  email: string;
  created_at: string;
};

type SettingItem = {
  key: string;
  value: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
};

function SchemaErrorDisplay() {
  const setupSql = `-- Site Settings Table for launch date and feature flags
CREATE TABLE IF NOT EXISTS "public"."site_settings" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS for site_settings: Allow public read-only access
ALTER TABLE "public"."site_settings" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to site settings" ON "public"."site_settings"
    FOR SELECT
    USING (true);

-- RLS for site_settings: Allow admin full access
CREATE POLICY "Allow full access to admin users on site settings" ON "public"."site_settings"
    FOR ALL
    USING ( (SELECT auth.uid() IN ( SELECT profiles.id FROM profiles WHERE profiles.role = 'admin' )) )
    WITH CHECK ( (SELECT auth.uid() IN ( SELECT profiles.id FROM profiles WHERE profiles.role = 'admin' )) );

-- Trigger to automatically update "updated_at" timestamp on change
CREATE OR REPLACE FUNCTION "public"."handle_site_settings_updated_at"()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "on_site_settings_update"
BEFORE UPDATE ON "public"."site_settings"
FOR EACH ROW
EXECUTE PROCEDURE "public"."handle_site_settings_updated_at"();

-- Seed the default launchDate setting, if it doesn't already exist.
INSERT INTO "public"."site_settings" ("key", "value", "description")
VALUES 
    ('launchDate', '2026-01-01T00:00:00Z', 'The target date and time for the public launch countdown timer.'),
    ('heroHeadline', 'Vireo: Architect the Future', 'The main headline for the hero section.'),
    ('heroSubheadline', 'Unleash your creativity with AI-powered design tools, collaborative platforms, and immersive AR/VR portfolios. The next generation of architecture starts here.', 'The subheadline for the hero section.')
ON CONFLICT ("key") DO NOTHING;
`;

  return (
    <Card className="bg-black/20 backdrop-blur-sm border-red-500/50 text-white mt-6">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-red-300 flex items-center gap-2">
            <Terminal /> Database Setup Required
        </CardTitle>
        <CardDescription className="text-red-400">
            The 'site_settings' table is missing from your database. This is required for core site functionality.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Please run the following SQL script in your Supabase SQL Editor to create the table and set the necessary permissions.</p>
        <pre className="bg-gray-900/70 p-4 rounded-md text-xs text-purple-200 overflow-x-auto">
            <code>
                {setupSql}
            </code>
        </pre>
        <p>After running the script, refresh this page.</p>
      </CardContent>
    </Card>
  )
}

export function AdminPage({ 
  user,
  waitlist,
  settings,
  schemaError = false,
}: { 
  user: User,
  waitlist: WaitlistItem[],
  settings: SettingItem[],
  schemaError?: boolean,
}) {
  const launchDateSetting = settings.find(s => s.key === 'launchDate');
  const heroHeadlineSetting = settings.find(s => s.key === 'heroHeadline');
  const heroSubheadlineSetting = settings.find(s => s.key === 'heroSubheadline');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-start sm:items-center">
          <div>
            <h1 className="text-4xl font-bold font-headline tracking-tighter">Vireo Admin</h1>
            <p className="text-purple-200">Manage your MADD ecosystem.</p>
          </div>
           <div className="flex items-center gap-4">
            <span className="text-sm text-purple-300 hidden sm:inline">{user.email}</span>
            <form action={signOut}>
                <Button variant="outline" className="bg-transparent border-purple-500/50 hover:bg-purple-500/20 hover:text-white">Sign Out</Button>
            </form>
          </div>
        </header>

        {schemaError ? (
            <SchemaErrorDisplay />
        ) : (
            <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-purple-900/50 text-purple-200 border-purple-500/50 border">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
                <TabsTrigger value="settings">Site Controls</TabsTrigger>
                <TabsTrigger value="analytics" disabled>Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="mt-6">
                <Card className="bg-black/20 backdrop-blur-sm border-purple-500/30 text-white">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Manage Your Community</CardTitle>
                    <CardDescription className="text-purple-300">View, ban, or promote users to admins. (Demo data)</CardDescription>
                </CardHeader>
                <CardContent>
                    <UsersTable users={users} />
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="waitlist" className="mt-6">
                <Card className="bg-black/20 backdrop-blur-sm border-purple-500/30 text-white">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Waitlist Members</CardTitle>
                    <CardDescription className="text-purple-300">See who's excited for the Vireo launch.</CardDescription>
                </CardHeader>
                <CardContent>
                    <WaitlistTable waitlist={waitlist} />
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
                <Card className="bg-black/20 backdrop-blur-sm border-purple-500/30 text-white">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Control the Vireo Experience</CardTitle>
                    <CardDescription className="text-purple-300">Manage global site settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SiteSettings 
                      launchDateSetting={launchDateSetting}
                      heroHeadlineSetting={heroHeadlineSetting}
                      heroSubheadlineSetting={heroSubheadlineSetting}
                    />
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="analytics" className="mt-6">
                <Card className="bg-black/20 backdrop-blur-sm border-purple-500/30 text-white h-96 flex items-center justify-center">
                    <CardTitle>Analytics Coming Soon</CardTitle>
                </Card>
            </TabsContent>
            </Tabs>
        )}
      </div>
    </div>
  );
}
