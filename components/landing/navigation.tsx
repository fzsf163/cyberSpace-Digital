"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

import { SectionLink } from "@/components/landing/section-link";

// Section links are root-relative (`/#id`) so they work from any route —
// on /work or /work/[slug] they route home and scroll, not to a dead anchor.
const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "Work", href: "/work" },
  { name: "Process", href: "/#process" },
  { name: "Careers", href: "/careers" },
  { name: "FAQ", href: "/faq" },
];

function NavLink({
  href,
  className,
  style,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  // Section anchors (`/#id`) go through SectionLink (smooth-scroll on home,
  // full-navigate from other routes). Real route links (`/work`) use the
  // client router.
  if (href.includes("#")) {
    return (
      <SectionLink href={href} className={className} style={style} onClick={onClick}>
        {children}
      </SectionLink>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} style={style} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} style={style} onClick={onClick}>
      {children}
    </a>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // The hardcoded-white "floating over dark hero" treatment only applies on
  // the home page before scrolling — that's the only place a dark video
  // backdrop sits directly behind the nav. Every other route/state (including
  // /work, /work/[slug], and the home page once scrolled) uses theme-aware
  // tokens so the nav stays legible in both light and dark mode.
  const isHomeUnscrolled = pathname === "/" && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? "top-3 left-3 right-3" : "top-4 left-4 right-4"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 rounded-2xl border backdrop-blur-xl ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/80 border-foreground/10 shadow-lg max-w-[1200px]"
            : isHomeUnscrolled
              ? "bg-black/30 border-white/10 max-w-[1400px]"
              : "bg-background/60 border-foreground/10 max-w-[1400px]"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className={`font-display tracking-tight transition-all duration-500 ${isScrolled ? "text-xl text-foreground" : isHomeUnscrolled ? "text-2xl text-white" : "text-2xl text-foreground"}`}>CyberSpace</span>
            <span className={`font-mono transition-all duration-500 ${isScrolled ? "text-[10px] mt-0.5 text-muted-foreground" : isHomeUnscrolled ? "text-xs mt-1 text-white/60" : "text-xs mt-1 text-muted-foreground"}`}>DIGITAL</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors duration-300 relative group ${isScrolled ? "text-foreground/70 hover:text-foreground" : isHomeUnscrolled ? "text-white/70 hover:text-white" : "text-foreground/70 hover:text-foreground"}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-foreground" : isHomeUnscrolled ? "bg-white" : "bg-foreground"}`} />
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              asChild
              size="sm"
              className={`rounded-full transition-all duration-500 ${isScrolled ? "bg-foreground hover:bg-foreground/90 text-background px-4 h-8 text-xs" : isHomeUnscrolled ? "bg-white hover:bg-white/90 text-black px-6" : "bg-foreground hover:bg-foreground/90 text-background px-6"}`}
            >
              <SectionLink href="/#contact">Start a project</SectionLink>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-500 ${isScrolled || isMobileMenuOpen || !isHomeUnscrolled ? "text-foreground" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <NavLink
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-5xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <Button
              asChild
              className="flex-1 bg-foreground text-background rounded-full h-14 text-base"
            >
              <SectionLink href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
                Start a project
              </SectionLink>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
