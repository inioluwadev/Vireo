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
    
  const { data: features } = await supabase
    .from('features')
    .select('*')
    .order('created_at', { ascending: true });

  const settingsMap = new Map(settings?.map(s => [s.key, s.value as string]) ?? []);

  // Hero Section
  const launchDate = new Date(settingsMap.get('launchDate') ?? "2026-01-01T00:00:00Z");
  const heroHeadline = settingsMap.get('heroHeadline') ?? "Vireo: Architect the Future";
  const heroSubheadline = settingsMap.get('heroSubheadline') ?? "Unleash your creativity with AI-powered design tools, collaborative platforms, and immersive AR/VR portfolios. The next generation of architecture starts here.";

  // Features Section
  const featuresHeadline = settingsMap.get('featuresHeadline') ?? "Everything You Need to Innovate";
  const featuresSubheadline = settingsMap.get('featuresSubheadline') ?? "Vireo provides a comprehensive toolkit for modern architects and students.";

  // AI Inspiration Section
  const aiInspirationHeadline = settingsMap.get('aiInspirationHeadline') ?? "Never Stare at a Blank Page Again";
  const aiInspirationSubheadline = settingsMap.get('aiInspirationSubheadline') ?? "Select a few parameters and let our AI generate a unique architectural concept to kickstart your next project.";

  // CTA Section
  const ctaUpcomingHeadline = settingsMap.get('ctaUpcomingHeadline') ?? "Ready to Build the Future?";
  const ctaUpcomingSubheadline = settingsMap.get('ctaUpcomingSubheadline') ?? "Don't miss out on the launch. Join the waitlist to be the first to know when Vireo is live and get exclusive early access perks.";
  const ctaLaunchedHeadline = settingsMap.get('ctaLaunchedHeadline') ?? "The Revolution Has Begun";
  const ctaLaunchedSubheadline = settingsMap.get('ctaLaunchedSubheadline') ?? "Vireo is now live. Step into the new era of architecture and start creating your legacy today.";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header launchDate={launchDate} />
      <main className="flex-grow">
        <HeroSection 
          launchDate={launchDate}
          headline={heroHeadline}
          subheadline={heroSubheadline}
        />
        <FeaturesSection
          features={features ?? []}
          headline={featuresHeadline}
          subheadline={featuresSubheadline}
        />
        <AIInspirationSection
          headline={aiInspirationHeadline}
          subheadline={aiInspirationSubheadline}
        />
        <CtaSection 
          launchDate={launchDate}
          upcomingHeadline={ctaUpcomingHeadline}
          upcomingSubheadline={ctaUpcomingSubheadline}
          launchedHeadline={ctaLaunchedHeadline}
          launchedSubheadline={ctaLaunchedSubheadline}
        />
      </main>
      <Footer />
    </div>
  );
}
