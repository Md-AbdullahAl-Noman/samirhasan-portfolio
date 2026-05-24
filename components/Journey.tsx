'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type WorkChapter = {
  kind: 'work';
  year: string;
  company: string;
  role: string;
  employment: string;
  from: string;
  to: string;
};

type Chapter = WorkChapter;

const chapters: Chapter[] = [
  {
    kind: 'work',
    year: '2025',
    company: 'Luminar Technology',
    role: 'CEO',
    employment: 'Full Time',
    from: 'Mar 2025',
    to: 'Present',
  },
  {
    kind: 'work',
    year: '2023',
    company: 'Autoworx Tech Solution',
    role: 'Project Manager',
    employment: 'Full Time',
    from: 'Nov 2023',
    to: 'Present',
  },
  {
    kind: 'work',
    year: '2021',
    company: 'Levant IT Solution',
    role: 'Co-Founder & Managing Director',
    employment: 'Full Time',
    from: 'Aug 2021',
    to: 'Mar 2025',
  },
];

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.25'],
  });
  const lineH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="journey" ref={sectionRef} className="relative py-16 md:py-28 overflow-hidden">

      {/* Ambient */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[70vh] w-[60vw] rounded-full hidden lg:block"
        style={{
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 65%)',
          filter: 'blur(110px)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-site px-5 sm:px-8">

        {/* Header */}
        <div className="mb-10 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease }}
            className="eyebrow mb-5 justify-center"
          >
            03 — Journey
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
            className="font-display font-bold leading-[1.0] text-white mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 62px)', letterSpacing: '-0.032em' }}
          >
            Three years.{' '}
            <span className="text-gradient italic font-normal">Three chapters.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.12, duration: 0.7, ease }}
            className="text-[14px] text-ink-2 leading-[1.75] mx-auto max-w-[380px]"
            style={{ fontWeight: 300 }}
          >
            A non-linear path from a curious teenager in Dhaka to the CEO of a
            technology holding company — told honestly.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Desktop spine */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-line hidden md:block" />
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-px pointer-events-none origin-top hidden md:block fluid-progress"
            style={{
              height: lineH as unknown as string,
              background: 'linear-gradient(to bottom, var(--accent), rgba(37,99,235,0.10))',
              boxShadow: '0 0 14px rgba(37,99,235,0.50)',
            }}
          />

          {/* Mobile spine */}
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-line md:hidden" />
          <motion.div
            className="absolute left-[18px] top-0 w-px pointer-events-none origin-top md:hidden fluid-progress"
            style={{
              height: lineH as unknown as string,
              background: 'linear-gradient(to bottom, var(--accent), rgba(37,99,235,0.10))',
              boxShadow: '0 0 12px rgba(37,99,235,0.45)',
            }}
          />

          <div>
            {chapters.map((c, i) => (
              <ChapterRow key={`${c.year}-${i}`} chapter={c} index={i} total={chapters.length} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Chapter row ─── */
function ChapterRow({
  chapter,
  index,
  total,
}: {
  chapter: Chapter;
  index: number;
  total: number;
}) {
  const isLast = index === total - 1;
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative ${isLast ? 'pb-0' : 'pb-5 md:pb-7'}`}>

      {/* Mobile */}
      <div className="flex gap-6 md:hidden">
        <div className="relative shrink-0" style={{ width: '36px', paddingTop: '20px' }}>
          <div className="absolute left-[18px] top-5 -translate-x-1/2 z-10">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ delay: 0.15, duration: 0.4, type: 'spring', bounce: 0.55 }}
            >
              <SpineDot index={index} />
            </motion.div>
          </div>
        </div>
        <motion.div
          className="flex-1 min-w-0 pt-2 pb-1"
          initial={{ opacity: 0, x: 24, y: 10 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease, delay: 0.08 }}
        >
          <YearLabel chapter={chapter} />
          <div className="mt-2">
            <WorkCard chapter={chapter} />
          </div>
        </motion.div>
      </div>

      {/* Desktop – alternating */}
      <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr] items-start">

        {/* Left */}
        <div className="pr-7 lg:pr-10 flex justify-end">
          {isLeft && (
            <motion.div
              className="w-full max-w-[400px] lg:max-w-[440px]"
              initial={{ opacity: 0, x: -36, y: 14 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.68, ease, delay: 0.06 }}
            >
              <YearLabel chapter={chapter} align="right" />
              <div className="mt-2">
                <WorkCard chapter={chapter} />
              </div>
              <div
                className="absolute right-0 top-[28px] h-px w-7 lg:w-10"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.22))' }}
              />
            </motion.div>
          )}
        </div>

        {/* Spine dot */}
        <div className="flex justify-center" style={{ paddingTop: '18px' }}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ delay: 0.20, duration: 0.42, type: 'spring', bounce: 0.55 }}
          >
            <SpineDot index={index} />
          </motion.div>
        </div>

        {/* Right */}
        <div className="pl-7 lg:pl-10 flex justify-start">
          {!isLeft && (
            <motion.div
              className="w-full max-w-[400px] lg:max-w-[440px]"
              initial={{ opacity: 0, x: 36, y: 14 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.68, ease, delay: 0.06 }}
            >
              <YearLabel chapter={chapter} align="left" />
              <div className="mt-2">
                <WorkCard chapter={chapter} />
              </div>
              <div
                className="absolute left-0 top-[28px] h-px w-7 lg:w-10"
                style={{ background: 'linear-gradient(270deg, transparent, rgba(37,99,235,0.22))' }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Spine dot ─── */
function SpineDot({ index }: { index: number }) {
  const color = '16,185,129';
  return (
    <div className="relative flex items-center justify-center w-[20px] h-[20px]">
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: `rgba(${color},0.16)`,
          animation: `ping-ring 3.5s ease-out ${index * 0.22}s infinite`,
        }}
      />
      <span
        className="absolute w-[13px] h-[13px] rounded-full"
        style={{ border: `1px solid rgba(${color},0.28)`, background: `rgba(${color},0.07)` }}
      />
      <span
        className="relative z-10 h-[7px] w-[7px] rounded-full"
        style={{
          background: 'rgb(16,185,129)',
          boxShadow: `0 0 8px rgba(${color},0.9), 0 0 20px rgba(${color},0.35)`,
        }}
      />
    </div>
  );
}

/* ─── Year label ─── */
function YearLabel({
  chapter,
  align = 'left',
}: {
  chapter: Chapter;
  align?: 'left' | 'right';
}) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <span
        className="block font-display font-bold leading-none text-gradient"
        style={{ fontSize: 'clamp(22px, 2vw, 30px)', opacity: 0.7 }}
      >
        {chapter.year}
      </span>
      <span className="mt-1 block font-mono text-[9px] tracking-[0.22em] uppercase text-ink-3">
        {chapter.from} — {chapter.to}
      </span>
    </div>
  );
}

/* ─── Work experience card ─── */
function WorkCard({ chapter }: { chapter: WorkChapter }) {
  return (
    <motion.div
      whileHover={{ y: -3, borderColor: 'rgba(16,185,129,0.30)' }}
      transition={{ duration: 0.28, ease }}
      className="relative rounded-2xl overflow-hidden cursor-default group"
      style={{
        background: 'linear-gradient(145deg, rgba(16,185,129,0.06) 0%, rgba(15,26,46,0.82) 100%)',
        border: '1px solid rgba(16,185,129,0.12)',
        backdropFilter: 'blur(28px) saturate(155%)',
        WebkitBackdropFilter: 'blur(28px) saturate(155%)',
        boxShadow: '0 4px 28px rgba(0,0,0,0.24), 0 1px 0 rgba(16,185,129,0.06) inset',
      }}
    >
      {/* Top shimmer */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      {/* Left accent bar */}
      <div
        className="absolute left-0 inset-y-0 w-[2px] rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: 'linear-gradient(180deg, transparent, rgb(16,185,129), transparent)' }}
      />

      <div className="relative z-10 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase"
            style={{
              background: 'rgba(16,185,129,0.10)',
              border: '1px solid rgba(16,185,129,0.22)',
              color: 'rgb(52,211,153)',
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: chapter.to === 'Present' ? 'rgb(52,211,153)' : 'rgba(52,211,153,0.5)',
                boxShadow: chapter.to === 'Present' ? '0 0 6px rgba(52,211,153,0.8)' : 'none',
              }}
            />
            {chapter.employment}
          </span>
          <span className="font-mono text-[9.5px] text-ink-3 tracking-[0.16em]">
            {chapter.from} — {chapter.to}
          </span>
        </div>

        <h3
          className="font-display font-bold text-white leading-[1.15] mb-1"
          style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', letterSpacing: '-0.02em' }}
        >
          {chapter.company}
        </h3>

        <p className="text-[13px] text-ink-3 font-mono">
          {chapter.role}
        </p>
      </div>
    </motion.div>
  );
}

