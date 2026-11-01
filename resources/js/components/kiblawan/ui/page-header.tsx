import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/kiblawan/ui/container';

export function PageHeader({
    title,
    subtitle,
    breadcrumbParent,
    breadcrumbParentHref,
    breadcrumbSuffix,
}: {
    title: string;
    subtitle?: string;
    breadcrumbParent?: string;
    breadcrumbParentHref?: string;
    breadcrumbSuffix?: string;
}) {
    return (
        <div className="relative overflow-hidden border-b border-line-soft bg-gradient-to-br from-cream via-cream to-green-soft/30">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 right-[-4rem] size-72 rounded-full bg-gold/10 blur-3xl"
            />
            <Container className="py-12 md:py-16">
                <nav
                    aria-label="Breadcrumb"
                    className="relative mb-4 flex flex-wrap items-center gap-2 text-sm tracking-wider uppercase"
                >
                    <Link
                        href="/"
                        className="text-ink-muted transition-colors hover:text-gold"
                    >
                        Home
                    </Link>
                    <ChevronRight
                        aria-hidden="true"
                        className="size-3.5 text-gold/70"
                    />
                    {breadcrumbParent ? (
                        <>
                            {breadcrumbParentHref ? (
                                <Link
                                    href={breadcrumbParentHref}
                                    className="text-ink-muted transition-colors hover:text-gold"
                                >
                                    {breadcrumbParent}
                                </Link>
                            ) : (
                                <span className="text-ink-muted">
                                    {breadcrumbParent}
                                </span>
                            )}
                        </>
                    ) : null}
                    {breadcrumbSuffix && (
                        <>
                            <ChevronRight
                                aria-hidden="true"
                                className="size-3.5 text-gold/70"
                            />
                            <span
                                aria-current="page"
                                className="font-bold text-forest"
                            >
                                {breadcrumbSuffix}
                            </span>
                        </>
                    )}
                </nav>
                <h1 className="relative font-display text-[clamp(2rem,4vw,3rem)] leading-tight font-bold text-forest">
                    {title}
                </h1>
                {subtitle && (
                    <p className="relative mt-3 max-w-2xl leading-7 text-ink-muted">
                        {subtitle}
                    </p>
                )}
            </Container>
        </div>
    );
}
