import { Container } from '@/components/kiblawan/ui/container';

export function PageHeader({
    title,
    subtitle,
}: {
    title: string;
    subtitle?: string;
}) {
    return (
        <div
            className="relative overflow-hidden border-b border-line-soft bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/kib.png)' }}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/80 to-forest/70"
            />
            <Container className="relative z-10 py-16 text-center md:py-24">
                <div
                    aria-hidden="true"
                    className="mx-auto mb-6 h-1 w-16 rounded-full bg-gold"
                />
                <h1 className="font-display text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/90 md:text-xl">
                        {subtitle}
                    </p>
                )}
            </Container>
        </div>
    );
}
