import { Link } from '@inertiajs/react';
import {
    ArrowLeft,
    MapPin,
    Phone,
    UserRound,
    Users,
} from 'lucide-react';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';
import type { Barangay } from '@/types';

export default function BarangayShow({ barangay }: { barangay: Barangay }) {
    const hasCoordinates =
        barangay.latitude !== null && barangay.longitude !== null;

    const mapSrc = hasCoordinates
        ? `https://maps.google.com/maps?q=${barangay.latitude},${barangay.longitude}&z=15&output=embed`
        : 'https://maps.google.com/maps?q=Kiblawan,+Davao+del+Sur&z=13&output=embed';

    const stats = [
        {
            label: 'Population',
            value: barangay.population?.toLocaleString() ?? 'N/A',
            icon: Users,
        },
        {
            label: 'Barangay Captain',
            value: barangay.captain ?? 'To be updated',
            icon: UserRound,
        },
        {
            label: 'Contact',
            value: barangay.contact ?? 'N/A',
            icon: Phone,
        },
    ];

    return (
        <PublicLayout title={`${barangay.name} | Barangay Profile`}>
            <PageHeader title={barangay.name} subtitle="Barangay Profile" />
            <Section className="bg-cream py-16 md:py-24">
                <Container>
                    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.6fr_1fr]">
                        <div>
                            <div className="relative min-h-72 overflow-hidden rounded-[24px] shadow-k-card md:min-h-96">
                                <img
                                    src="/images/kib.png"
                                    alt={`Barangay ${barangay.name}`}
                                    className="absolute inset-0 size-full object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest/60 to-transparent" />
                                <span className="absolute right-6 bottom-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-forest/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                                    <MapPin
                                        className="size-4 text-gold"
                                        aria-hidden="true"
                                    />
                                    Kiblawan, Davao del Sur
                                </span>
                            </div>

                            <div className="mt-10">
                                <span className="mb-5 inline-flex w-fit items-center rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-extrabold tracking-[0.12em] text-forest uppercase">
                                    Community profile
                                </span>
                                <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight font-bold text-forest">
                                    About {barangay.name}
                                </h2>
                                <p className="mt-6 text-base leading-8 text-ink-muted">
                                    Welcome to Barangay {barangay.name}. This
                                    page contains the official profile,
                                    demographic data, and updates for this
                                    barangay.
                                </p>
                            </div>
                        </div>

                        <aside className="space-y-6">
                            <div className="rounded-[24px] bg-white/80 p-6 shadow-k-card backdrop-blur-md md:p-8">
                                <h2 className="font-display text-xl font-bold text-forest">
                                    Barangay at a Glance
                                </h2>
                                <div className="mt-6 space-y-4">
                                    {stats.map(({ label, value, icon: Icon }) => (
                                        <div
                                            key={label}
                                            className="flex items-start gap-4 rounded-[16px] border border-line-soft bg-cream/60 p-4"
                                        >
                                            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-green-soft text-green-700">
                                                <Icon
                                                    className="size-5"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold tracking-[0.12em] text-ink-muted uppercase">
                                                    {label}
                                                </p>
                                                <p className="mt-1 font-display text-lg leading-tight font-bold break-words text-forest">
                                                    {value}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href="/#barangay-directory"
                                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-[16px] bg-forest px-5 py-3 font-bold text-white transition-colors hover:bg-green-600"
                                >
                                    <ArrowLeft
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                    Back to Directory
                                </Link>
                            </div>

                            <div className="overflow-hidden rounded-[24px] border border-line-soft bg-white/80 shadow-k-card backdrop-blur-md">
                                <iframe
                                    src={mapSrc}
                                    className="h-72 w-full border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={`Map of Barangay ${barangay.name}`}
                                />
                            </div>
                        </aside>
                    </div>
                </Container>
            </Section>
        </PublicLayout>
    );
}
