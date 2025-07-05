import Link from "next/link";
import { WaitlistForm } from "./waitlist-form";
import { Button } from "./ui/button";

export function CtaSection({ launchDate }: { launchDate: Date }) {
  const isLaunched = new Date() > launchDate;

  return (
    <section id="cta" className="py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">
            {isLaunched ? "The Revolution Has Begun" : "Ready to Build the Future?"}
          </h2>
          <p className="max-w-[600px] text-foreground/80 md:text-xl">
            {isLaunched
              ? "Vireo is now live. Step into the new era of architecture and start creating your legacy today."
              : "Don't miss out on the launch. Join the waitlist to be the first to know when Vireo is live and get exclusive early access perks."}
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
