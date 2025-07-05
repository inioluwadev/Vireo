"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addFeature, deleteFeature } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save, Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { DynamicIcon } from "../dynamic-icon";

type FeatureItem = {
    id: string;
    title: string;
    description: string;
    icon: string;
    created_at: string;
};

function AddFeatureButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Adding..." : <><Plus className="mr-2 h-4 w-4" /> Add Feature</>}
    </Button>
  );
}

function DeleteFeatureButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} variant="destructive" size="icon">
            {pending ? "..." : <Trash2 className="h-4 w-4" />}
        </Button>
    )
}

function AddFeatureForm() {
    const initialState = { message: "", success: false, errors: null };
    const [state, formAction] = useFormState(addFeature, initialState);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state?.message) {
            toast({
                title: state.success ? "Success!" : "Error",
                description: state.message,
                variant: state.success ? "default" : "destructive",
            });
            if (state.success) {
                formRef.current?.reset();
            }
        }
    }, [state, toast]);

    return (
        <form ref={formRef} action={formAction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="e.g., AR/VR Portfolios" className="bg-gray-900/50 border-purple-500/50"/>
                    {state.errors?.title && <p className="text-red-400 text-xs">{state.errors.title[0]}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="icon">Icon Name</Label>
                    <Input id="icon" name="icon" placeholder="e.g., Orbit (from lucide-react)" className="bg-gray-900/50 border-purple-500/50" />
                     {state.errors?.icon && <p className="text-red-400 text-xs">{state.errors.icon[0]}</p>}
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="A short description of the feature." className="bg-gray-900/50 border-purple-500/50" />
                 {state.errors?.description && <p className="text-red-400 text-xs">{state.errors.description[0]}</p>}
            </div>
            <AddFeatureButton />
        </form>
    )
}

function FeatureList({ features }: { features: FeatureItem[] }) {
    const initialState = { message: "", success: false };
    const [state, formAction] = useFormState(deleteFeature, initialState);
    const { toast } = useToast();

     useEffect(() => {
        if (state?.message) {
            toast({
                title: state.success ? "Success!" : "Error",
                description: state.message,
                variant: state.success ? "default" : "destructive",
            });
        }
    }, [state, toast]);

    if (features.length === 0) {
        return <p className="text-purple-300 text-center py-8">No features yet. Add one above!</p>
    }
    
    return (
        <div className="space-y-4">
            {features.map(feature => (
                <div key={feature.id} className="flex items-center justify-between p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                    <div className="flex items-center gap-4">
                        <DynamicIcon name={feature.icon} className="h-8 w-8 text-purple-300" />
                        <div>
                            <h4 className="font-bold">{feature.title}</h4>
                            <p className="text-sm text-purple-300">{feature.description}</p>
                        </div>
                    </div>
                    <form action={formAction}>
                        <input type="hidden" name="id" value={feature.id} />
                        <DeleteFeatureButton />
                    </form>
                </div>
            ))}
        </div>
    )
}

export function FeaturesSettings({ features }: { features: FeatureItem[] }) {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-headline mb-2">Add New Feature</h3>
                <AddFeatureForm />
            </div>
            <div className="border-t border-purple-500/30 pt-6">
                <h3 className="text-lg font-headline mb-4">Current Features</h3>
                <FeatureList features={features} />
            </div>
        </div>
    )
}
