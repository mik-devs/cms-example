import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface HeadlineAction {
    label: string;
    href: string;
}

export function Headline({
    title,
    action,
    align = 'left',
    className,
}: {
    title: React.ReactNode;
    action?: HeadlineAction;
    align?: 'left' | 'center';
    className?: string;
}) {
    return (
        <h2
            className={cn(
                'relative mb-11 pb-[1.1rem] font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold tracking-[-0.01em] text-forest',
                className,
            )}
        >
            <span
                className={cn(
                    'flex flex-wrap items-end justify-between gap-4',
                    align === 'center' && 'justify-center text-center',
                )}
            >
                <span>{title}</span>
                {action && (
                    <Link
                        href={action.href}
                        className="inline-flex items-center font-sans text-[0.85rem] font-extrabold tracking-[0.06em] text-maroon uppercase transition-all hover:translate-x-1 hover:text-gold"
                    >
                        {action.label}
                    </Link>
                )}
            </span>
            <span
                aria-hidden="true"
                className={cn(
                    'absolute bottom-0 h-[5px] w-[72px] rounded-[4px] bg-gold',
                    align === 'left' ? 'left-0' : 'left-1/2 -translate-x-1/2',
                )}
            />
        </h2>
    );
}
