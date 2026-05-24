'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';

export let lenisInstance: Lenis | null = null;

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // CSS scroll-behavior: smooth must NOT be set on html — Lenis handles it
    const lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.6,
    });

    lenisInstance = lenis;
    let running = true;
    let rafId: number;

    function tick(time: number) {
      if (!running) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    // Smooth anchor-link scrolling through Lenis
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
    };

    document.addEventListener('click', onAnchorClick);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
      document.removeEventListener('click', onAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
