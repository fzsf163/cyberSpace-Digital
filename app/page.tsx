import { ContactSection } from "@/components/landing/contact-section";
import { FeaturedWorkSection } from "@/components/landing/featured-work-section";
import { FooterSection } from "@/components/landing/footer-section";
import { HeroSection } from "@/components/landing/hero-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { Navigation } from "@/components/landing/navigation";
import { PricingSection } from "@/components/landing/pricing-section";
import { ProcessSection } from "@/components/landing/process-section";
import { ServicesSection } from "@/components/landing/services-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <FeaturedWorkSection />
      <MetricsSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
