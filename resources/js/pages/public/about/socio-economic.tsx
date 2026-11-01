import { Briefcase, Droplets, Leaf, Sprout } from 'lucide-react';
import { AboutSidebar } from '@/components/kiblawan/ui/about-sidebar';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';

const sectors = [
    {
        title: 'Agriculture',
        description:
            'Fertile uplands and a favorable climate support crops including corn, rice, coffee, and high-value vegetables.',
        icon: Leaf,
        accent: 'bg-green-soft text-forest',
    },
    {
        title: 'Trade & Industry',
        description:
            'Small businesses, local markets, and growing enterprises connect producers with neighboring communities.',
        icon: Briefcase,
        accent: 'bg-gold/15 text-forest',
    },
    {
        title: 'Fisheries',
        description:
            'Freshwater resources and community-based production contribute to local food supply and household livelihoods.',
        icon: Droplets,
        accent: 'bg-sky-100 text-sky-800',
    },
];

export default function AboutSocioEconomic() {
    return (
        <PublicLayout title="Socio-Economic Profile | About Kiblawan">
            <PageHeader
                title="About Kiblawan"
                breadcrumbSuffix="Socio-Economic"
                subtitle="Discover the history, people, livelihoods, and landscapes of our municipality."
            />
            <Section className="bg-cream">
                <Container>
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
                        <AboutSidebar currentSection="socio-economic" />
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
                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {sectors.map(
                                    ({
                                        title,
                                        description,
                                        icon: Icon,
                                        accent,
                                    }) => (
                                        <article
                                            key={title}
                                            className="group rounded-2xl border border-line-soft/80 bg-white/75 p-6 shadow-k-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-k-card"
                                        >
                                            <div
                                                className={`mb-5 flex size-12 items-center justify-center rounded-2xl ${accent}`}
                                            >
                                                <Icon
                                                    className="size-5"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <h3 className="font-display text-xl font-bold text-forest">
                                                {title}
                                            </h3>
                                            <p className="mt-2 leading-7 text-ink-muted">
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
                    </div>
                </Container>
            </Section>
        </PublicLayout>
    );
}
