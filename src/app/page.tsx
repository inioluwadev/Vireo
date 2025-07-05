import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { AIInspirationSection } from "@/components/ai-inspiration-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data: setting } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'launchDate')
    .single();
    
  // Use default if not found in DB, or if the value is null
  const launchDate = setting?.value ? new Date(setting.value) : new Date("2026-01-01T00:00:00Z");

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <HeroSection launchDate={launchDate} />
        <FeaturesSection />
        <AIInspirationSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
