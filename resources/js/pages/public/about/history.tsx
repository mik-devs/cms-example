import { CalendarDays } from 'lucide-react';
import { AboutReadNext } from '@/components/kiblawan/ui/about-read-next';
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
                title="History of Kiblawan"
                breadcrumbParent="About Kiblawan"
                breadcrumbParentHref="/about"
                breadcrumbSuffix="History"
                subtitle="Discover the rich heritage and timeline of our municipality."
            />
            <Section className="bg-cream py-16 md:py-24">
                <Container>
                    <div>
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
                            <div className="relative mt-10 space-y-6 before:absolute before:top-4 before:bottom-4 before:left-[0.6875rem] before:w-0.5 before:bg-gold/30 sm:before:left-1/2">
                                {milestones.map((milestone, index) => (
                                    <article
                                        key={milestone.year}
                                        className="relative grid gap-4 pl-10 sm:grid-cols-2 sm:items-center sm:gap-12 sm:pl-0"
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="absolute top-6 left-2 size-3 rounded-full border-[3px] border-white bg-gold shadow-[0_0_0_3px_rgba(201,162,39,0.2)] sm:left-1/2 sm:-translate-x-1/2"
                                        />
                                        <div
                                            className={`rounded-[24px] border border-line-soft bg-white/80 p-6 shadow-k-card backdrop-blur-[14px] transition-all duration-300 hover:-translate-y-1 hover:shadow-k-glow sm:p-7 ${
                                                index % 2 === 0
                                                    ? 'sm:col-start-1 sm:text-right'
                                                    : 'sm:col-start-2'
                                            }`}
                                        >
                                            <span className="inline-flex rounded-full bg-gold px-4 py-1.5 font-display text-base font-bold text-forest shadow-k-soft">
                                                {milestone.year}
                                            </span>
                                            <h3 className="mt-4 font-display text-xl font-bold text-forest">
                                                {milestone.title}
                                            </h3>
                                            <p className="mt-2 leading-7 text-ink-muted">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            <p className="mt-8 rounded-xl border border-gold/20 bg-gold/10 px-4 py-3 text-xs leading-5 text-ink-muted">
                                Historical highlights are illustrative demo
                                content pending verification against official
                                municipal records.
                            </p>
                        </div>
                        <AboutReadNext currentSection="history" />
                    </div>
                </Container>
            </Section>
        </PublicLayout>
    );
}
