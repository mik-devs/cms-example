import { useEffect, useRef, useState } from 'react';

export function useInView<T extends Element = HTMLDivElement>({
    threshold = 0.2,
    rootMargin = '0px',
    root = null,
}: IntersectionObserverInit = {}): {
    ref: React.RefObject<T | null>;
    inView: boolean;
} {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;

        if (!node || typeof IntersectionObserver === 'undefined') {
            setInView(true);

            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                if (entry?.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin, root },
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [threshold, rootMargin, root]);

    return { ref, inView };
}
