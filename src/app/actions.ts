"use server";

import { z } from "zod";
import { generateArchitectureConcept as genArch } from "@/ai/flows/generate-architecture-concept";
import type { GenerateArchitectureConceptInput } from "@/ai/flows/generate-architecture-concept";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const emailSchema = z.string().email({ message: "Please enter a valid email address." });
const settingSchema = z.object({
    key: z.string(),
    value: z.string(),
});

const featureSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    icon: z.string().min(1, { message: "Icon name is required." }),
});

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

    revalidatePath('/admin');

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


export async function updateSetting(prevState: any, formData: FormData) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { message: "You must be logged in to do that.", success: false };
    }

    const key = formData.get('key') as string;
    const value = formData.get('value') as string;

    const validated = settingSchema.safeParse({ key, value });

    if (!validated.success) {
        return { message: validated.error.errors[0].message, success: false };
    }
    
    const { error } = await supabase
        .from('site_settings')
        .upsert({ key: validated.data.key, value: validated.data.value });
    
    if (error) {
        console.error("Update setting error:", error);
        return { message: "Failed to save setting. " + error.message, success: false };
    }

    revalidatePath('/');
    revalidatePath('/admin');

    return { message: `Setting '${key}' saved successfully.`, success: true };
}


export async function addFeature(prevState: any, formData: FormData) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { message: "You must be logged in to do that.", success: false, errors: null };
    }

    const validated = featureSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        icon: formData.get('icon'),
    });

    if (!validated.success) {
        return { message: "Invalid data.", success: false, errors: validated.error.flatten().fieldErrors };
    }
    
    const { error } = await supabase.from('features').insert(validated.data);
    
    if (error) {
        console.error("Add feature error:", error);
        return { message: "Failed to add feature. " + error.message, success: false, errors: null };
    }

    revalidatePath('/');
    revalidatePath('/admin');

    return { message: "Feature added successfully.", success: true, errors: null };
}

export async function deleteFeature(prevState: any, formData: FormData) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { message: "You must be logged in to do that.", success: false };
    }

    const id = formData.get('id') as string;

    if (!id) {
        return { message: "Feature ID is missing.", success: false };
    }
    
    const { error } = await supabase.from('features').delete().match({ id });
    
    if (error) {
        console.error("Delete feature error:", error);
        return { message: "Failed to delete feature. " + error.message, success: false };
    }

    revalidatePath('/');
    revalidatePath('/admin');

    return { message: "Feature deleted successfully.", success: true };
}
