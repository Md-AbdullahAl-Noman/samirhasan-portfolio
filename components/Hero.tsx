'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const DigitalNexus = dynamic(() => import('./three/AmbientScene'), { ssr: false });

const ease = [0.2, 0.6, 0.2, 1] as const;

function SplitText({
  text,
  baseDelay,
  className,
  style,
}: {
  text: string;
  baseDelay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const chars = useMemo(() => text.split(''), [text]);
  return (
    <>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: '70%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay + i * 0.04, duration: 0.65, ease }}
          className={className}
          style={{ display: 'inline-block', ...style }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center"
    >
      {/* Premium ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="glow-blob glow-blob-anim absolute top-[-18%] right-[8%] h-[580px] w-[580px]"
          style={{ background: 'rgba(37,99,235,0.16)' }}
        />
        <div
          className="glow-blob absolute bottom-[-8%] left-[-12%] h-[420px] w-[420px]"
          style={{ background: 'rgba(30,64,175,0.24)', animationDelay: '-8s' }}
        />
        <div
          className="glow-blob aurora-orb absolute top-[40%] right-[25%] h-[280px] w-[280px]"
          style={{ background: 'rgba(212,176,104,0.08)', filter: 'blur(90px)' }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 grid-overlay opacity-20"
        style={{
          maskImage:
            'radial-gradient(ellipse 65% 55% at 62% 42%, black 30%, transparent 80%)',
        }}
      />

      {/* Digital Nexus — right side, full height */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute right-0 top-0 h-full w-[62%]">
          <DigitalNexus />
        </div>
        {/* Fade: left edge into content */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--bg) 20%, rgba(11,18,32,0.88) 42%, transparent 66%)',
          }}
        />
        {/* Fade: top + bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, var(--bg) 0%, transparent 14%, transparent 84%, var(--bg) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-site px-5 sm:px-8">
        <div className="max-w-[490px]">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease }}
            className="eyebrow mb-8"
          >
            Founder · Luminar Technology
          </motion.div>

          {/* Name — letter by letter */}
          <div className="overflow-hidden">
            <h1
              className="font-display leading-[0.94] tracking-ultra text-white"
              style={{ fontSize: 'clamp(64px, 10vw, 120px)' }}
            >
              <SplitText text="Samir" baseDelay={0.45} />
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              className="font-display italic leading-[0.94] tracking-ultra"
              style={{
                fontSize: 'clamp(64px, 10vw, 120px)',
                background:
                  'linear-gradient(110deg, #fff 8%, #60A5FA 32%, #3B82F6 50%, #D4B068 68%, #60A5FA 86%, #fff 100%)',
                backgroundSize: '280% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                animation: 'grad 10s ease-in-out infinite',
              }}
            >
              <SplitText text="Hasan" baseDelay={0.58} />
            </h1>
          </div>

          {/* Single descriptor */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease }}
            className="mt-7 flex items-center gap-3"
          >
            <span
              className="block h-px w-8 flex-shrink-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(96,165,250,0.8), rgba(212,176,104,0.4))',
                boxShadow: '0 0 8px rgba(96,165,250,0.4)',
              }}
            />
            <span className="text-[10.5px] font-mono tracking-[0.24em] uppercase text-ink-3">
              Architect of digital ventures
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.8, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a href="#work" className="btn btn-primary" data-cursor>
              See my work
              <Arrow />
            </a>
            <a href="#about" className="btn btn-ghost" data-cursor>
              <span>About me</span>
              <ArrowDiag />
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.85, ease }}
            className="mt-9 flex items-center"
          >
            {[
              { val: '4+', label: 'Ventures' },
              { val: '5yr', label: 'Building' },
              { val: '∞', label: 'Vision' },
            ].map((s, i) => (
              <span key={i} className="flex items-center">
                <span className="flex flex-col items-start px-4 first:pl-0">
                  <span className="stat-num" style={{ fontSize: 'clamp(20px, 2.4vw, 26px)' }}>
                    {s.val}
                  </span>
                  <span className="text-[9.5px] font-mono tracking-[0.22em] uppercase text-ink-3 mt-1.5">
                    {s.label}
                  </span>
                </span>
                {i < 2 && (
                  <span
                    className="h-6 w-px flex-shrink-0"
                    style={{ background: 'var(--border-md)' }}
                  />
                )}
              </span>
            ))}
          </motion.div>

          {/* Live status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.8 }}
            className="mt-7 inline-flex items-center gap-2.5 text-[11.5px] font-mono tracking-wide text-ink-3"
          >
            <span className="pulse-dot-wrap">
              <span className="dot" />
            </span>
            Currently building Luminar OS · Dhaka
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="relative z-10 mt-auto flex justify-center pb-10"
      >
        <div className="flex flex-col items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-ink-3">
          <span>Scroll</span>
          <div className="relative h-12 w-px bg-line overflow-hidden">
            <div className="scan-line" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDiag() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
