"use server";

import { z } from "zod";
import { generateArchitectureConcept as genArch } from "@/ai/flows/generate-architecture-concept";
import type { GenerateArchitectureConceptInput } from "@/ai/flows/generate-architecture-concept";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const emailSchema = z.string().email({ message: "Please enter a valid email address." });

export async function signInWithEmail(prevState: any, formData: FormData) {
  const supabase = createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { message: error.message, success: false };
  }

  return redirect("/admin");
}

export async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/');
}

export async function addToWaitlist(
  prevState: any,
  formData: FormData
) {
  const supabase = createClient();

  const email = formData.get("email");
  const validated = emailSchema.safeParse(email);

  if (!validated.success) {
    return { message: validated.error.errors[0].message, success: false };
  }

  try {
    const { error } = await supabase
      .from('waitlist')
      .insert({ email: validated.data });

    if (error) {
      console.error("Supabase error:", error);
      if (error.code === '23505') {
           return { message: "This email is already on the waitlist.", success: false };
      }
      return { message: "Something went wrong. Please try again.", success: false };
    }

    return {
      message: "Thank you! You're on the waitlist.",
      success: true,
    };
  } catch (error) {
    console.error("Waitlist error:", error);
    return { message: "Something went wrong. Please try again.", success: false };
  }
}

export async function generateArchitectureConcept(
  input: GenerateArchitectureConceptInput
) {
  try {
    const result = await genArch(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("AI Concept Generation Error:", error);
    return {
      success: false,
      error: "Failed to generate concept. Please try again later.",
    };
  }
}
