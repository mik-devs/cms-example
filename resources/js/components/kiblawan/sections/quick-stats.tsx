import { Container } from '@/components/kiblawan/ui/container';
import { StatCounter } from '@/components/kiblawan/ui/stat-counter';
import type { Stat } from '@/types';

export function QuickStats({ stats }: { stats: Stat[] }) {
    if (stats.length === 0) {
        return null;
    }

    return (
        <section className="border-t-[6px] border-b-[6px] border-t-gold border-b-dark-brown bg-k-grad-green py-16 text-white shadow-[inset_0_4px_30px_rgba(0,0,0,0.12)]">
            <Container>
                <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 md:gap-0">
                    {stats.map((stat) => (
                        <div key={stat.id} className="md:px-4">
                            <StatCounter
                                label={stat.label}
                                value={stat.value}
                                suffix={stat.suffix}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
