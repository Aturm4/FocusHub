import { LandingNavbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { StatsPreview } from "@/components/landing/stats-preview";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { AnimatedBackground } from "@/components/shared/animated-background";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-page">
      <AnimatedBackground />
      <LandingNavbar />
      <Hero />
      <Features />
      <StatsPreview />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
