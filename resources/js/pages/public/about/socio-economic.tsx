import { Fish, Map, Sprout, Store } from 'lucide-react';
import { AboutReadNext } from '@/components/kiblawan/ui/about-read-next';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';

const sectors = [
    {
        title: 'Agriculture',
        description:
            'Farming remains central to local livelihoods, with crops and produce connecting rural communities to regional markets.',
        icon: Sprout,
    },
    {
        title: 'Trade & Industry',
        description:
            'Small businesses, local markets, and growing enterprises connect producers with neighboring communities.',
        icon: Store,
    },
    {
        title: 'Fisheries & Aquaculture',
        description:
            'Freshwater resources and community-based production contribute to local food supply and household livelihoods.',
        icon: Fish,
    },
    {
        title: 'Tourism',
        description:
            'Natural scenery, local culture, and community destinations offer opportunities for responsible visitor experiences.',
        icon: Map,
    },
];

export default function AboutSocioEconomic() {
    return (
        <PublicLayout title="Socio-Economic Profile | About Kiblawan">
            <PageHeader
                title="Socio-Economic Profile"
                breadcrumbParent="About Kiblawan"
                breadcrumbParentHref="/about"
                breadcrumbSuffix="Socio-Economic"
                subtitle="Insights into the livelihoods, industries, and economy of Kiblawan."
            />
            <Section className="bg-cream py-16 md:py-24">
                <Container>
                    <div>
                        <div className="rounded-[24px] border border-line-soft bg-white/80 p-8 shadow-k-card backdrop-blur-[14px] md:p-12">
                            <header>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-extrabold tracking-[0.12em] text-forest uppercase">
                                    <Sprout className="size-3.5 text-gold" />
                                    Local livelihood
                                </div>
                                <h2 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-tight font-bold text-forest">
                                    An economy rooted in opportunity
                                </h2>
                                <p className="mt-3 max-w-2xl leading-7 text-ink-muted">
                                    Kiblawan’s economic life is powered by its
                                    land, resourceful people, and the strength
                                    of local enterprise.
                                </p>
                            </header>
                            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {sectors.map(
                                    ({
                                        title,
                                        description,
                                        icon: Icon,
                                    }) => (
                                        <article
                                            key={title}
                                            className="group min-h-64 rounded-[24px] border border-line-soft bg-white/80 p-8 shadow-k-card backdrop-blur-[14px] transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-k-glow"
                                        >
                                            <div
                                                className="mb-6 flex size-16 items-center justify-center rounded-full bg-green-soft text-green-600 transition-colors group-hover:bg-green/10"
                                            >
                                                <Icon
                                                    className="size-7"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <h3 className="font-display text-xl font-bold text-forest">
                                                {title}
                                            </h3>
                                            <p className="mt-3 leading-7 text-ink-muted">
                                                {description}
                                            </p>
                                        </article>
                                    ),
                                )}
                            </div>
                            <p className="mt-6 text-xs text-ink-muted">
                                Sector descriptions are illustrative demo
                                content pending confirmation with current local
                                economic data.
                            </p>
                        </div>
                        <AboutReadNext currentSection="socio-economic" />
                    </div>
                </Container>
            </Section>
        </PublicLayout>
    );
}
