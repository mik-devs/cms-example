import { MapPin, Mountain, Waves, Wind } from 'lucide-react';
import { AboutReadNext } from '@/components/kiblawan/ui/about-read-next';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';

const facts = [
    {
        label: 'Total Land Area',
        description: 'Approximately 480 km² (demonstration figure).',
        icon: MapPin,
    },
    {
        label: 'Climate',
        description: 'Tropical conditions with warm temperatures year-round.',
        icon: Wind,
    },
    {
        label: 'Topography',
        description: 'A varied landscape of plains, hills, and upland areas.',
        icon: Mountain,
    },
    {
        label: 'Major Rivers',
        description: 'Local river systems support communities and agriculture.',
        icon: Waves,
    },
];

export default function AboutGeography() {
    return (
        <PublicLayout title="Geography | About Kiblawan">
            <PageHeader
                title="Physical / Geographical Profile"
                breadcrumbParent="About Kiblawan"
                breadcrumbParentHref="/about"
                breadcrumbSuffix="Geography"
                subtitle="Explore the landscapes, topography, and natural features of our town."
            />
            <Section className="bg-cream py-16 md:py-24">
                <Container>
                    <div>
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
                                    Kiblawan’s landscape brings together fertile
                                    lowlands, rolling terrain, and upland
                                    communities.
                                </p>
                            </header>
                            <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-2">
                                <article className="rounded-[24px] border border-line-soft bg-white/80 p-8 shadow-k-card backdrop-blur-[14px] md:p-12">
                                    <h3 className="font-display text-xl font-bold text-forest">
                                        At a glance
                                    </h3>
                                    <ul className="mt-5 divide-y divide-line-soft">
                                        {facts.map(
                                            ({
                                                label,
                                                description,
                                                icon: Icon,
                                            }) => (
                                                <li
                                                    key={label}
                                                    className="flex gap-4 py-5 first:pt-0 last:pb-0"
                                                >
                                                    <Icon
                                                        className="mt-0.5 size-5 shrink-0 text-gold"
                                                        aria-hidden="true"
                                                    />
                                                    <span>
                                                        <strong className="block font-display text-base font-bold text-forest">
                                                            {label}
                                                        </strong>
                                                        <span className="mt-1 block leading-6 text-ink-muted">
                                                            {description}
                                                        </span>
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </article>
                                <figure className="group relative m-0 min-h-[26rem] overflow-hidden rounded-[24px] border border-line-soft bg-forest/10 shadow-k-deep lg:min-h-full">
                                    <img
                                        src="/images/kib.png"
                                        alt="Illustrative map representing Kiblawan"
                                        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <figcaption className="absolute right-4 bottom-4 left-4 rounded-2xl border border-white/30 bg-forest/80 px-5 py-4 text-sm font-semibold text-white shadow-k-card backdrop-blur-md">
                                        Kiblawan, Davao del Sur
                                        <span className="mt-0.5 block text-xs font-normal text-white/75">
                                            Map image for illustration
                                        </span>
                                    </figcaption>
                                </figure>
                            </div>
                            <p className="mt-6 text-xs text-ink-muted">
                                Geographic facts are illustrative and should be
                                confirmed against official municipal sources.
                            </p>
                        </div>
                        <AboutReadNext currentSection="geography" />
                    </div>
                </Container>
            </Section>
        </PublicLayout>
    );
}
