import { ArrowUpRight, Compass, Sprout } from 'lucide-react';
import { DynamicIcon } from '@/components/kiblawan/ui/dynamic-icon';
import { AboutReadNext } from '@/components/kiblawan/ui/about-read-next';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';
import type { Page } from '@/types';

const fallbackEconomy = [
    {
        title: 'Rice, Corn, & Coconut Farming',
        image: '/images/about/agriculture.png',
        description:
            'Kiblawan is a major producer of staple crops, supplying local and regional markets.',
    },
    {
        title: 'Banana & Coffee Plantations',
        image: '/images/about/coffee-plantation.png',
        description:
            "The town cultivates high-value crops, supporting Mindanao's agribusiness and export industries.",
    },
    {
        title: 'Mining & Mineral Extraction',
        image: '/images/about/mineral-extraction.png',
        description:
            'The mountains of Kiblawan contain gold, copper, and other mineral deposits, attracting small-scale and industrial mining operations.',
    },
    {
        title: 'Livestock & Poultry Farming',
        image: '/images/about/poultry-farming.png',
        description:
            "Many residents raise cattle, pigs, and poultry, contributing to Mindanao's meat production industry.",
    },
];

const fallbackTourism = [
    {
        title: 'Digos-Malalag Mountain Ranges',
        image: '/images/about/mountain-ranges.jpg',
        description:
            'A scenic area perfect for hiking, camping, and nature photography.',
    },
    {
        title: "B'laan Cultural Villages",
        image: '/images/about/cultural-villages.jpg',
        description:
            "Experience the rich traditions, crafts, and tribal rituals of the B'laan people.",
    },
    {
        title: 'Kiblawan Hot Springs',
        image: '/images/about/kiblawan-hotspring.png',
        description:
            'Discover hidden waterfalls and soothing natural hot springs tucked away in the mountains.',
    },
];

type Sector = {
    icon: string;
    title: string;
    description: string;
    image?: string;
};

type SocioContent = {
    sectors: Sector[];
};

function parseSocioContent(content: string | null | undefined): SocioContent {
    if (!content) {
        return { sectors: [] };
    }

    try {
        const parsed: unknown = JSON.parse(content);

        if (typeof parsed !== 'object' || parsed === null) {
            return { sectors: [] };
        }

        const data = parsed as Record<string, unknown>;
        const sectors = Array.isArray(data.sectors) ? data.sectors : [];

        return {
            sectors: sectors.map((sector) => {
                const item =
                    typeof sector === 'object' && sector !== null
                        ? (sector as Record<string, unknown>)
                        : {};

                return {
                    icon: typeof item.icon === 'string' ? item.icon : '',
                    title: typeof item.title === 'string' ? item.title : '',
                    description:
                        typeof item.description === 'string'
                            ? item.description
                            : typeof item.body === 'string'
                              ? item.body
                              : '',
                    image: typeof item.image === 'string' ? item.image : '',
                };
            }),
        };
    } catch {
        return { sectors: [] };
    }
}

export default function AboutSocioEconomic({ page }: { page?: Page | null }) {
    const parsed = parseSocioContent(page?.content);
    const useSectors = parsed.sectors.length > 0;

    return (
        <PublicLayout title="Socio-Economic Profile | About Kiblawan">
            <PageHeader
                title={page?.title || 'Socio-Economic Profile'}
                subtitle="Insights into the livelihoods, industries, and economy of Kiblawan."
            />
            <Section className="bg-cream py-16 md:py-24">
                <Container>
                    <div className="space-y-16 md:space-y-20">
                        {useSectors ? (
                            <section aria-labelledby="sectors">
                                <SectionHeading
                                    id="sectors"
                                    eyebrow="Sectors"
                                    title="Livelihoods and industries"
                                    description="Key sectors that support Kiblawan’s economy and community life."
                                    icon={<Sprout className="w-4 h-4 text-gold" />}
                                />
                                <div className="grid gap-8 md:grid-cols-2">
                                    {parsed.sectors.map((item, index) => (
                                        <SectorCard key={`${item.title}-${index}`} item={item} />
                                    ))}
                                </div>
                            </section>
                        ) : (
                            <>
                                <section aria-labelledby="local-economy">
                                    <SectionHeading
                                        id="local-economy"
                                        eyebrow="Local economy"
                                        title="Livelihoods rooted in land and enterprise"
                                        description="Agriculture, natural resources, and local producers support Kiblawan’s economy and connect the municipality with markets across Mindanao."
                                        icon={<Sprout className="w-4 h-4 text-gold" />}
                                    />
                                    <div className="grid gap-8 md:grid-cols-2">
                                        {fallbackEconomy.map((item) => (
                                            <ImageCard key={item.title} item={item} />
                                        ))}
                                    </div>
                                </section>

                                <section aria-labelledby="kiblawan-tourism">
                                    <SectionHeading
                                        id="kiblawan-tourism"
                                        eyebrow="Places & experiences"
                                        title="Discover Kiblawan"
                                        description="Mountain scenery, cultural heritage, and natural attractions create memorable ways to experience the municipality."
                                        icon={<Compass className="w-4 h-4 text-gold" />}
                                    />
                                    <div className="grid gap-8 md:grid-cols-3">
                                        {fallbackTourism.map((item) => (
                                            <ImageCard key={item.title} item={item} />
                                        ))}
                                    </div>
                                </section>
                            </>
                        )}

                        <AboutReadNext currentSection="socio-economic" />
                    </div>
                </Container>
            </Section>
        </PublicLayout>
    );
}

function SectionHeading({
    id,
    eyebrow,
    title,
    description,
    icon,
}: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}) {
    return (
        <header className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-extrabold tracking-[0.12em] text-forest uppercase">
                    {icon}
                    {eyebrow}
                </span>
                <h2
                    id={id}
                    className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight font-bold text-forest"
                >
                    {title}
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-ink-muted">
                    {description}
                </p>
            </div>
            <ArrowUpRight
                className="hidden size-8 shrink-0 text-gold md:block"
                aria-hidden="true"
            />
        </header>
    );
}

function ImageCard({
    item,
}: {
    item: { title: string; image: string; description: string };
}) {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-line-soft bg-white/80 shadow-k-card backdrop-blur-[14px] transition-all duration-300 hover:-translate-y-1 hover:shadow-k-glow">
            <div className="overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-8">
                <h3 className="font-display text-xl leading-snug font-bold text-forest">
                    {item.title}
                </h3>
                <p className="mt-3 flex-1 leading-7 text-ink-muted">
                    {item.description}
                </p>
            </div>
        </article>
    );
}

function SectorCard({ item }: { item: Sector }) {
    if (item.image) {
        return <ImageCard item={{ title: item.title, image: item.image, description: item.description }} />;
    }

    return (
        <article className="group flex h-full flex-col rounded-[24px] border border-line-soft bg-white/80 p-6 shadow-k-card backdrop-blur-[14px] transition-all duration-300 hover:-translate-y-1 hover:shadow-k-glow md:p-8">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-green-soft text-green-700 transition-colors group-hover:bg-gold/20">
                <DynamicIcon name={item.icon} className="size-6" />
            </div>
            <h3 className="font-display text-xl leading-snug font-bold text-forest">
                {item.title}
            </h3>
            <p className="mt-3 flex-1 leading-7 text-ink-muted">
                {item.description}
            </p>
        </article>
    );
}
