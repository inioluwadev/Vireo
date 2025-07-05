"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateSetting } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Save, Terminal, Type, Text, LayoutGrid, Bot, Rocket } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "../ui/textarea";

type SettingItem = {
  key: string;
  value: string | null;
  description: string | null;
};

type SettingFormProps = {
  settingKey: string;
  label: string;
  description: string;
  Icon: React.ElementType;
  settingsMap: Map<string, SettingItem>;
  inputType?: "text" | "datetime-local" | "textarea";
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
    </Button>
  );
}

function SettingForm({
  settingKey,
  label,
  description,
  Icon,
  settingsMap,
  inputType = "text",
}: SettingFormProps) {
  const setting = settingsMap.get(settingKey);
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

export function SiteSettings({ settingsMap }: { settingsMap: Map<string, SettingItem> }) {
  return (
    <div className="space-y-8">
        <h3 className="text-lg font-headline -mb-4">Launch & Hero</h3>
        <SettingForm
            settingsMap={settingsMap}
            settingKey="launchDate"
            label="Launch Date Countdown Target"
            description="The target date and time for the public launch countdown timer."
            Icon={Calendar}
            inputType="datetime-local"
        />
        <SettingForm
            settingsMap={settingsMap}
            settingKey="heroHeadline"
            label="Hero Headline"
            description="The main headline on the homepage hero section."
            Icon={Type}
            inputType="text"
        />
        <SettingForm
            settingsMap={settingsMap}
            settingKey="heroSubheadline"
            label="Hero Subheadline"
            description="The subheadline text below the main headline on the hero section."
            Icon={Text}
            inputType="textarea"
        />
        <h3 className="text-lg font-headline -mb-4 pt-4 border-t border-purple-500/30">Features Section</h3>
         <SettingForm
            settingsMap={settingsMap}
            settingKey="featuresHeadline"
            label="Features Headline"
            description="The headline for the features section."
            Icon={LayoutGrid}
            inputType="text"
        />
        <SettingForm
            settingsMap={settingsMap}
            settingKey="featuresSubheadline"
            label="Features Subheadline"
            description="The subheadline for the features section."
            Icon={Text}
            inputType="textarea"
        />
         <h3 className="text-lg font-headline -mb-4 pt-4 border-t border-purple-500/30">AI Section</h3>
        <SettingForm
            settingsMap={settingsMap}
            settingKey="aiInspirationHeadline"
            label="AI Inspiration Headline"
            description="The headline for the AI Inspiration section."
            Icon={Bot}
            inputType="text"
        />
        <SettingForm
            settingsMap={settingsMap}
            settingKey="aiInspirationSubheadline"
            label="AI Inspiration Subheadline"
            description="The subheadline for the AI Inspiration section."
            Icon={Text}
            inputType="textarea"
        />
        <h3 className="text-lg font-headline -mb-4 pt-4 border-t border-purple-500/30">CTA Section</h3>
        <SettingForm
            settingsMap={settingsMap}
            settingKey="ctaUpcomingHeadline"
            label="CTA Headline (Before Launch)"
            description="Headline for the final call to action section when the countdown is active."
            Icon={Rocket}
            inputType="text"
        />
         <SettingForm
            settingsMap={settingsMap}
            settingKey="ctaUpcomingSubheadline"
            label="CTA Subheadline (Before Launch)"
            description="Subheadline for the final call to action section when the countdown is active."
            Icon={Text}
            inputType="textarea"
        />
        <SettingForm
            settingsMap={settingsMap}
            settingKey="ctaLaunchedHeadline"
            label="CTA Headline (After Launch)"
            description="Headline for the final call to action section after the site has launched."
            Icon={Rocket}
            inputType="text"
        />
        <SettingForm
            settingsMap={settingsMap}
            settingKey="ctaLaunchedSubheadline"
            label="CTA Subheadline (After Launch)"
            description="Subheadline for the final call to action section after the site has launched."
            Icon={Text}
            inputType="textarea"
        />
    </div>
  );
}
