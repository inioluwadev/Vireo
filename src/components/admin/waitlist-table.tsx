"use client";

import * as React from "react";
import { format } from "date-fns";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type WaitlistItem = {
  email: string;
  created_at: string;
};

type WaitlistTableProps = {
  waitlist: WaitlistItem[];
};

export function WaitlistTable({ waitlist: initialWaitlist }: WaitlistTableProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredWaitlist = initialWaitlist.filter(
    (item) =>
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex items-center pb-4 justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by email..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 bg-gray-900/50 border-purple-500/50 focus:ring-purple-500"
          />
        </div>
        <div className="text-sm text-purple-300">Total: {initialWaitlist.length}</div>
      </div>
      <div className="rounded-md border border-purple-500/30">
        <Table>
          <TableHeader>
            <TableRow className="border-purple-500/30 hover:bg-purple-900/20">
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white text-right">Joined At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWaitlist.length > 0 ? (
              filteredWaitlist.map((item) => (
                <TableRow key={item.email} className="border-purple-500/30 hover:bg-purple-900/20">
                  <TableCell className="font-medium text-purple-300">{item.email}</TableCell>
                  <TableCell className="text-right text-purple-400">
                    {format(new Date(item.created_at), "PPP p")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="h-24 text-center">
                  No one on the waitlist yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
