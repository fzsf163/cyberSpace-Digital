"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const footerLinks = {
  Services: [
    { name: "Brand & Identity", href: "/#services" },
    { name: "Web Design & Development", href: "/#services" },
    { name: "Product Design", href: "/#services" },
    { name: "Growth & Marketing", href: "/#services" },
  ],
  Company: [
    { name: "Work", href: "/work" },
    { name: "Process", href: "/#process" },
    { name: "Careers", href: "#", badge: "Hiring" },
  ],
  Resources: [
    { name: "Case studies", href: "/work" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

const socialLinks = [
  { name: "Instagram", href: "#" },
  { name: "Dribbble", href: "#" },
  { name: "LinkedIn", href: "#" },
];

function AnimatedWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(100, 200, 150, 0.3)";
      ctx.lineWidth = 1;

      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 5) {
          const y =
            height * 0.5 +
            Math.sin(x * 0.01 + time + wave * 0.5) * 30 +
            Math.sin(x * 0.02 + time * 1.5 + wave) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.02;
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
}

export function FooterSection() {
  return (
    <footer className="relative bg-section-2">
      {/* Footer content */}
      <div className="relative z-10 max-w-350 mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a
                href="#"
                className="inline-flex items-center gap-2 mb-6"
              >
                <span className="text-2xl font-display text-foreground">
                  CyberSpace
                </span>
                <span className="text-xs text-foreground/40 font-mono">
                  DIGITAL
                </span>
              </a>

              <p className="text-foreground/50 leading-relaxed mb-8 max-w-xs text-sm">
                CyberSpace Digital is a full-service digital agency for brand,
                web, product, and growth.
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-foreground/40 hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium text-foreground mb-6">
                  {title}
                </h3>
                <ul className="space-y-4">
                  {links.map(link => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-foreground/40 hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-white text-black rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/30">
            &copy; 2026 CyberSpace Digital. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-foreground/30">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#eca8d6]" />
              Currently accepting new projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
