import { AboutSection } from "@/components/landing/about-section";
import { ArticlesSection } from "@/components/landing/articles-section";
import { ContactSection } from "@/components/landing/contact-section";
import { CtaMarquee } from "@/components/landing/cta-marquee";
import { FeaturedWorkSection } from "@/components/landing/featured-work-section";
import { FooterSection } from "@/components/landing/footer-section";
import { HashScroll } from "@/components/landing/hash-scroll";
import { HeroSection } from "@/components/landing/hero-section";
import { Navigation } from "@/components/landing/navigation";
import { PricingSection } from "@/components/landing/pricing-section";
import { ProcessSection } from "@/components/landing/process-section";
import { ServicesSection } from "@/components/landing/services-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <HashScroll />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <CtaMarquee variant="a" />
      <FeaturedWorkSection />
      <ServicesSection />
      <CtaMarquee variant="b" />
      <ProcessSection />
      <TestimonialsSection />
      <ArticlesSection />
      <PricingSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
