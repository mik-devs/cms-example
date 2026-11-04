import { Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/kiblawan/ui/container';
import { GovernmentNavigation } from '@/components/kiblawan/government-navigation';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';
import type { Office } from '@/types';

export default function Directories({ offices }: { offices: Office[] }) {
    return (
        <PublicLayout title="Office Directories | Municipality of Kiblawan">
            <PageHeader
                title="Government"
                subtitle="Contact the municipal departments and offices serving Kiblawan."
            />

            <Section className="bg-cream py-12 md:py-16">
                <Container>
                    <GovernmentNavigation activeTab="directories" />
                    {offices.length === 0 ? (
                        <div className="rounded-[24px] border border-line bg-white p-10 text-center text-ink-muted shadow-k-soft">
                            No office directories have been published yet.
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            {offices.map((office) => (
                                <article
                                    key={office.id}
                                    className="h-full rounded-xl border border-line-soft bg-white p-6 shadow-sm transition-shadow duration-300 ease-k-smooth hover:shadow-k-glow"
                                >
                                    <h2 className="font-display text-2xl leading-snug font-bold text-primary">
                                        {office.name}
                                    </h2>
                                    {office.head && (
                                        <p className="mt-1 text-ink-muted">
                                            {office.head}
                                        </p>
                                    )}
                                    <ul className="mt-6 space-y-3 text-sm text-ink-muted">
                                        {office.contact_number && (
                                            <li className="flex items-center gap-3">
                                                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <Phone
                                                        className="size-4"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                                <a
                                                    href={`tel:${office.contact_number}`}
                                                    className="transition-colors hover:text-primary"
                                                >
                                                    {office.contact_number}
                                                </a>
                                            </li>
                                        )}
                                        {office.email && (
                                            <li className="flex items-center gap-3">
                                                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <Mail
                                                        className="size-4"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                                <a
                                                    href={`mailto:${office.email}`}
                                                    className="break-all transition-colors hover:text-primary"
                                                >
                                                    {office.email}
                                                </a>
                                            </li>
                                        )}
                                        {office.location && (
                                            <li className="flex items-center gap-3">
                                                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <MapPin
                                                        className="size-4"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                                {office.location}
                                            </li>
                                        )}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    )}
                </Container>
            </Section>
        </PublicLayout>
    );
}
