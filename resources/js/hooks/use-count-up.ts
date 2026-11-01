import { useEffect, useRef, useState } from 'react';

const STEP_TIME = 20;

export function useCountUp(
    target: number,
    {
        duration = 2000,
        start = true,
    }: { duration?: number; start?: boolean } = {},
): number {
    const [value, setValue] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const finishedRef = useRef(false);

    useEffect(() => {
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!start || finishedRef.current) {
            return;
        }

        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        const steps = Math.max(1, Math.round(duration / STEP_TIME));
        const increment = target / steps;
        let current = 0;

        intervalRef.current = setInterval(() => {
            current += increment;

            if (current >= target) {
                finishedRef.current = true;
                setValue(target);

                if (intervalRef.current !== null) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }

                return;
            }

            setValue(Math.ceil(current));
        }, STEP_TIME);
    }, [start, target, duration]);

    return value;
}
