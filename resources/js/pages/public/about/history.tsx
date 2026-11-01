import { CalendarDays } from 'lucide-react';
import { AboutSidebar } from '@/components/kiblawan/ui/about-sidebar';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';

const milestones = [
    {
        year: '1939',
        title: 'Communities Take Root',
        description:
            'Families and communities cultivated the land and built a shared identity in the foothills of Mount Apo.',
    },
    {
        year: '1959',
        title: 'A Municipality Takes Shape',
        description:
            'Kiblawan was established as a municipality, bringing together communities across the region.',
    },
    {
        year: 'Today',
        title: 'A Connected, Forward-Looking Municipality',
        description:
            'Kiblawan continues to invest in public services, local enterprise, and opportunities for its people.',
    },
];

export default function AboutHistory() {
    return (
        <PublicLayout title="History | About Kiblawan">
            <PageHeader
                title="About Kiblawan"
                breadcrumbSuffix="History"
                subtitle="Discover the history, people, livelihoods, and landscapes of our municipality."
            />
            <Section className="bg-cream">
                <Container>
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
                        <AboutSidebar currentSection="history" />
                        <div className="rounded-[24px] border border-line-soft bg-white/80 p-8 shadow-k-card backdrop-blur-[14px] md:p-12">
                            <header>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-extrabold tracking-[0.12em] text-forest uppercase">
                                    <CalendarDays className="size-3.5 text-gold" />
                                    Our story
                                </div>
                                <h2 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-tight font-bold text-forest">
                                    A heritage shaped by community
                                </h2>
                                <p className="mt-3 max-w-2xl leading-7 text-ink-muted">
                                    From its early beginnings to the present
                                    day, Kiblawan’s story is one of resilience,
                                    shared purpose, and growth.
                                </p>
                            </header>
                            <div className="mt-10 border-l-2 border-line-soft pl-7 sm:pl-9">
                                {milestones.map((milestone) => (
                                    <article
                                        key={milestone.year}
                                        className="relative pb-10 last:pb-0"
                                    >
                                        <span className="absolute top-1.5 -left-[2.24rem] size-3 rounded-full border-[3px] border-white bg-gold shadow-[0_0_0_3px_rgba(201,162,39,0.2)] sm:-left-[2.74rem]" />
                                        <p className="font-display text-lg font-bold text-gold">
                                            {milestone.year}
                                        </p>
                                        <h3 className="mt-1 font-display text-xl font-bold text-forest">
                                            {milestone.title}
                                        </h3>
                                        <p className="mt-2 leading-7 text-ink-muted">
                                            {milestone.description}
                                        </p>
                                    </article>
                                ))}
                            </div>
                            <p className="mt-8 rounded-xl border border-gold/20 bg-gold/10 px-4 py-3 text-xs leading-5 text-ink-muted">
                                Historical highlights are illustrative demo
                                content pending verification against official
                                municipal records.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>
        </PublicLayout>
    );
}
