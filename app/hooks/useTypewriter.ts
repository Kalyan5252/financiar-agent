// app/hooks/useTypewriter.ts
'use client';

import { useEffect, useState } from 'react';

export function useTypewriter(text: string, speed = 40, enabled = true) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!enabled) {
      setDisplayed('');
      return;
    }

    setDisplayed('');
    let i = 0;

    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return displayed;
}
