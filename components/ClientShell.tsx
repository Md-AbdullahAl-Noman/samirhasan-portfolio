'use client';

import { useState } from 'react';
import IntroLoader from './IntroLoader';
import MusicPlayer from './MusicPlayer';

export default function ClientShell() {
  const [audioChoice, setAudioChoice] = useState<boolean | null>(null);

  return (
    <>
      <IntroLoader onEnter={setAudioChoice} />
      <MusicPlayer audioChoice={audioChoice} />
    </>
  );
}
