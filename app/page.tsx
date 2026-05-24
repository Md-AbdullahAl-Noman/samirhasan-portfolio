import Hero from '@/components/Hero';
import About from '@/components/About';
import Conviction from '@/components/Conviction';
import Work from '@/components/Work';
import Journey from '@/components/Journey';
import Vision from '@/components/Vision';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeStrip />
      <Divider />
      <About />
      <Divider />
      <Conviction />
      <Divider />
      <Work />
      <Divider />
      <Journey />
      <Divider />
      <Vision />
      <Divider />
      <Contact />
    </main>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-site px-5 sm:px-8">
      <div className="divider-glow" />
    </div>
  );
}

const MARQUEE_ITEMS = [
  'Luminar Technology',
  'Applied AI',
  'Prenda Solution',
  'Compute Infrastructure',
  'BanglaReels',
  'Design Systems',
  'Memorica',
  'Product Strategy',
  'Autoworx Tech',
  'TypeScript · Next.js',
  'Levant IT',
  'Venture Building',
];

function MarqueeStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className="relative overflow-hidden border-y"
      style={{
        borderColor: 'var(--border)',
        background: 'linear-gradient(90deg, rgba(15,26,46,0.50), rgba(11,18,32,0.30))',
      }}
    >
      <div className="py-[13px] marquee-track">
        {items.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span
              className="px-7 text-[10px] font-mono tracking-[0.22em] uppercase whitespace-nowrap"
              style={{ color: 'var(--text-3)' }}
            >
              {item}
            </span>
            <span
              className="h-[5px] w-[5px] rounded-full shrink-0"
              style={{
                background: i % 3 === 0
                  ? 'rgba(212,176,104,0.45)'
                  : i % 3 === 1
                    ? 'rgba(96,165,250,0.40)'
                    : 'rgba(255,255,255,0.18)',
                boxShadow: i % 3 === 0
                  ? '0 0 5px rgba(212,176,104,0.35)'
                  : i % 3 === 1
                    ? '0 0 5px rgba(96,165,250,0.30)'
                    : 'none',
              }}
            />
          </span>
        ))}
      </div>
      {/* Edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-20"
        style={{ background: 'linear-gradient(90deg, var(--bg), transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-20"
        style={{ background: 'linear-gradient(270deg, var(--bg), transparent)' }}
      />
    </div>
  );
}
