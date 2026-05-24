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
      <hr className="rule" />
    </div>
  );
}
