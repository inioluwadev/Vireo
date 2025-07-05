import { WaitlistForm } from "./waitlist-form";

export function CtaSection() {
  return (
    <section id="cta" className="py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">Ready to Build the Future?</h2>
          <p className="max-w-[600px] text-foreground/80 md:text-xl">
            Don't miss out on the launch. Join the waitlist to be the first to know when Vireo is live and get exclusive early access perks.
          </p>
          <div className="w-full max-w-md">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}
