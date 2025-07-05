"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateSetting } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Save, Terminal, Type, Text } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "../ui/textarea";

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

function SettingForm({
  setting,
  settingKey,
  label,
  description,
  Icon,
  inputType = "text",
}: {
  setting?: SettingItem;
  settingKey: string;
  label: string;
  description: string;
  Icon: React.ElementType;
  inputType?: "text" | "datetime-local" | "textarea";
}) {
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

  return (
     <form action={formAction} className="space-y-4 border-t border-purple-500/30 pt-6 first:border-t-0 first:pt-0">
        {!setting && (
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 text-red-300 [&>svg]:text-red-300">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Setting not found!</AlertTitle>
                <AlertDescription>The '{settingKey}' setting is missing. You can set it for the first time below.</AlertDescription>
            </Alert>
        )}
        <input type="hidden" name="key" value={settingKey} />
        <div className="space-y-2">
            <Label htmlFor={settingKey} className="flex items-center gap-2 text-base">
                <Icon className="h-4 w-4" />
                {label}
            </Label>
            <p className="text-sm text-purple-300">{setting?.description || description}</p>
            {inputType === 'textarea' ? (
                 <Textarea
                    id={settingKey}
                    name="value"
                    defaultValue={setting?.value ?? ""}
                    className="bg-gray-900/50 border-purple-500/50 focus:ring-purple-500 min-h-[100px]"
                />
            ) : (
                <Input
                    id={settingKey}
                    name="value"
                    type={inputType}
                    defaultValue={setting?.value ? (inputType === 'datetime-local' ? setting.value.slice(0, 16) : setting.value) : ""}
                    className="bg-gray-900/50 border-purple-500/50 focus:ring-purple-500"
                />
            )}
        </div>
        <SubmitButton />
    </form>
  )
}

export function SiteSettings({ 
    launchDateSetting,
    heroHeadlineSetting,
    heroSubheadlineSetting
 }: { 
    launchDateSetting?: SettingItem,
    heroHeadlineSetting?: SettingItem,
    heroSubheadlineSetting?: SettingItem,
 }) {
  return (
    <div className="space-y-8">
        <SettingForm
            setting={launchDateSetting}
            settingKey="launchDate"
            label="Launch Date Countdown Target"
            description="The target date and time for the public launch countdown timer."
            Icon={Calendar}
            inputType="datetime-local"
        />
        <SettingForm
            setting={heroHeadlineSetting}
            settingKey="heroHeadline"
            label="Hero Headline"
            description="The main headline on the homepage hero section."
            Icon={Type}
            inputType="text"
        />
        <SettingForm
            setting={heroSubheadlineSetting}
            settingKey="heroSubheadline"
            label="Hero Subheadline"
            description="The subheadline text below the main headline on the hero section."
            Icon={Text}
            inputType="textarea"
        />
    </div>
  );
}
