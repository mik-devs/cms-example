import { Globe, Palette } from 'lucide-react';
import { AboutReadNext } from '@/components/kiblawan/ui/about-read-next';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';
import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/use-in-view';
import type { Page } from '@/types';

type ImagePosition = 'left' | 'right';

type HistoryBlock = {
    image: string;
    kicker: string;
    title: string;
    subtitle: string;
    body: string;
    imagePosition: ImagePosition;
};

const fallbackBlocks: HistoryBlock[] = [
    {
        kicker: 'Overview',
        image: '/images/about/kiblawan-thriving-municiplality.png',
        title: 'From Tribal Lands to a Thriving Municipality',
        subtitle: 'Honoring Indigenous Traditions While Moving Toward Progress',
        body: "Historically, Kiblawan was inhabited by the B'laan indigenous tribe, who lived off the land through hunting, farming, and trading.",
        imagePosition: 'left',
    },
    {
        kicker: 'History',
        image: '/images/about/kiblawan-agri.png',
        title: 'A Municipality Shaped by Change',
        subtitle: 'Agriculture, Mining, and a Growing Community',
        body: 'With the arrival of Christian settlers, the town expanded its agricultural and mining industries. Today, Kiblawan remains a culturally rich and economically growing municipality, balancing its indigenous heritage with modern development.',
        imagePosition: 'left',
    },
    {
        kicker: 'Culture',
        image: '/images/about/kiblawan-tradition.png',
        title: "A Stronghold of B'laan Indigenous Traditions",
        subtitle: 'Preserving Ancestral Ways While Embracing Development',
        body: "Kiblawan's culture is deeply influenced by its B'laan roots, with many locals continuing to practice traditional weaving, beadwork, and music. Festivals and community gatherings highlight tribal dances, rituals, and storytelling, showcasing the rich cultural heritage of the town.",
        imagePosition: 'left',
    },
];

const festivals = [
    {
        image: '/images/about/araw-kiblawan.png',
        title: 'Araw ng Kiblawan',
        description:
            "The municipality's foundation day, featuring trade fairs, cultural performances, and sports competitions.",
    },
    {
        image: '/images/about/kaduwaan-festival.png',
        title: 'Kaduwaan Festival',
        description:
            "A vibrant B'laan festival showcasing tribal traditions, music, and dance.",
    },
    {
        image: '/images/about/Kiblawan---Harvest-Festival.png',
        title: 'Harvest Festival',
        description:
            'A thanksgiving celebration for farmers and their agricultural contributions.',
    },
];

function isStoredBlock(value: unknown): value is Record<string, string> {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const block = value as Record<string, unknown>;

    return ['image', 'kicker', 'title', 'subtitle', 'body'].every((key) => {
        return typeof block[key] === 'string';
    });
}

function toHistoryBlock(value: unknown): HistoryBlock | null {
    if (!isStoredBlock(value)) {
        return null;
    }

    return {
        image: value.image,
        kicker: value.kicker,
        title: value.title,
        subtitle: value.subtitle,
        body: value.body,
        imagePosition: value.image_position === 'right' ? 'right' : 'left',
    };
}

function parseBlocks(content: string | null | undefined): HistoryBlock[] {
    if (!content) {
        return [];
    }

    try {
        const parsed: unknown = JSON.parse(content);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed
            .map(toHistoryBlock)
            .filter((block): block is HistoryBlock => block !== null);
    } catch {
        return [];
    }
}

