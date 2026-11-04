import { Building2, Languages, MapPin, Users } from 'lucide-react';
import { AboutRevealRow } from '@/components/kiblawan/ui/about-reveal-row';
import { AboutReadNext } from '@/components/kiblawan/ui/about-read-next';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';

const stats = [
    { label: 'Population', value: '52,400', icon: Users },
    { label: 'Barangays', value: '30', icon: Building2 },
    { label: 'Land Area', value: '258 km²', icon: MapPin },
    { label: 'Languages', value: "Cebuano / B'laan", icon: Languages },
];

export default function AboutDemographic() {
    return (
        <PublicLayout title="Demographic Profile | About Kiblawan">
            <PageHeader
                title="Demographic Profile"
                subtitle="A snapshot of the people and communities that make Kiblawan vibrant."
            />
            <Section className="bg-cream py-16 md:py-24">
                <Container>
                    <div className="space-y-10 md:space-y-12">
                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                            {stats.map(({ label, value, icon: Icon }) => (
                                <article
                                    key={label}
                                    className="group rounded-[24px] border border-line bg-white p-6 shadow-k-card transition-all duration-300 hover:border-gold/40 hover:shadow-k-glow md:p-8"
                                >
                                    <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-green-soft text-green-dark transition-colors group-hover:bg-gold/20">
                                        <Icon
                                            className="size-6"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <p className="font-display text-3xl leading-tight font-bold text-primary md:text-4xl">
                                        {value}
                                    </p>
                                    <h2 className="mt-3 text-sm font-bold tracking-[0.12em] text-ink-muted uppercase">
                                        {label}
                                    </h2>
                                </article>
                            ))}
                        </div>

                        <AboutRevealRow
                            left={
                                <div className="relative min-h-80 overflow-hidden rounded-[24px] shadow-k-card lg:min-h-[34rem]">
                                    <img
                                        src="/images/about/kiblawan-community-photo.png.png"
                                        alt="Residents and community life in Kiblawan"
                                        loading="lazy"
                                        decoding="async"
                                        className="absolute inset-0 size-full object-cover transition-transform duration-700"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-primary/50 to-transparent" />
                                    <span className="absolute right-6 bottom-6 rounded-full border border-white/40 bg-primary/70 px-4 py-2 text-sm font-semibold text-white">
                                        Kiblawan, Davao del Sur
                                    </span>
                                </div>
                            }
                            right={
                                <div className="flex flex-col justify-center">
                                    <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-extrabold tracking-[0.12em] text-primary uppercase">
                                        <Users
                                            className="h-4 w-4 text-primary"
                                            aria-hidden="true"
                                        />
                                        People & community
                                    </span>
                                    <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight font-bold text-primary">
                                        A Community of Farmers, Miners, and
                                        Indigenous Tribes
                                    </h2>
                                    <p className="mt-4 text-lg leading-7 font-semibold text-primary">
                                        Where Bisaya, B&apos;laan, and Tagalog
                                        Cultures Blend
                                    </p>
                                    <p className="mt-6 text-base leading-8 text-ink-muted">
                                        Kiblawan&apos;s population consists of
                                        Cebuano (Bisaya) speakers, B&apos;laan
                                        indigenous communities, and
                                        Tagalog-speaking settlers. English and
                                        Tagalog are commonly used in education,
                                        government, and business, ensuring
                                        accessibility for investors and
                                        visitors.
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
