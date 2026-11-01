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
        <nav
            aria-label="Continue reading about Kiblawan"
            className="mt-24 border-t border-line-soft pt-12"
        >
            <h2 className="mb-6 font-display text-2xl font-bold text-forest">
                Continue Reading
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
                {nextPages.map((page) => (
                    <Link
                        key={page.key}
                        href={page.href}
                        className="group flex min-h-24 items-center justify-between gap-4 rounded-[20px] border border-line-soft bg-white/80 px-6 py-5 font-semibold text-forest shadow-k-soft backdrop-blur-[14px] transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-k-glow"
                    >
                        <span>
                            <span className="mb-1 block text-xs font-bold tracking-[0.12em] text-ink-muted uppercase">
                                Continue to
                            </span>
                            {page.label}
                        </span>
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
