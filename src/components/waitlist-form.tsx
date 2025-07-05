"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addToWaitlist } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto transition-transform duration-300 hover:scale-105 bg-primary hover:bg-primary/90">
      {pending ? "Joining..." : "Join the Waitlist"}
    </Button>
  );
}

export function WaitlistForm() {
  const initialState = { message: "", success: false };
  const [state, formAction] = useFormState(addToWaitlist, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success!" : "Oops!",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="flex flex-col md:flex-row items-center gap-4">
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        required
        className="flex-grow bg-white dark:bg-gray-800"
      />
      <SubmitButton />
    </form>
  );
}
