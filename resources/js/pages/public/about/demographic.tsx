import { Building2, Languages, MapPin, Users } from 'lucide-react';
import { AboutRevealRow } from '@/components/kiblawan/ui/about-reveal-row';
import { AboutReadNext } from '@/components/kiblawan/ui/about-read-next';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';
import type { Page } from '@/types';

const statIcons = [Users, Building2, MapPin, Languages];

const fallbackStats = [
    { label: 'Population', value: '52,400', suffix: '' },
    { label: 'Barangays', value: '30', suffix: '' },
    { label: 'Land Area', value: '258', suffix: 'km²' },
    { label: 'Languages', value: "Cebuano / B'laan", suffix: '' },
];

const fallbackImage = '/images/about/kiblawan-community-photo.png.png';
const fallbackIntro =
    "Kiblawan's population consists of Cebuano (Bisaya) speakers, B'laan indigenous communities, and Tagalog-speaking settlers. English and Tagalog are commonly used in education, government, and business, ensuring accessibility for investors and visitors.";

type DemoStat = {
    label: string;
    value: string;
    suffix: string;
};

type DemoContent = {
    intro: string;
    stats: DemoStat[];
    image: string;
};

function parseDemoContent(content: string | null | undefined): DemoContent {
    if (!content) {
        return { intro: '', stats: [], image: '' };
    }

    try {
        const parsed: unknown = JSON.parse(content);

        if (typeof parsed !== 'object' || parsed === null) {
            return { intro: '', stats: [], image: '' };
        }

        const data = parsed as Record<string, unknown>;
        const stats = Array.isArray(data.stats)
            ? data.stats.map((stat) => {
                  const item =
                      typeof stat === 'object' && stat !== null
                          ? (stat as Record<string, unknown>)
                          : {};

                  return {
                      label: typeof item.label === 'string' ? item.label : '',
                      value: typeof item.value === 'string' ? item.value : '',
                      suffix: typeof item.suffix === 'string' ? item.suffix : '',
                  };
              })
            : [];

        return {
            intro: typeof data.intro === 'string' ? data.intro : '',
            stats,
            image: typeof data.image === 'string' ? data.image : '',
        };
    } catch {
        return { intro: '', stats: [], image: '' };
    }
}

export default function AboutDemographic({ page }: { page?: Page | null }) {
    const parsed = parseDemoContent(page?.content);
    const stats = parsed.stats.length > 0 ? parsed.stats : fallbackStats;
    const image = parsed.image || fallbackImage;
    const intro = parsed.intro || fallbackIntro;

    return (
        <PublicLayout title="Demographic Profile | About Kiblawan">
            <PageHeader
                title={page?.title || 'Demographic Profile'}
                subtitle="A snapshot of the people and communities that make Kiblawan vibrant."
            />
            <Section className="bg-cream py-16 md:py-24">
                <Container>
                    <div className="space-y-10 md:space-y-12">
                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                            {stats.map((stat, index) => {
                                const Icon = statIcons[index % statIcons.length];

                                return (
                                    <article
                                        key={`${stat.label}-${index}`}
                                        className="group rounded-[24px] border border-line-soft bg-white/80 p-6 shadow-k-card backdrop-blur-[14px] transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-k-glow md:p-8"
                                    >
                                        <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-green-soft text-green-700 transition-colors group-hover:bg-gold/20">
                                            <Icon
                                                className="size-6"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <p className="font-display text-3xl leading-tight font-bold text-forest md:text-4xl">
                                            {stat.suffix
                                                ? `${stat.value} ${stat.suffix}`
                                                : stat.value}
                                        </p>
                                        <h2 className="mt-3 text-sm font-bold tracking-[0.12em] text-ink-muted uppercase">
                                            {stat.label}
                                        </h2>
                                    </article>
                                );
                            })}
                        </div>

                        <AboutRevealRow
                            left={
                                <div className="relative min-h-80 overflow-hidden rounded-[24px] shadow-k-card lg:min-h-[34rem]">
                                    <img
                                        src={image}
                                        alt="Residents and community life in Kiblawan"
                                        className="absolute inset-0 size-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest/50 to-transparent" />
                                    <span className="absolute right-6 bottom-6 rounded-full border border-white/40 bg-forest/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                                        Kiblawan, Davao del Sur
                                    </span>
                                </div>
                            }
                            right={
                                <div className="flex flex-col justify-center">
                                    <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-extrabold tracking-[0.12em] text-forest uppercase">
                                        <Users
                                            className="w-4 h-4 text-gold"
                                            aria-hidden="true"
                                        />
                                        People & community
                                    </span>
                                    <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight font-bold text-forest">
                                        A Community of Farmers, Miners, and
                                        Indigenous Tribes
                                    </h2>
                                    <p className="mt-4 text-lg leading-7 font-semibold text-gold">
                                        Where Bisaya, B&apos;laan, and Tagalog
                                        Cultures Blend
                                    </p>
                                    <p className="mt-6 text-base leading-8 text-ink-muted">
                                        {intro}
                                    </p>
                                </div>
                            }
                        />
                        <AboutReadNext currentSection="demographic" />
                    </div>
                </Container>
            </Section>
        </PublicLayout>
    );
}