function HistoryBlock({
    block,
    index,
}: {
    block: HistoryBlock;
    index: number;
}) {
    const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
    const isImageLeft = block.imagePosition === 'left';

    return (
        <div
            ref={ref}
            className="mb-12 rounded-[24px] border border-line-soft bg-white/80 p-8 shadow-k-card backdrop-blur-[14px] md:p-12"
        >
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div
                    className={cn(
                        'relative transition-all duration-700 ease-out',
                        inView
                            ? 'translate-x-0 opacity-100'
                            : isImageLeft
                              ? '-translate-x-12 opacity-0'
                              : 'translate-x-12 opacity-0',
                        isImageLeft ? 'lg:order-1' : 'lg:order-2',
                    )}
                >
                    <span
                        aria-hidden="true"
                        className="absolute -top-5 -right-5 z-0 block h-24 w-24 rounded-[20px] bg-green-soft opacity-80"
                        style={dotGridStyle}
                    />
                    <span
                        aria-hidden="true"
                        className="absolute -bottom-5 -left-5 z-0 block h-24 w-24 rounded-[20px] bg-green-soft opacity-80"
                        style={dotGridStyle}
                    />
                    <img
                        src={block.image}
                        alt={block.title}
                        className="relative z-10 aspect-[4/3] w-full rounded-[20px] object-cover shadow-lg"
                    />
                </div>

                <div
                    className={cn(
                        'transition-all duration-700 ease-out delay-150',
                        inView
                            ? 'translate-x-0 opacity-100'
                            : isImageLeft
                              ? 'translate-x-12 opacity-0'
                              : '-translate-x-12 opacity-0',
                        isImageLeft ? 'lg:order-2' : 'lg:order-1',
                    )}
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-line-soft bg-cream px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase shadow-sm">
                        <Globe className="h-4 w-4" /> {block.kicker}
                    </span>
                    <h2 className="mb-4 font-display text-3xl leading-tight font-bold text-primary md:text-4xl">
                        {block.title}
                    </h2>
                    <h3 className="text-maroon mb-4 text-lg font-semibold">
                        {block.subtitle}
                    </h3>
                    <p className="text-lg leading-relaxed text-ink-muted">
                        {block.body}
                    </p>
                </div>
            </div>
        </div>
    );
}

const dotGridStyle = {
    backgroundImage: 'radial-gradient(var(--color-green) 2px, transparent 2px)',
    backgroundSize: '14px 14px',
};

export default function AboutHistory({ page }: { page?: Page | null }) {
    const editableBlocks = parseBlocks(page?.content);
    const blocks = editableBlocks.length > 0 ? editableBlocks : fallbackBlocks;

    return (
        <PublicLayout title="History | About Kiblawan">
            <PageHeader
                title="History of Kiblawan"
                subtitle="Discover the rich heritage and timeline of our municipality."
            />
            <Section className="bg-cream py-16 md:py-24">
                <Container>
                    <div className="[&>*:last-child]:mb-0">
                        {blocks.map((block, index) => (
                            <HistoryBlock key={index} block={block} index={index} />
                        ))}
                    </div>

                    <div className="mt-20 space-y-20 md:mt-28 md:space-y-28">
                        <section aria-labelledby="kiblawan-festivals">
                            <header className="mb-8 flex flex-wrap items-end justify-between gap-5">
                                <div>
                                    <span className="text-forest mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-extrabold tracking-[0.12em] uppercase">
                                        <Palette
                                            className="h-4 w-4 text-gold"
                                            aria-hidden="true"
                                        />
                                        Culture & celebration
                                    </span>
                                    <h2
                                        id="kiblawan-festivals"
                                        className="text-forest font-display text-3xl font-bold md:text-4xl"
                                    >
                                        Festivals of Kiblawan
                                    </h2>
                                </div>
                            </header>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                {festivals.map((festival) => (
                                    <article
                                        key={festival.title}
                                        className="group overflow-hidden rounded-[24px] border border-line-soft bg-white/80 shadow-k-card backdrop-blur-[14px] transition-all duration-300 hover:-translate-y-2 hover:shadow-k-glow"
                                    >
                                        <div className="overflow-hidden">
                                            <img
                                                src={festival.image}
                                                alt={festival.title}
                                                loading="lazy"
                                                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-6 md:p-8">
                                            <h3 className="text-forest font-display text-xl font-bold">
                                                {festival.title}
                                            </h3>
                                            <p className="mt-3 leading-relaxed text-ink-muted">
                                                {festival.description}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <AboutReadNext currentSection="history" />
                    </div>
                </Container>
            </Section>
        </PublicLayout>
    );
}
