import { type RefObject, useEffect, useRef } from "react";

export function useOnVisible<T extends HTMLElement = HTMLDivElement>(
  onVisible: () => void,
  options: IntersectionObserverInit = {}
): RefObject<T | null> {
  const ref: RefObject<T | null> = useRef(null);
  const optionsRef = useRef(options);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]): void => {
        if (entry.isIntersecting) {
          onVisible();
          observer.disconnect();
        }
      },
      optionsRef.current
    );

    observer.observe(ref.current);

    return (): void => observer.disconnect();
  }, [onVisible]);

  return ref;
}
