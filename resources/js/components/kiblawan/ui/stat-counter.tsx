import { useCountUp } from '@/hooks/use-count-up';
import { useInView } from '@/hooks/use-in-view';

export function StatCounter({
    label,
    value,
    suffix,
}: {
    label: string;
    value: number;
    suffix?: string | null;
}) {
    const { ref, inView } = useInView<HTMLDivElement>();
    const count = useCountUp(value, { start: inView });

    return (
        <div ref={ref} className="text-center">
            <div className="mb-3 font-display text-[3.4rem] leading-none font-extrabold text-gold-soft [text-shadow:0_4px_16px_rgba(0,0,0,0.25)]">
                {count}
                {suffix}
            </div>
            <div className="text-[0.92rem] font-semibold tracking-[0.14em] text-mint-pale uppercase">
                {label}
            </div>
        </div>
    );
}
