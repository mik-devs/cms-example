import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import PublicLayout from '@/layouts/public/public-layout';

export default function Contact({
    settings,
}: {
    settings: Record<string, string | null>;
}) {
    const address =
        settings.address ??
        'Dagohoy Street, Barangay Poblacion, Kiblawan, Davao del Sur, Philippines';
    const phone = settings.phone ?? '';
    const email = settings.email ?? '';
    const officeHours = settings.office_hours ?? '';
    const phoneHref = phone.replace(/[^\d+]/g, '');

    return (
        <PublicLayout title="Contact Us">
            <PageHeader
                title="Contact Us"
                subtitle="Get in touch with the Municipality of Kiblawan."
            />
            <Container className="py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="flex flex-col gap-8">
                        <section className="rounded-[20px] border border-line-soft bg-white/80 p-6 shadow-k-soft md:p-8">
                            <h2 className="mb-6 font-display text-2xl font-bold text-forest">
                                Contact Information
                            </h2>
                            <ul className="m-0 flex list-none flex-col gap-5 p-0">
                                <li className="flex gap-4">
                                    <MapPin className="mt-1 size-5 shrink-0 text-gold" />
                                    <div>
                                        <h3 className="font-sans text-sm font-bold text-forest">
                                            Address
                                        </h3>
                                        <p className="m-0 text-ink-muted">
                                            {address}
                                        </p>
                                    </div>
                                </li>
                                {phone && (
                                    <li className="flex gap-4">
                                        <Phone className="mt-1 size-5 shrink-0 text-gold" />
                                        <div>
                                            <h3 className="font-sans text-sm font-bold text-forest">
                                                Phone
                                            </h3>
                                            <a
                                                href={`tel:${phoneHref}`}
                                                className="text-ink-muted hover:text-green-600"
                                            >
                                                {phone}
                                            </a>
                                        </div>
                                    </li>
                                )}
                                {email && (
                                    <li className="flex gap-4">
                                        <Mail className="mt-1 size-5 shrink-0 text-gold" />
                                        <div>
                                            <h3 className="font-sans text-sm font-bold text-forest">
                                                Email
                                            </h3>
                                            <a
                                                href={`mailto:${email}`}
                                                className="text-ink-muted hover:text-green-600"
                                            >
                                                {email}
                                            </a>
                                        </div>
                                    </li>
                                )}
                                {officeHours && (
                                    <li className="flex gap-4">
                                        <Clock className="mt-1 size-5 shrink-0 text-gold" />
                                        <div>
                                            <h3 className="font-sans text-sm font-bold text-forest">
                                                Office Hours
                                            </h3>
                                            <p className="m-0 text-ink-muted">
                                                {officeHours}
                                            </p>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </section>

                        <section className="rounded-[20px] border border-line-soft bg-white/80 p-6 shadow-k-soft md:p-8">
                            <h2 className="mb-5 font-display text-2xl font-bold text-forest">
                                Send a Message
                            </h2>
                            <form className="flex flex-col gap-4">
                                <label className="flex flex-col gap-1.5 text-sm font-semibold text-forest">
                                    Name
                                    <input
                                        type="text"
                                        disabled
                                        className="rounded-xl border border-line-soft bg-cream/60 px-4 py-3 text-ink-muted"
                                    />
                                </label>
                                <label className="flex flex-col gap-1.5 text-sm font-semibold text-forest">
                                    Email
                                    <input
                                        type="email"
                                        disabled
                                        className="rounded-xl border border-line-soft bg-cream/60 px-4 py-3 text-ink-muted"
                                    />
                                </label>
                                <label className="flex flex-col gap-1.5 text-sm font-semibold text-forest">
                                    Message
                                    <textarea
                                        rows={4}
                                        disabled
                                        className="resize-y rounded-xl border border-line-soft bg-cream/60 px-4 py-3 text-ink-muted"
                                    />
                                </label>
                                <button
                                    type="button"
                                    disabled
                                    title="Form coming soon"
                                    className="w-fit rounded-full bg-forest px-6 py-3 font-bold text-white opacity-60"
                                >
                                    Send
                                </button>
                            </form>
                        </section>
                    </div>

                    <div className="min-h-[400px] overflow-hidden rounded-[20px] border border-line-soft bg-image-bed shadow-k-soft">
                        {settings.map_embed ? (
                            <iframe
                                src={settings.map_embed}
                                className="h-full min-h-[400px] w-full border-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Kiblawan Map"
                            />
                        ) : (
                            <div className="flex min-h-[400px] items-center justify-center p-8 text-center text-ink-muted">
                                Map unavailable
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </PublicLayout>
    );
}
