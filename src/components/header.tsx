import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";

export function Header({ launchDate }: { launchDate: Date }) {
  const isLaunched = new Date() > launchDate;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Logo className="h-6 w-6" />
          <span className="ml-2 font-bold font-headline">Vireo</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Link href={isLaunched ? "/login" : "#cta"} passHref>
            <Button className="transition-transform duration-300 hover:scale-105">
              {isLaunched ? "Sign In" : "Get Early Access"}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
