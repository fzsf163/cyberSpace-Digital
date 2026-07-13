import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Tests import from 'vitest' explicitly (no injected globals), so React
// Testing Library's automatic cleanup never registers itself — do it here.
afterEach(() => {
  cleanup();
});

// --- Browser APIs jsdom does not implement -------------------------------
// The landing sections are animation-heavy "use client" components:
// IntersectionObserver drives the scroll-reveal effects (contact, featured
// work, metrics, ...), matchMedia backs hooks/use-mobile.ts, and
// ResizeObserver is used by some Radix/chart primitives. Stub them with
// inert implementations so rendering those components in jsdom doesn't
// throw. Plain assignments (not vi.stubGlobal) so a test calling
// vi.unstubAllGlobals() can't accidentally remove them.

class IntersectionObserverStub implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "0px";
  readonly thresholds: ReadonlyArray<number> = [];
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

class ResizeObserverStub implements ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

function matchMediaStub(query: string): MediaQueryList {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  };
}

globalThis.IntersectionObserver = IntersectionObserverStub;
globalThis.ResizeObserver = ResizeObserverStub;
window.matchMedia = matchMediaStub;
