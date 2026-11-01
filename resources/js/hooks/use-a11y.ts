import { useCallback, useEffect, useState } from 'react';

export type A11ySize = 'sm' | 'md' | 'lg';

const SIZE_KEY = 'a11y-size';
const CONTRAST_KEY = 'a11y-contrast';

function isA11ySize(value: string | null): value is A11ySize {
    return value === 'sm' || value === 'md' || value === 'lg';
}

function applySize(size: A11ySize): void {
    if (typeof document === 'undefined') {
        return;
    }

    document.documentElement.setAttribute('data-a11y-size', size);
}

function applyContrast(contrast: boolean): void {
    if (typeof document === 'undefined') {
        return;
    }

    document.documentElement.classList.toggle('high-contrast', contrast);
}

export function useA11y() {
    const [size, setSizeState] = useState<A11ySize>('md');
    const [contrast, setContrast] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const storedSize = window.localStorage.getItem(SIZE_KEY);
        const storedContrast =
            window.localStorage.getItem(CONTRAST_KEY) === 'true';

        const resolvedSize = isA11ySize(storedSize) ? storedSize : 'md';

        setSizeState(resolvedSize);
        setContrast(storedContrast);
        applySize(resolvedSize);
        applyContrast(storedContrast);
    }, []);

    const setSize = useCallback((next: A11ySize) => {
        setSizeState(next);
        applySize(next);

        if (typeof window !== 'undefined') {
            window.localStorage.setItem(SIZE_KEY, next);
        }
    }, []);

    const toggleContrast = useCallback(() => {
        setContrast((current) => {
            const next = !current;
            applyContrast(next);

            if (typeof window !== 'undefined') {
                window.localStorage.setItem(CONTRAST_KEY, String(next));
            }

            return next;
        });
    }, []);

    return { size, setSize, contrast, toggleContrast };
}
