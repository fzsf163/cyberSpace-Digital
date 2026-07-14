"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Switch } from "@/components/ui/switch";

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
      <div className="flex flex-col items-center gap-3 rounded-l-full border border-r-0 border-border bg-background/80 py-4 px-2 backdrop-blur-xl shadow-lg">
        <Sun className="size-4 text-muted-foreground" />
        <Switch
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          aria-label="Toggle dark mode"
          className="-rotate-90"
        />
        <Moon className="size-4 text-muted-foreground" />
      </div>
    </div>
  );
}
