"use client"

import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

type IconName = keyof typeof Icons;

interface DynamicIconProps extends LucideProps {
  name: IconName | string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const LucideIcon = Icons[name as IconName] as React.ComponentType<LucideProps>;

  if (!LucideIcon) {
    // Return a fallback icon if the name is not found
    return <Icons.HelpCircle {...props} />;
  }

  return <LucideIcon {...props} />;
}
