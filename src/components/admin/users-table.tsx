"use client";

import * as React from "react";
import { Ban, MoreHorizontal, Search, ShieldCheck } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Student" | "Architect" | "Client";
  status: "Active" | "Banned";
  avatarUrl: string;
};

type UsersTableProps = {
  users: User[];
};

export function UsersTable({ users: initialUsers }: UsersTableProps) {
  const [users, setUsers] = React.useState(initialUsers);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
    
  const handlePromote = (userId: string) => {
    setUsers(users.map(user => user.id === userId ? { ...user, role: 'Admin' } : user));
    // In a real app, you would also make an API call here.
  };

  const handleBan = (userId: string) => {
    setUsers(users.map(user => user.id === userId ? { ...user, status: user.status === 'Active' ? 'Banned' : 'Active' } : user));
    // In a real app, you would also make an API call here.
  };

  return (
    <div className="w-full">
      <div className="flex items-center pb-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 bg-gray-900/50 border-purple-500/50 focus:ring-purple-500"
          />
        </div>
      </div>
      <div className="rounded-md border border-purple-500/30">
        <Table>
          <TableHeader>
            <TableRow className="border-purple-500/30 hover:bg-purple-900/20">
              <TableHead className="text-white">User</TableHead>
              <TableHead className="text-white">Role</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-right text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-purple-500/30 hover:bg-purple-900/20">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">
                        <div>{user.name}</div>
                        <div className="text-sm text-purple-300">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'} 
                           className={user.role === 'Admin' ? 'bg-purple-500 text-white' : 'bg-blue-500/20 text-blue-200 border-blue-500'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "outline" : "destructive"}
                           className={user.status === 'Active' ? 'text-green-300 border-green-500' : 'text-red-300 border-red-500 bg-red-500/10'}>
                        {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-purple-500/20">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900 border-purple-500/50 text-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-purple-500/50"/>
                        <DropdownMenuItem onClick={() => handlePromote(user.id)} disabled={user.role === 'Admin'}>
                          <ShieldCheck className="mr-2 h-4 w-4" />
                          Promote to Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBan(user.id)}>
                          <Ban className="mr-2 h-4 w-4" />
                          {user.status === 'Active' ? 'Ban User' : 'Unban User'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
