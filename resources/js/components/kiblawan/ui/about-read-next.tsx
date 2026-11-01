import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

const pages = [
    { key: 'history', label: 'History of Kiblawan', href: '/about/history' },
    {
        key: 'demographic',
        label: 'Demographic Profile',
        href: '/about/demographic',
    },
    {
        key: 'socio-economic',
        label: 'Socio-Economic Profile',
        href: '/about/socio-economic',
    },
    {
        key: 'geography',
        label: 'Physical / Geographical Profile',
        href: '/about/geography',
    },
] as const;

export function AboutReadNext({ currentSection }: { currentSection: string }) {
    const nextPages = pages.filter((page) => page.key !== currentSection);

    return (
        <nav aria-label="Read next" className="mt-8">
            <h2 className="mb-4 font-display text-xl font-bold text-forest">
                Read Next
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
                {nextPages.map((page) => (
                    <Link
                        key={page.key}
                        href={page.href}
                        className="group flex min-h-20 items-center justify-between gap-3 rounded-2xl border border-line-soft bg-white/80 px-4 py-4 text-sm font-semibold text-forest shadow-k-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-k-card"
                    >
                        <span>{page.label}</span>
                        <ArrowRight
                            className="size-4 shrink-0 text-gold transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                        />
                    </Link>
                ))}
            </div>
        </nav>
    );
}
