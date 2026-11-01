import { MapPin, Mountain, Waves, Wind } from 'lucide-react';
import { AboutSidebar } from '@/components/kiblawan/ui/about-sidebar';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';

const facts = [
    {
        label: 'Location',
        description: 'A landlocked municipality in Davao del Sur, Mindanao.',
        icon: MapPin,
    },
    {
        label: 'Climate',
        description:
            'A tropical climate with seasonal rainfall and warm temperatures.',
        icon: Wind,
    },
    {
        label: 'Topography',
        description:
            'Rolling plains rise into foothills near the Mount Apo range.',
        icon: Mountain,
    },
    {
        label: 'Natural character',
        description:
            'Agricultural valleys, upland communities, and diverse landscapes.',
        icon: Waves,
    },
];

export default function AboutGeography() {
    return (
        <PublicLayout title="Geography | About Kiblawan">
            <PageHeader
                title="About Kiblawan"
                breadcrumbSuffix="Geography"
                subtitle="Discover the history, people, livelihoods, and landscapes of our municipality."
            />
            <Section className="bg-cream">
                <Container>
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
                        <AboutSidebar currentSection="geography" />
                        <div className="rounded-[24px] border border-line-soft bg-white/80 p-8 shadow-k-card backdrop-blur-[14px] md:p-12">
                            <header>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-extrabold tracking-[0.12em] text-forest uppercase">
                                    <Mountain className="size-3.5 text-gold" />
                                    Place & landscape
                                </div>
                                <h2 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-tight font-bold text-forest">
                                    At the foothills of Mount Apo
                                </h2>
                                <p className="mt-3 max-w-2xl leading-7 text-ink-muted">
                                    Kiblawan’s landscape brings together
                                    fertile lowlands, rolling terrain, and
                                    upland communities.
                                </p>
                            </header>
                            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                                <article className="rounded-2xl border border-line-soft/80 bg-white/75 p-6 shadow-k-soft backdrop-blur-xl">
                                    <h3 className="font-display text-xl font-bold text-forest">
                                        At a glance
                                    </h3>
                                    <ul className="mt-5 space-y-5">
                                        {facts.map(
                                            ({
                                                label,
                                                description,
                                                icon: Icon,
                                            }) => (
                                                <li
                                                    key={label}
                                                    className="flex gap-3"
                                                >
                                                    <Icon
                                                        className="mt-1 size-4 shrink-0 text-gold"
                                                        aria-hidden="true"
                                                    />
                                                    <span>
                                                        <strong className="block text-sm text-forest">
                                                            {label}
                                                        </strong>
                                                        <span className="mt-1 block text-sm leading-6 text-ink-muted">
                                                            {description}
                                                        </span>
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </article>
                                <figure className="relative m-0 min-h-72 overflow-hidden rounded-2xl border border-white/80 bg-forest/10 shadow-k-card">
                                    <img
                                        src="/images/kib.png"
                                        alt="Illustrative map representing Kiblawan"
                                        className="absolute inset-0 size-full object-cover"
                                    />
                                    <figcaption className="absolute right-3 bottom-3 left-3 rounded-xl border border-white/30 bg-forest/80 px-4 py-3 text-sm font-semibold text-white shadow-k-card backdrop-blur-md">
                                        Kiblawan, Davao del Sur
                                        <span className="mt-0.5 block text-xs font-normal text-white/75">
                                            Map image for illustration
                                        </span>
                                    </figcaption>
                                </figure>
                            </div>
                            <p className="mt-6 text-xs text-ink-muted">
                                Geographic facts are illustrative and should
                                be confirmed against official municipal sources.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>
        </PublicLayout>
    );
}
