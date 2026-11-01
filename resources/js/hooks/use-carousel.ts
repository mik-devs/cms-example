import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseCarouselOptions {
    length: number;
    autoplay?: boolean;
    timeout?: number;
    pauseOnHover?: boolean;
}

export interface UseCarouselReturn {
    index: number;
    isPlaying: boolean;
    goTo: (i: number) => void;
    next: () => void;
    prev: () => void;
    play: () => void;
    pause: () => void;
    containerProps: {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
    };
}

export function useCarousel({
    length,
    autoplay = true,
    timeout = 4500,
    pauseOnHover = true,
}: UseCarouselOptions): UseCarouselReturn {
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearTimer = useCallback((): void => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const startTimer = useCallback((): void => {
        clearTimer();

        if (!autoplay || length <= 1) {
            return;
        }

        timerRef.current = setInterval(() => {
            setIndex((current) => (current + 1) % length);
        }, timeout);
    }, [autoplay, length, timeout, clearTimer]);

    const goTo = useCallback(
        (i: number): void => {
            if (length === 0) {
                return;
            }

            setIndex(((i % length) + length) % length);

            if (isPlaying && !isHovered) {
                startTimer();
            }
        },
        [length, isPlaying, isHovered, startTimer],
    );

    const next = useCallback((): void => {
        goTo(index + 1);
    }, [goTo, index]);

    const prev = useCallback((): void => {
        goTo(index - 1);
    }, [goTo, index]);

    const play = useCallback((): void => setIsPlaying(true), []);

    const pause = useCallback((): void => setIsPlaying(false), []);

    const handleMouseEnter = useCallback((): void => {
        if (pauseOnHover) {
            setIsHovered(true);
        }
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback((): void => {
        if (pauseOnHover) {
            setIsHovered(false);
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (isPlaying && !isHovered) {
            startTimer();
        } else {
            clearTimer();
        }

        return clearTimer;
    }, [isPlaying, isHovered, startTimer, clearTimer]);

    return {
        index,
        isPlaying,
        goTo,
        next,
        prev,
        play,
        pause,
        containerProps: {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
        },
    };
}
