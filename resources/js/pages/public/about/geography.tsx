import { BusFront, CloudSun, Mountain } from 'lucide-react';
import { AboutRevealRow } from '@/components/kiblawan/ui/about-reveal-row';
import { AboutReadNext } from '@/components/kiblawan/ui/about-read-next';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';

const travelCards = [
    {
        title: 'Climate & Environment',
        image: '/images/about/kiblawan-climate.png',
        imageAlt: 'Climate and landscape of Kiblawan',
        icon: CloudSun,
        description:
            'Kiblawan enjoys a tropical climate, with moderate-to-high rainfall that supports agriculture and livestock. The local government and environmental groups promote sustainable farming, responsible mining, and reforestation programs.',
    },
    {
        title: 'Transportation & Accessibility',
        image: '/images/about/Bus-icon.png',
        imageAlt: 'Bus transportation serving Kiblawan',
        icon: BusFront,
        description:
            'Kiblawan is approximately 2-3 hours from Davao City, accessible via buses, vans, and private vehicles traveling along national highways. Within the municipality, tricycles, habal-habal, and jeepneys serve as the main modes of transportation.',
    },
];

export default function AboutGeography() {
    return (
        <PublicLayout title="Geography | About Kiblawan">
            <PageHeader
                title="Physical / Geographical Profile"
                subtitle="Explore the landscapes, topography, and natural features of our town."
            />
            <Section className="bg-cream py-16 md:py-24">
                <Container>
                    <div className="space-y-14 md:space-y-20">
                        <AboutRevealRow
                            left={
                                <div className="flex flex-col justify-center">
                                    <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-extrabold tracking-[0.12em] text-forest uppercase">
                                        <Mountain
                                            className="size-4 text-gold"
                                            aria-hidden="true"
                                        />
                                        Place & landscape
                                    </span>
                                    <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight font-bold text-forest">
                                        A Land of Valleys, Mountains, and
                                        Agricultural Prosperity
                                    </h2>
                                    <p className="mt-4 text-lg leading-7 font-semibold text-gold">
                                        Spanning Over 258 Square Kilometers of
                                        Diverse Terrain
                                    </p>
                                    <p className="mt-6 text-base leading-8 text-ink-muted">
                                        Kiblawan covers 258 square kilometers,
                                        featuring fertile lowlands for farming,
                                        rugged hills for livestock, and
                                        mineral-rich mountains. The
                                        Digos-Malalag Mountain Range provides
                                        essential resources for agriculture,
                                        mining, and eco-tourism, making it a
                                        vital part of Davao del Sur&apos;s
                                        economy.
                                    </p>
                                </div>
                            }
                            right={
                                <div className="group relative min-h-80 overflow-hidden rounded-[24px] shadow-k-card md:min-h-[34rem]">
                                    <img
                                        src="/images/about/kiblawan-farm.png"
                                        alt="Agricultural landscape in Kiblawan"
                                        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-forest/45 via-transparent to-transparent" />
                                    <span className="absolute right-5 bottom-5 rounded-full border border-white/40 bg-forest/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                                        Kiblawan, Davao del Sur
                                    </span>
                                </div>
                            }
                        />

                        <section aria-labelledby="geography-travel">
                            <header className="mb-8 max-w-3xl">
                                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-extrabold tracking-[0.12em] text-forest uppercase">
                                    <CloudSun
                                        className="size-4 text-gold"
                                        aria-hidden="true"
                                    />
                                    Getting here & getting around
                                </span>
                                <h2
                                    id="geography-travel"
                                    className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight font-bold text-forest"
                                >
                                    Climate & Transportation
                                </h2>
                            </header>
                            <div className="grid gap-6 lg:grid-cols-2">
                                {travelCards.map(
                                    ({
                                        title,
                                        image,
                                        imageAlt,
                                        icon: Icon,
                                        description,
                                    }) => (
                                        <article
                                            key={title}
                                            className="group grid overflow-hidden rounded-[24px] border border-line-soft bg-white/80 shadow-k-card backdrop-blur-[14px] transition-all duration-300 hover:-translate-y-1 hover:shadow-k-glow sm:grid-cols-[minmax(12rem,0.8fr)_1.2fr]"
                                        >
                                            <div className="relative min-h-52 overflow-hidden bg-green-soft/50">
                                                <img
                                                    src={image}
                                                    alt={imageAlt}
                                                    loading="lazy"
                                                    className={`absolute inset-0 size-full transition-transform duration-700 group-hover:scale-105 ${
                                                        title.startsWith(
                                                            'Transportation',
                                                        )
                                                            ? 'object-contain p-8'
                                                            : 'object-cover'
                                                    }`}
                                                />
                                                <div className="absolute top-4 left-4 flex size-11 items-center justify-center rounded-full border border-white/70 bg-white/85 text-gold shadow-k-soft backdrop-blur-md">
                                                    <Icon
                                                        className="size-5"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                            </div>
                                            <div className="p-6 md:p-8">
                                                <h3 className="font-display text-xl font-bold text-forest">
                                                    {title}
                                                </h3>
                                                <p className="mt-3 leading-7 text-ink-muted">
                                                    {description}
                                                </p>
                                            </div>
                                        </article>
                                    ),
                                )}
                            </div>
                        </section>

                        <AboutReadNext currentSection="geography" />
                    </div>
                </Container>
            </Section>
        </PublicLayout>
    );
}
