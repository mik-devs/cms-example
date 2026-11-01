import { Link } from '@inertiajs/react';
import { Container } from '@/components/kiblawan/ui/container';

export function PageHeader({
    title,
    subtitle,
}: {
    title: string;
    subtitle?: string;
}) {
    return (
        <div className="border-b border-line-soft bg-cream">
            <Container className="py-12 md:py-16">
                <nav
                    aria-label="Breadcrumb"
                    className="mb-3 flex items-center gap-2 text-[0.78rem] tracking-wider text-ink-muted uppercase"
                >
                    <Link href="/" className="hover:text-gold">
                        Home
                    </Link>
                    <span className="text-line-soft">/</span>
                    <span className="font-semibold text-forest">{title}</span>
                </nav>
                <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight font-bold text-forest">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-3 max-w-2xl text-ink-muted">{subtitle}</p>
                )}
            </Container>
        </div>
    );
}
