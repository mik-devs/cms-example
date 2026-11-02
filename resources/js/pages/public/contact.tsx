import { useState, type FormEvent } from 'react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import PublicLayout from '@/layouts/public/public-layout';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export default function Contact({
    settings,
}: {
    settings: Record<string, string | null>;
}) {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: '',
    });
    const address =
        settings.address ??
        'Dagohoy Street, Barangay Poblacion, Kiblawan, Davao del Sur, Philippines';
    const phone = settings.phone ?? '';
    const email = settings.email ?? '';
    const officeHours = settings.office_hours ?? '';
    const phoneHref = phone.replace(/[^\d+]/g, '');

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const subject = encodeURIComponent(
            `Contact message from ${formData.name}`,
        );
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
        );

        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }

    return (
        <PublicLayout title="Contact Us">
            <PageHeader
                title="Contact Us"
                subtitle="Get in touch with the Municipality of Kiblawan."
            />
            <Container className="py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="flex flex-col gap-8">
                        <section className="relative z-10 rounded-[20px] border border-line-soft bg-white/80 p-6 shadow-k-soft md:p-8">
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
                            <form
                                className="flex flex-col gap-4"
                                onSubmit={handleSubmit}
                            >
                                <label className="flex flex-col gap-1.5 text-sm font-semibold text-forest">
                                    Name
                                    <input
                                        type="text"
                                        name="name"
                                        autoComplete="name"
                                        required
                                        value={formData.name}
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                name: event.target.value,
                                            })
                                        }
                                        className="w-full rounded-xl border border-line-soft bg-white/50 px-4 py-3 text-ink transition-all outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                                    />
                                </label>
                                <label className="flex flex-col gap-1.5 text-sm font-semibold text-forest">
                                    Email
                                    <input
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        required
                                        value={formData.email}
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                email: event.target.value,
                                            })
                                        }
                                        className="w-full rounded-xl border border-line-soft bg-white/50 px-4 py-3 text-ink transition-all outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                                    />
                                </label>
                                <label className="flex flex-col gap-1.5 text-sm font-semibold text-forest">
                                    Message
                                    <textarea
                                        name="message"
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                message: event.target.value,
                                            })
                                        }
                                        className="w-full resize-y rounded-xl border border-line-soft bg-white/50 px-4 py-3 text-ink transition-all outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                                    />
                                </label>
                                <button
                                    type="submit"
                                    className="w-fit rounded-full bg-forest px-6 py-3 font-bold text-white transition-colors hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
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
