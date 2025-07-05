import { Countdown } from "@/components/countdown";
import { WaitlistForm } from "./waitlist-form";

export function HeroSection({ launchDate }: { launchDate: Date }) {
  const isLaunched = new Date() > launchDate;

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
              Vireo: Architect the Future
            </h1>
            <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl">
              Unleash your creativity with AI-powered design tools, collaborative platforms, and immersive AR/VR portfolios. The next generation of architecture starts here.
            </p>
          </div>
          
          {isLaunched ? (
             <div className="flex flex-col items-center justify-center space-y-4">
                <Countdown targetDate={launchDate} />
             </div>
          ) : (
            <>
              <div className="w-full max-w-md mx-auto">
                <WaitlistForm />
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <p className="text-sm font-medium tracking-wide uppercase text-foreground/60">Launching in</p>
                <Countdown targetDate={launchDate} />
              </div>
            </>
          )}

        </div>
      </div>
    </section>
  );
}
