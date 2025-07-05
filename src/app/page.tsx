import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { AIInspirationSection } from "@/components/ai-inspiration-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data: settings } = await supabase
    .from('site_settings')
    .select('key,value');

  const settingsMap = new Map(settings?.map(s => [s.key, s.value as string]) ?? []);

  const launchDate = new Date(settingsMap.get('launchDate') ?? "2026-01-01T00:00:00Z");
  const heroHeadline = settingsMap.get('heroHeadline') ?? "Vireo: Architect the Future";
  const heroSubheadline = settingsMap.get('heroSubheadline') ?? "Unleash your creativity with AI-powered design tools, collaborative platforms, and immersive AR/VR portfolios. The next generation of architecture starts here.";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header launchDate={launchDate} />
      <main className="flex-grow">
        <HeroSection 
          launchDate={launchDate}
          headline={heroHeadline}
          subheadline={heroSubheadline}
        />
        <FeaturesSection />
        <AIInspirationSection />
        <CtaSection launchDate={launchDate} />
      </main>
      <Footer />
    </div>
  );
}
