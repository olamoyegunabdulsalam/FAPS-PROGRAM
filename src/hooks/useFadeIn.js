import { useState, useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the returned `ref`.
 * `visible` flips to `true` once the element enters the viewport.
 *
 * Usage:
 *   const [ref, visible] = useFadeIn();
 *   <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)" }} />
 */
export function useFadeIn(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}
