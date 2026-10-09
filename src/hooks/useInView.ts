import { useEffect, useRef, useState } from "react";

/** True while element is visible; used to lazy-play/pause menu videos. */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}
