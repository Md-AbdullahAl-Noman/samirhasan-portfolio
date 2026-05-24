'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);

  // All state in refs — no React re-renders in the animation loop
  const mouse   = useRef({ x: -300, y: -300 });
  const lag1    = useRef({ x: -300, y: -300 });
  const lag2    = useRef({ x: -300, y: -300 });
  const hovered = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const r1  = ring1Ref.current;
    const r2  = ring2Ref.current;
    if (!dot || !r1 || !r2) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    let raf: number;
    const tick = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Dot — instant follow
      dot.style.transform = `translate3d(${mx - 3}px,${my - 3}px,0)`;

      // Inner ring — snappy lag; scale up on hover (computed fresh each frame, never accumulated)
      lag1.current.x += (mx - lag1.current.x) * 0.18;
      lag1.current.y += (my - lag1.current.y) * 0.18;
      const s1 = hovered.current ? 1.3 : 1;
      r1.style.transform = `translate3d(${lag1.current.x - 20}px,${lag1.current.y - 20}px,0) scale(${s1})`;

      // Outer ring — slow lag
      lag2.current.x += (mx - lag2.current.x) * 0.07;
      lag2.current.y += (my - lag2.current.y) * 0.07;
      r2.style.transform = `translate3d(${lag2.current.x - 34}px,${lag2.current.y - 34}px,0)`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Only change color / opacity on hover — NOT the transform (that's owned by the loop)
    const onEnter = () => {
      hovered.current = true;
      r1.style.borderColor = 'rgba(37,99,235,0.75)';
      r1.style.boxShadow   = '0 0 14px rgba(37,99,235,0.22)';
      r2.style.opacity     = '0.35';
    };
    const onLeave = () => {
      hovered.current = false;
      r1.style.borderColor = 'rgba(37,99,235,0.45)';
      r1.style.boxShadow   = 'none';
      r2.style.opacity     = '0.2';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999] select-none hidden md:block"
      aria-hidden
    >
      {/* Core dot */}
      <div
        ref={dotRef}
        className="absolute h-1.5 w-1.5 rounded-full bg-accent"
        style={{
          boxShadow: '0 0 8px 2px rgba(37,99,235,1), 0 0 18px rgba(37,99,235,0.5)',
          willChange: 'transform',
        }}
      />
      {/* Inner ring */}
      <div
        ref={ring1Ref}
        className="absolute h-10 w-10 rounded-full border border-accent/45"
        style={{
          opacity: 0.65,
          willChange: 'transform',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        }}
      />
      {/* Outer ring — slow, faint */}
      <div
        ref={ring2Ref}
        className="absolute h-[68px] w-[68px] rounded-full border border-accent/12"
        style={{
          opacity: 0.2,
          willChange: 'transform',
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
}
