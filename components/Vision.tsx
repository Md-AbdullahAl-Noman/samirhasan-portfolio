'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const horizons = [
  {
    window: '2026 – 2028',
    title: 'The Operating Layer',
    body: 'Luminar/OS ships to a thousand teams. Aether becomes the default inference substrate for frontier workloads. The portfolio companies compound.',
  },
  {
    window: '2028 – 2032',
    title: 'Ambient Intelligence',
    body: 'Compute dissolves into context. The Luminar stack becomes connective tissue between human intent and machine execution — invisible, reliable, fast.',
  },
  {
    window: '2032 – ∞',
    title: 'New Civic Infrastructure',
    body: 'Education, governance, and capital evolve around the assumption of universal machine intelligence. The builders who built the rails will shape what runs on them.',
  },
];

export default function Vision() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const rotate4 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yShift = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      id="vision"
      ref={ref}
      className="relative py-28 md:py-44 overflow-hidden"
    >
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: yShift }}
          className="absolute right-[-20%] top-1/2 -translate-y-1/2 h-[90vh] w-[90vh] hidden lg:block"
        >
          {/* Ring 1 — outermost, slow */}
          <motion.div style={{ rotate: rotate1 }} className="absolute inset-0">
            <svg viewBox="0 0 500 500" className="h-full w-full opacity-[0.07]">
              <circle
                cx="250"
                cy="250"
                r="240"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="0.6"
              />
            </svg>
          </motion.div>

          {/* Ring 2 — dashed, reverse */}
          <motion.div
            style={{ rotate: rotate2 }}
            className="absolute inset-[6%]"
          >
            <svg viewBox="0 0 500 500" className="h-full w-full opacity-[0.09]">
              <circle
                cx="250"
                cy="250"
                r="230"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="0.5"
                strokeDasharray="8 14"
              />
            </svg>
          </motion.div>

          {/* Ring 3 — mid */}
          <motion.div
            style={{ rotate: rotate3 }}
            className="absolute inset-[15%]"
          >
            <svg viewBox="0 0 500 500" className="h-full w-full opacity-[0.11]">
              <circle
                cx="250"
                cy="250"
                r="220"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="0.8"
              />
              <circle cx="250" cy="20" r="5" fill="#60A5FA" />
              <circle cx="250" cy="480" r="3" fill="#60A5FA" opacity="0.5" />
            </svg>
          </motion.div>

          {/* Ring 4 — dotted, fast */}
          <motion.div
            style={{ rotate: rotate4 }}
            className="absolute inset-[25%]"
          >
            <svg viewBox="0 0 500 500" className="h-full w-full opacity-[0.12]">
              <circle
                cx="250"
                cy="250"
                r="200"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="0.5"
                strokeDasharray="3 8"
              />
            </svg>
          </motion.div>

          {/* Ring 5 — inner solid */}
          <div className="absolute inset-[35%]">
            <svg
              viewBox="0 0 500 500"
              className="h-full w-full animate-spin-slow opacity-[0.15]"
            >
              <circle
                cx="250"
                cy="250"
                r="180"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="1"
              />
              <circle
                cx="250"
                cy="250"
                r="110"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="0.5"
                strokeDasharray="4 7"
              />
              <circle cx="250" cy="70" r="4" fill="#60A5FA" />
              <circle cx="430" cy="250" r="2.5" fill="#60A5FA" opacity="0.7" />
            </svg>
          </div>

          {/* Core glow */}
          <div
            className="absolute inset-[42%] rounded-full aurora-orb"
            style={{
              background:
                'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-site px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0.6, 0.2, 1] }}
          className="eyebrow mb-8"
        >
          04 — Vision
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.95, ease: [0.2, 0.6, 0.2, 1] }}
          className="font-display tracking-ultra text-white leading-[1.0] max-w-[800px] mb-16 md:mb-24"
          style={{ fontSize: 'clamp(42px, 6vw, 80px)' }}
        >
          Building the
          <br />
          <span className="italic text-gradient">infrastructure</span>
          <br />
          of what comes next.
        </motion.h2>

        {/* Horizons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20 md:mb-28">
          {horizons.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: i * 0.12,
                duration: 0.85,
                ease: [0.2, 0.6, 0.2, 1],
              }}
              className="glass rounded-2xl p-7 flex flex-col gap-4 relative overflow-hidden group card-premium"
            >
              {/* Corner number */}
              <div
                className="pointer-events-none absolute -right-2 -top-3 font-display text-[80px] leading-none select-none opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500"
                style={{ color: '#60A5FA' }}
              >
                H{i + 1}
              </div>

              <div className="flex items-center justify-between relative z-10">
                <span className="font-mono text-[10px] tracking-widest uppercase text-ink-3">
                  H {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[10px] tracking-wide text-ink-3">
                  {h.window}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-px w-full bg-line relative z-10">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent/80 to-accent/20"
                  initial={{ width: '0%' }}
                  whileInView={{ width: `${33 + i * 33}%` }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + i * 0.1,
                    duration: 1.2,
                    ease: [0.2, 0.6, 0.2, 1],
                  }}
                />
              </div>

              <h3
                className="font-display text-white leading-[1.15] tracking-tight relative z-10"
                style={{ fontSize: 'clamp(22px, 1.8vw, 28px)' }}
              >
                {h.title}
              </h3>
              <p
                className="text-[14px] text-ink-2 leading-[1.75] relative z-10"
                style={{ fontWeight: 300 }}
              >
                {h.body}
              </p>

              <span className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease: [0.2, 0.6, 0.2, 1] }}
          className="max-w-[780px] mx-auto text-center"
        >
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-3 block mb-8">
            Founder Letter · 2025
          </span>
          <blockquote
            className="font-display italic text-white/85 leading-[1.25] tracking-tight"
            style={{ fontSize: 'clamp(24px, 3.5vw, 44px)' }}
          >
            &ldquo;The next great companies won&apos;t be built by those chasing
            the present. They&apos;ll be built by those who quietly assemble the{' '}
            <span className="text-gradient not-italic">
              instruments of the future
            </span>{' '}
            — decades before the rest of the world realizes they were the
            prize.&rdquo;
          </blockquote>
          <div className="mt-10 inline-flex items-center gap-3 text-[12px] font-mono text-ink-3">
            <span className="h-px w-8 bg-line" />
            Samir Hasan
            <span className="h-px w-8 bg-line" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
