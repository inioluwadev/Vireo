"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateSetting } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Save, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type SettingItem = {
  key: string;
  value: string | null;
  description: string | null;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
    </Button>
  );
}

export function SiteSettings({ setting }: { setting?: SettingItem }) {
  const initialState = { message: "", success: false };
  const [state, formAction] = useFormState(updateSetting, initialState);
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
  
  const settingExists = !!setting;
  const key = 'launchDate';
  const description = 'The target date and time for the public launch countdown timer.';

  return (
    <form action={formAction} className="space-y-4">
        {!settingExists && (
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 text-red-300 [&>svg]:text-red-300">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Setting not found!</AlertTitle>
                <AlertDescription>The '{key}' setting is missing. You can set it for the first time below.</AlertDescription>
            </Alert>
        )}
        <input type="hidden" name="key" value={key} />
        <div className="space-y-2">
            <Label htmlFor="launchDate" className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                Launch Date Countdown Target
            </Label>
            <p className="text-sm text-purple-300">{setting?.description || description}</p>
            <Input
              id="launchDate"
              name="value"
              type="datetime-local"
              defaultValue={setting?.value ? setting.value.slice(0, 16) : ""}
              className="bg-gray-900/50 border-purple-500/50 focus:ring-purple-500"
            />
        </div>
        <SubmitButton />
    </form>
  );
}
