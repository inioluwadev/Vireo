import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DynamicIcon } from "./dynamic-icon";

type Feature = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

type FeaturesSectionProps = {
  features: Feature[];
  headline: string;
  subheadline: string;
}

export function FeaturesSection({ features, headline, subheadline }: FeaturesSectionProps) {
  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
          <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">{headline}</h2>
          <p className="max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {subheadline}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.id} className="flex flex-col items-center text-center p-6 bg-secondary rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="mb-4">
                <DynamicIcon name={feature.icon} className="w-10 h-10 text-primary" />
              </div>
              <CardHeader className="p-0">
                <CardTitle className="font-headline text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
