import Link from "next/link";
import { WaitlistForm } from "./waitlist-form";
import { Button } from "./ui/button";

type CtaSectionProps = {
  launchDate: Date;
  upcomingHeadline: string;
  upcomingSubheadline: string;
  launchedHeadline: string;
  launchedSubheadline: string;
};

export function CtaSection({ 
  launchDate,
  upcomingHeadline,
  upcomingSubheadline,
  launchedHeadline,
  launchedSubheadline
 }: CtaSectionProps) {
  const isLaunched = new Date() > launchDate;

  return (
    <section id="cta" className="py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">
            {isLaunched ? launchedHeadline : upcomingHeadline}
          </h2>
          <p className="max-w-[600px] text-foreground/80 md:text-xl">
            {isLaunched
              ? launchedSubheadline
              : upcomingSubheadline}
          </p>
          <div className="w-full max-w-md">
            {isLaunched ? (
              <Link href="/login" passHref>
                <Button size="lg" className="transition-transform duration-300 hover:scale-105">
                  Get Started Now
                </Button>
              </Link>
            ) : (
              <WaitlistForm />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
