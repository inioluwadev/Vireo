import { AIInspirationForm } from "@/components/ai-inspiration-form";
import { Lightbulb } from "lucide-react";

export function AIInspirationSection() {
  return (
    <section id="ai-inspiration" className="py-20 md:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm text-primary border border-primary/20">
            <Lightbulb className="inline-block w-4 h-4 mr-1" />
            AI Inspiration
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">Never Stare at a Blank Page Again</h2>
          <p className="max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Select a few parameters and let our AI generate a unique architectural concept to kickstart your next project.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <AIInspirationForm />
        </div>
      </div>
    </section>
  );
}
