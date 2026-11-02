import type { ReactNode } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function AboutRevealRow({
    left,
    right,
    reverse = false,
    className = '',
}: {
    left: ReactNode;
    right: ReactNode;
    reverse?: boolean;
    className?: string;
}) {
    const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
    const visibilityClass = inView ? 'is-visible' : '';

    return (
        <div
            ref={ref}
            className={cn(
                'grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12',
                className,
            )}
        >
            <div
                className={cn(
                    reverse ? 'slide-in-right lg:order-2' : 'slide-in-left',
                    visibilityClass,
                )}
            >
                {left}
            </div>
            <div
                className={cn(
                    reverse ? 'slide-in-left lg:order-1' : 'slide-in-right',
                    visibilityClass,
                )}
            >
                {right}
            </div>
        </div>
    );
}
