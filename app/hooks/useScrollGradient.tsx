'use client';

import { useEffect, useState, RefObject } from 'react';

export function useScrollGradient(
  scrollRef: RefObject<HTMLElement | null>,
  enabled: boolean
) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const el = scrollRef.current;
    if (!el) return;

    // console.log('Scroll listener attached');

    const onScroll = () => {
      // console.log('scrollTop:', el.scrollTop);
      setScrolled(el.scrollTop > 10);
    };

    el.addEventListener('scroll', onScroll);
    onScroll();

    return () => el.removeEventListener('scroll', onScroll);
  }, [scrollRef, enabled]); // 👈 enabled triggers rerun

  return scrolled;
}
