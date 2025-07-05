import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersTable } from "@/components/admin/users-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { signOut } from "@/app/actions";

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

export function AdminPage({ user }: { user: User }) {
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

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-purple-900/50 text-purple-200 border-purple-500/50 border">
            <TabsTrigger value="users">Batch 1: Users</TabsTrigger>
            <TabsTrigger value="content" disabled>Batch 2: Content</TabsTrigger>
            <TabsTrigger value="features" disabled>Batch 3: Features</TabsTrigger>
            <TabsTrigger value="analytics" disabled>Batch 4: Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="mt-6">
            <Card className="bg-black/20 backdrop-blur-sm border-purple-500/30 text-white">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Manage Your Community</CardTitle>
                <CardDescription className="text-purple-300">View, ban, or promote users to admins.</CardDescription>
              </CardHeader>
              <CardContent>
                <UsersTable users={users} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="content">
            <Card className="bg-black/20 backdrop-blur-sm border-purple-500/30 text-white h-96 flex items-center justify-center">
                <CardTitle>Content Management Coming Soon</CardTitle>
            </Card>
          </TabsContent>
          <TabsContent value="features">
             <Card className="bg-black/20 backdrop-blur-sm border-purple-500/30 text-white h-96 flex items-center justify-center">
                <CardTitle>Feature Toggles Coming Soon</CardTitle>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card className="bg-black/20 backdrop-blur-sm border-purple-500/30 text-white h-96 flex items-center justify-center">
                <CardTitle>Analytics Coming Soon</CardTitle>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
