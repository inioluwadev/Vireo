import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Orbit, Swords, GraduationCap, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Orbit className="w-10 h-10 text-primary" />,
    title: "AR/VR Portfolios",
    description: "Bring your designs to life with immersive augmented and virtual reality showcases.",
    image: "https://placehold.co/600x400.png",
    hint: "virtual reality",
  },
  {
    icon: <Swords className="w-10 h-10 text-primary" />,
    title: "Design Duels",
    description: "Challenge peers, test your skills, and get feedback in head-to-head design competitions.",
    image: "https://placehold.co/600x400.png",
    hint: "architecture competition",
  },
  {
    icon: <GraduationCap className="w-10 h-10 text-primary" />,
    title: "Student Tools",
    description: "Access a suite of tools and resources designed to help architectural students excel.",
    image: "https://placehold.co/600x400.png",
    hint: "student architect",
  },
  {
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    title: "AI-Powered Inspiration",
    description: "Break creative blocks with an AI that generates unique architectural concepts on demand.",
    image: "https://placehold.co/600x400.png",
    hint: "artificial intelligence",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
          <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">Everything You Need to Innovate</h2>
          <p className="max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Vireo provides a comprehensive toolkit for modern architects and students.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col items-center text-center p-6 bg-secondary rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="mb-4">
                {feature.icon}
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
