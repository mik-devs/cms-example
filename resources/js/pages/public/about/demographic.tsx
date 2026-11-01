import {
    Building2,
    ChartNoAxesColumnIncreasing,
    MapPin,
    Mountain,
    Users,
} from 'lucide-react';
import { AboutSidebar } from '@/components/kiblawan/ui/about-sidebar';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';

const stats = [
    { label: 'Population', value: '50,000+', icon: Users },
    { label: 'Households', value: '12,000+', icon: Building2 },
    { label: 'Land Area', value: '480 km²', icon: MapPin },
    { label: 'Barangays', value: '30', icon: Mountain },
];

const ageGroups = [
    { label: 'Children · 0–14', value: 32 },
    { label: 'Working age · 15–64', value: 61 },
    { label: 'Seniors · 65+', value: 7 },
];

export default function AboutDemographic() {
    return (
        <PublicLayout title="Demographic Profile | About Kiblawan">
            <PageHeader
                title="About Kiblawan"
                breadcrumbSuffix="Demographic"
                subtitle="Discover the history, people, livelihoods, and landscapes of our municipality."
            />
            <Section className="bg-cream">
                <Container>
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
                        <AboutSidebar currentSection="demographic" />
                        <div className="rounded-[24px] border border-line-soft bg-white/80 p-8 shadow-k-card backdrop-blur-[14px] md:p-12">
                            <header>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-extrabold tracking-[0.12em] text-forest uppercase">
                                    <Users className="size-3.5 text-gold" />
                                    People & communities
                                </div>
                                <h2 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-tight font-bold text-forest">
                                    A growing, diverse municipality
                                </h2>
                                <p className="mt-3 max-w-2xl leading-7 text-ink-muted">
                                    A snapshot of the people and communities
                                    that make Kiblawan vibrant. Figures below
                                    are demonstration estimates.
                                </p>
                            </header>
                            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {stats.map(({ label, value, icon: Icon }) => (
                                    <article
                                        key={label}
                                        className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-k-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-k-card sm:p-5"
                                    >
                                        <div className="mb-4 flex size-9 items-center justify-center rounded-xl bg-gold/15 text-forest">
                                            <Icon className="size-4" aria-hidden="true" />
                                        </div>
                                        <p className="font-display text-xl font-bold text-forest sm:text-2xl">
                                            {value}
                                        </p>
                                        <p className="mt-1 text-xs font-semibold text-ink-muted sm:text-sm">
                                            {label}
                                        </p>
                                    </article>
                                ))}
                            </div>
                            <article className="mt-6 rounded-2xl border border-line-soft/80 bg-white/75 p-5 shadow-k-soft backdrop-blur-xl sm:p-7">
                                <h3 className="flex items-center gap-2 font-display text-xl font-bold text-forest">
                                    <ChartNoAxesColumnIncreasing className="size-5 text-gold" />
                                    Population by age group
                                </h3>
                                <p className="mt-1 text-sm text-ink-muted">
                                    Illustrative distribution for design preview
                                </p>
                                <div className="mt-6 space-y-5">
                                    {ageGroups.map((group) => (
                                        <div key={group.label}>
                                            <div className="mb-2 flex justify-between gap-4 text-sm">
                                                <span className="font-semibold text-forest">
                                                    {group.label}
                                                </span>
                                                <span className="font-bold text-ink-muted">
                                                    {group.value}%
                                                </span>
                                            </div>
                                            <div
                                                role="progressbar"
                                                aria-label={group.label}
                                                aria-valuenow={group.value}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                className="h-2.5 overflow-hidden rounded-full bg-green-soft"
                                            >
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-forest to-gold"
                                                    style={{
                                                        width: `${group.value}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </article>
                            <p className="mt-6 text-xs text-ink-muted">
                                Demographic figures are illustrative and will
                                be replaced with verified municipal data.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>
        </PublicLayout>
    );
}
