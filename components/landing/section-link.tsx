"use client";

import { usePathname } from "next/navigation";

/**
 * Link to a home-page section anchor (`/#id`) that works from any route.
 *
 * - On the home page: smooth-scrolls to the section in-place (no reload), since
 *   the browser's native fragment scroll is unreliable on this long page.
 * - On any other route (/work, /work/[slug]): falls back to a normal full
 *   navigation to `/#id`; the home page's <HashScroll> then lands on the
 *   section once it loads.
 */
export function SectionLink({
  href,
  className,
  style,
  onClick,
  children,
}: {
  href: string; // e.g. "/#services"
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const id = href.split("#")[1] ?? "";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", href);
      }
    }
    // Other routes: let the browser do a full navigation to `/#id`.
  };

  return (
    <a href={href} className={className} style={style} onClick={handleClick}>
      {children}
    </a>
  );
}
