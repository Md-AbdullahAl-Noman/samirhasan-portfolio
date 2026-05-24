'use client';

import { motion } from 'framer-motion';
import { useRef, useState, type CSSProperties, type ReactNode } from 'react';

type Belief = {
  n: string;
  headline: string;
  detail: string;
  accent: string;
  chipBg: string;
  chipBorder: string;
  chipColor: string;
  topLine: string;
  bottomLine: string;
  innerGlow: string;
  hoverClass: string;
};

const beliefs: Belief[] = [
  {
    n: '01',
    headline: 'Taste is a technology.',
    detail:
      'How a product feels is not a layer you add at the end. It is a constraint you design to from day one — and the teams that internalize this ship better products, faster.',
    accent: 'Craft',
    chipBg: 'rgba(37,99,235,0.12)',
    chipBorder: 'rgba(96,165,250,0.30)',
    chipColor: 'rgb(96,165,250)',
    topLine: 'rgba(96,165,250,0.80)',
    bottomLine: 'rgba(96,165,250,0.30)',
    innerGlow: 'rgba(37,99,235,0.06)',
    hoverClass: 'card-premium',
  },
  {
    n: '02',
    headline: 'Restraint compounds.',
    detail:
      "Every feature you don't ship is a decision you didn't reverse later. The best products I admire are distinguished not by what they do, but by what they refuse to do.",
    accent: 'Discipline',
    chipBg: 'rgba(212,176,104,0.12)',
    chipBorder: 'rgba(212,176,104,0.35)',
    chipColor: 'rgb(232,200,112)',
    topLine: 'rgba(212,176,104,0.80)',
    bottomLine: 'rgba(212,176,104,0.30)',
    innerGlow: 'rgba(212,176,104,0.05)',
    hoverClass: 'card-gold-hover',
  },
  {
    n: '03',
    headline: 'Speed is a moral act.',
    detail:
      "Moving fast on the right things is a form of respect — for your team's time, your users' lives, and the window of relevance that opens only briefly for any idea.",
    accent: 'Velocity',
    chipBg: 'rgba(16,185,129,0.10)',
    chipBorder: 'rgba(52,211,153,0.30)',
    chipColor: 'rgb(52,211,153)',
    topLine: 'rgba(52,211,153,0.80)',
    bottomLine: 'rgba(16,185,129,0.30)',
    innerGlow: 'rgba(16,185,129,0.05)',
    hoverClass: 'card-emerald-hover',
  },
  {
    n: '04',
    headline: 'Intelligence is infrastructure.',
    detail:
      'We are in the process of rebuilding every layer of software on top of thinking machines. The founders who treat intelligence as infrastructure — not a feature — will architect what survives.',
    accent: 'Vision',
    chipBg: 'rgba(139,92,246,0.12)',
    chipBorder: 'rgba(167,139,250,0.30)',
    chipColor: 'rgb(167,139,250)',
    topLine: 'rgba(167,139,250,0.80)',
    bottomLine: 'rgba(139,92,246,0.30)',
    innerGlow: 'rgba(139,92,246,0.06)',
    hoverClass: 'card-purple-hover',
  },
];

function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  const onMouseMove = (e: React.MouseEvent) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -7;
    const ry = ((x - cx) / cx) * 7;
    setStyle({
      transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`,
      transition: 'transform 0.08s ease',
    });
  };

  const onMouseLeave = () => {
    setStyle({
      transform: 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)',
      transition: 'transform 0.45s cubic-bezier(0.2,0.6,0.2,1)',
    });
  };

  return (
    <div
      ref={ref}
      style={{ ...style, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

export default function Conviction() {
  return (
    <section id="conviction" className="relative py-28 md:py-44">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-bg-alt/50 to-transparent" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[60vh] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-site px-5 sm:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:mb-24">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.2, 0.6, 0.2, 1] }}
              className="eyebrow mb-7"
            >
              01 — Conviction
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: [0.2, 0.6, 0.2, 1] }}
              className="font-display tracking-ultra text-white leading-[1.05]"
              style={{ fontSize: 'clamp(38px, 5vw, 60px)' }}
            >
              What I believe
              <br />
              <span className="italic text-gradient">about building.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.2, 0.6, 0.2, 1] }}
            className="self-end max-w-prose"
          >
            <p className="text-[16px] text-ink-2 leading-[1.75]" style={{ fontWeight: 300 }}>
              These aren&apos;t brand values. They&apos;re working principles that have been
              tested against real decisions — hiring, shipping, killing, and rebuilding.
            </p>
          </motion.div>
        </div>

        {/* Beliefs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {beliefs.map((b, i) => (
            <motion.div
              key={b.n}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ delay: i * 0.1, duration: 0.85, ease: [0.2, 0.6, 0.2, 1] }}
            >
              <TiltCard>
                <div
                  className={`glass rounded-2xl p-7 sm:p-9 group transition-all duration-400 relative overflow-hidden cursor-default ${b.hoverClass}`}
                  style={{ border: '1px solid var(--border)' }}
                >
                  {/* Number watermark */}
                  <div
                    className="pointer-events-none absolute -right-3 -top-4 font-display text-[110px] leading-none select-none opacity-[0.025] group-hover:opacity-[0.07] transition-opacity duration-500"
                    style={{ color: b.chipColor }}
                  >
                    {b.n}
                  </div>

                  {/* Top accent glow line (unique color per card) */}
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${b.topLine}, transparent)`,
                    }}
                  />

                  {/* Bottom accent line */}
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${b.bottomLine}, transparent)`,
                    }}
                  />

                  {/* Inner glow on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${b.innerGlow} 0%, transparent 70%)`,
                    }}
                  />

                  <div className="flex items-center justify-between mb-7 relative z-10">
                    {/* Unique accent chip per belief */}
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full font-mono text-[9.5px] font-normal tracking-[0.16em] uppercase"
                      style={{
                        background: b.chipBg,
                        border: `1px solid ${b.chipBorder}`,
                        color: b.chipColor,
                      }}
                    >
                      {b.accent}
                    </span>
                  </div>

                  <h3
                    className="font-display text-white mb-4 leading-[1.15] tracking-tight relative z-10 group-hover:text-gradient transition-all duration-300"
                    style={{ fontSize: 'clamp(24px, 2.2vw, 32px)' }}
                  >
                    {b.headline}
                  </h3>

                  <p
                    className="text-[14px] sm:text-[15px] text-ink-2 leading-[1.75] relative z-10"
                    style={{ fontWeight: 300 }}
                  >
                    {b.detail}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
