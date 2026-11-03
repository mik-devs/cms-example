import { Globe, History, Palette } from 'lucide-react';
import { AboutRevealRow } from '@/components/kiblawan/ui/about-reveal-row';
import { AboutReadNext } from '@/components/kiblawan/ui/about-read-next';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';

const stories = [
    {
        eyebrow: 'Overview',
        image: '/images/about/kiblawan-thriving-municiplality.png',
        imageAlt: 'Kiblawan, a thriving municipality',
        title: 'From Tribal Lands to a Thriving Municipality',
        subtitle: 'Honoring Indigenous Traditions While Moving Toward Progress',
        body: "Historically, Kiblawan was inhabited by the B'laan indigenous tribe, who lived off the land through hunting, farming, and trading.",
        icon: Globe,
    },
    {
        eyebrow: 'History',
        image: '/images/about/kiblawan-agri.png',
        imageAlt: 'Agriculture and community life in Kiblawan',
        title: 'A Municipality Shaped by Change',
        subtitle: 'Agriculture, Mining, and a Growing Community',
        body: 'With the arrival of Christian settlers, the town expanded its agricultural and mining industries. Today, Kiblawan remains a culturally rich and economically growing municipality, balancing its indigenous heritage with modern development.',
        icon: History,
    },
    {
        eyebrow: 'Culture',
        image: '/images/about/kiblawan-tradition.png',
        imageAlt: "B'laan traditions and culture in Kiblawan",
        title: "A Stronghold of B'laan Indigenous Traditions",
        subtitle: 'Preserving Ancestral Ways While Embracing Development',
        body: "Kiblawan's culture is deeply influenced by its B'laan roots, with many locals continuing to practice traditional weaving, beadwork, and music. Festivals and community gatherings highlight tribal dances, rituals, and storytelling, showcasing the rich cultural heritage of the town.",
        icon: Palette,
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

export default function AboutHistory() {
    return (
        <PublicLayout title="History | About Kiblawan">
            <PageHeader
                title="History of Kiblawan"
                subtitle="Discover the rich heritage and timeline of our municipality."
            />
            <Section className="bg-cream py-16 md:py-24">
                <Container>
                    <div className="space-y-20 md:space-y-28">
                        {stories.map((story, index) => {
                            const Icon = story.icon;

                            return (
                                <AboutRevealRow
                                    key={story.eyebrow}
                                    reverse={index % 2 === 1}
                                    left={
                                        <img
                                            src={story.image}
                                            alt={story.imageAlt}
                                            loading="lazy"
                                            className="aspect-[4/3] w-full rounded-[24px] object-cover shadow-k-card transition-transform duration-700"
                                        />
                                    }
                                    right={
                                        <>
                                            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-extrabold tracking-[0.12em] text-primary uppercase">
                                                <Icon
                                                    className="h-4 w-4 text-primary"
                                                    aria-hidden="true"
                                                />
                                                {story.eyebrow}
                                            </span>
                                            <h2 className="font-display text-3xl leading-tight font-bold text-primary">
                                                {story.title}
                                            </h2>
                                            <p className="mt-4 text-lg leading-relaxed font-semibold text-primary">
                                                {story.subtitle}
                                            </p>
                                            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                                                {story.body}
                                            </p>
                                        </>
                                    }
                                />
                            );
                        })}

                        <section aria-labelledby="kiblawan-festivals">
                            <header className="mb-8 flex flex-wrap items-end justify-between gap-5">
                                <div>
                                    <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-extrabold tracking-[0.12em] text-primary uppercase">
                                        <Palette
                                            className="h-4 w-4 text-primary"
                                            aria-hidden="true"
                                        />
                                        Culture & celebration
                                    </span>
                                    <h2
                                        id="kiblawan-festivals"
                                        className="font-display text-3xl font-bold text-primary md:text-4xl"
                                    >
                                        Festivals of Kiblawan
                                    </h2>
                                </div>
                            </header>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                {festivals.map((festival) => (
                                    <article
                                        key={festival.title}
                                        className="group overflow-hidden rounded-[24px] border border-line bg-white shadow-k-card transition-all duration-300 hover:shadow-k-glow"
                                    >
                                        <div className="overflow-hidden">
                                            <img
                                                src={festival.image}
                                                alt={festival.title}
                                                loading="lazy"
                                                className="aspect-square w-full object-cover transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="p-6 md:p-8">
                                            <h3 className="font-display text-xl font-bold text-primary">
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
