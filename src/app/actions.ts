"use server";

import { z } from "zod";
import { generateArchitectureConcept as genArch } from "@/ai/flows/generate-architecture-concept";
import type { GenerateArchitectureConceptInput } from "@/ai/flows/generate-architecture-concept";

const emailSchema = z.string().email({ message: "Please enter a valid email address." });

export async function addToWaitlist(
  prevState: any,
  formData: FormData
) {
  const email = formData.get("email");
  const validated = emailSchema.safeParse(email);

  if (!validated.success) {
    return { message: validated.error.errors[0].message, success: false };
  }

  try {
    // Here you would save to a database like Supabase
    console.log(
      `Email added to waitlist: ${
        validated.data
      } at ${new Date().toISOString()}`
    );
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
