'use client';

import { motion, AnimatePresence, animate, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

const ease = [0.2, 0.6, 0.2, 1] as const;

function WavyText({ text, delay, gradient = false }: { text: string; delay: number; gradient?: boolean }) {
  return (
    <div className="flex justify-center">
      {text.split('').map((letter, i) => {
        const d = delay + i * 0.08;
        return (
          <span
            key={`${i}-${letter}`}
            style={
              gradient
                ? {
                    display: 'inline-block',
                    fontSize: 'clamp(58px, 10vw, 112px)',
                    animation: `wave-text 1.2s ${d}s ease-in-out infinite, grad 8s ease-in-out infinite`,
                    background:
                      'linear-gradient(110deg, #fff 8%, #60A5FA 32%, #3B82F6 50%, #D4B068 68%, #60A5FA 86%, #fff 100%)',
                    backgroundSize: '260% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }
                : {
                    display: 'inline-block',
                    fontSize: 'clamp(58px, 10vw, 112px)',
                    animation: `wave-text 1.2s ${d}s ease-in-out infinite`,
                  }
            }
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
}

function LineReveal({
  children,
  delay,
  className,
  style,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.85, ease }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const r = pos.includes('r');
  const b = pos.includes('b');
  return (
    <motion.div
      className={`absolute ${b ? 'bottom-7 sm:bottom-9' : 'top-7 sm:top-9'} ${r ? 'right-7 sm:right-9' : 'left-7 sm:left-9'} w-[22px] h-[22px]`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.32, duration: 0.5, ease }}
    >
      <div
        className={`absolute ${r ? 'right-0' : 'left-0'} top-0 bottom-0 w-px`}
        style={{
          background: 'linear-gradient(to bottom, rgba(96,165,250,0.7), rgba(212,176,104,0.4))',
          boxShadow: '0 0 6px rgba(96,165,250,0.5)',
        }}
      />
      <div
        className={`absolute left-0 right-0 ${b ? 'bottom-0' : 'top-0'} h-px`}
        style={{
          background: 'linear-gradient(to right, rgba(96,165,250,0.7), rgba(212,176,104,0.4))',
          boxShadow: '0 0 6px rgba(96,165,250,0.5)',
        }}
      />
    </motion.div>
  );
}

export default function IntroLoader() {
  const [mounted, setMounted]   = useState(false);
  const [done, setDone]         = useState(false);
  const [pct, setPct]           = useState(0);
  const raw                     = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setDone(true), 2750);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const ctrl = animate(raw, 100, {
      delay: 1.0,
      duration: 1.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setPct(Math.round(v)),
    });
    return ctrl.stop;
  }, [raw]);

  useEffect(() => {
    if (done) document.body.style.overflow = '';
  }, [done]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, #0F1A2E 0%, #0B1220 70%, #070A14 100%)',
          }}
        >
          {/* Premium top progress bar (gold-blue gradient) */}
          <motion.div
            className="absolute top-0 left-0 h-[2px] pointer-events-none z-30"
            style={{
              width: `${pct}%`,
              background:
                'linear-gradient(90deg, rgba(37,99,235,0.5) 0%, rgba(96,165,250,0.9) 35%, rgba(212,176,104,0.9) 65%, rgba(96,165,250,0.9) 100%)',
              boxShadow:
                '0 0 12px rgba(96,165,250,0.7), 0 0 24px rgba(212,176,104,0.3)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(96,165,250,0.18), transparent)',
            }}
          />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 grid-overlay opacity-[0.18]"
            style={{
              maskImage:
                'radial-gradient(ellipse 70% 70% at 50% 50%, black 25%, transparent 78%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 70% 70% at 50% 50%, black 25%, transparent 78%)',
            }}
          />

          {/* Premium centre glow — sapphire with champagne accent */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="h-[60vh] w-[65vw] rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, rgba(96,165,250,0.08) 40%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
            <div
              className="absolute h-[30vh] w-[35vw] rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse, rgba(212,176,104,0.12) 0%, transparent 60%)',
                filter: 'blur(90px)',
                transform: 'translate(20%, -10%)',
              }}
            />
          </div>

          {/* Scan line – wavy sweep top → bottom */}
          <motion.div
            className="pointer-events-none absolute left-0 right-0 h-[2px] z-20 wave-scan-line"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(96,165,250,0.95), rgba(212,176,104,0.7), rgba(96,165,250,0.95), transparent)',
              boxShadow:
                '0 0 10px 3px rgba(96,165,250,0.50), 0 0 36px 6px rgba(212,176,104,0.18)',
            }}
            initial={{ top: '-2px' }}
            animate={{ top: '100%' }}
            transition={{ delay: 0.06, duration: 0.6, ease: 'linear' }}
          />

          {/* Corner brackets */}
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />

          {/* ── Main content ── */}
          <div className="relative z-10 flex flex-col items-center">

            {/* Name with wavy animation */}
            <motion.div
              className="flex flex-col items-center text-center -space-y-1 sm:-space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44, duration: 0.3 }}
            >
              <div className="font-display text-white leading-[1.0] tracking-ultra" style={{ color: '#F8FAFC' }}>
                <WavyText text="Samir" delay={0.44} />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.57, duration: 0.3 }}
                className="font-display italic leading-[1.0] tracking-ultra"
              >
                <WavyText text="Hasan" delay={0.57} gradient />
              </motion.div>
            </motion.div>

            {/* Premium expand line under name */}
            <motion.div
              className="mt-6 h-px"
              style={{
                width: '100%',
                background:
                  'linear-gradient(90deg, transparent, rgba(96,165,250,0.6) 25%, rgba(212,176,104,0.7) 50%, rgba(96,165,250,0.6) 75%, transparent)',
                boxShadow:
                  '0 0 14px rgba(96,165,250,0.45), 0 0 28px rgba(212,176,104,0.18)',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.90, duration: 0.65, ease }}
            />

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.12, duration: 0.6, ease }}
              className="mt-5 flex items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.32em] uppercase"
              style={{ color: 'rgba(226,232,240,0.6)' }}
            >
              <span
                className="h-px w-8"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(212,176,104,0.4))',
                }}
              />
              Founder · Luminar Technology
              <span
                className="h-px w-8"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(212,176,104,0.4), transparent)',
                }}
              />
            </motion.div>
          </div>

          {/* Progress counter – bottom right */}
          <motion.div
            className="absolute bottom-7 right-8 sm:bottom-9 sm:right-10 font-mono text-[11px] sm:text-[13px] tracking-[0.20em] tabular-nums flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.88, duration: 0.35 }}
          >
            <span style={{ color: 'rgba(96,165,250,0.5)' }}>LOADING</span>
            <span
              style={{
                background:
                  'linear-gradient(90deg, #60A5FA, #D4B068)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontWeight: 600,
              }}
            >
              {String(pct).padStart(3, '0')}
            </span>
          </motion.div>

          {/* Bottom label – center */}
          <motion.div
            className="absolute bottom-7 sm:bottom-9 left-1/2 -translate-x-1/2 font-mono text-[9px] sm:text-[10px] tracking-[0.36em] uppercase whitespace-nowrap"
            style={{ color: 'rgba(226,232,240,0.45)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.55, duration: 0.5, ease }}
          >
            Luminar Technology · Dhaka, BD
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
