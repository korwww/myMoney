import { useEffect, useRef } from 'react';

export function useIntersectionObserver(callback?: () => void) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!callback) return;
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver((entires) => {
      entires.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    });

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  });

  return { observerRef };
}
