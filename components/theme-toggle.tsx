"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed right-0 top-1/2 z-50 -translate-y-1/2">
      <motion.button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle dark mode"
        aria-pressed={isDark}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        className="flex size-11 items-center justify-center overflow-hidden rounded-l-full border border-r-0 border-border bg-muted shadow-lg"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center"
            >
              <Moon className="size-4 text-foreground" strokeWidth={2.75} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center"
            >
              <Sun className="size-4 text-amber-800" strokeWidth={2.75} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
