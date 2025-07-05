"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signInWithEmail } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Signing In..." : "Sign In"}
    </Button>
  );
}

export function LoginForm() {
  const initialState = { message: "", success: false };
  const [state, formAction] = useFormState(signInWithEmail, initialState);

  return (
    <form action={formAction}>
      <Card className="w-full max-w-sm bg-black/20 backdrop-blur-sm border-purple-500/30 text-white">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Admin Login</CardTitle>
          <CardDescription className="text-purple-300">
            Enter your credentials to access the admin dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@vireo.com"
              required
              className="bg-gray-900/50 border-purple-500/50 focus:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="bg-gray-900/50 border-purple-500/50 focus:ring-purple-500"
            />
          </div>
          {state && !state.success && state.message && (
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 text-red-300 [&>svg]:text-red-300">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <SubmitButton />
        </CardContent>
      </Card>
    </form>
  );
}
