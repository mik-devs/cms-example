import { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import { MapPin } from 'lucide-react';
import { Container } from '@/components/kiblawan/ui/container';
import { Headline } from '@/components/kiblawan/ui/headline';
import { Section } from '@/components/kiblawan/ui/section';
import type { Barangay } from '@/types';

export function BarangayMap({
    barangays,
    mapEmbedUrl,
}: {
    barangays: Barangay[];
    mapEmbedUrl: string;
}) {
    const [query, setQuery] = useState('');

    const filteredBarangays = useMemo(() => {
        const normalized = query.trim().toLowerCase();

        return barangays.filter((barangay) =>
            barangay.name.toLowerCase().includes(normalized),
        );
    }, [barangays, query]);

    return (
        <Section id="barangay-directory" className="bg-paper">
            <Container>
                <Headline
                    title="Barangay Directory & Map"
                    action={{
                        label: 'View All 30 Barangays →',
                        href: '/barangays',
                    }}
                />

                <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
                    <div>
                        <input
                            type="search"
                            placeholder="Search for a barangay..."
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            className="mb-8 w-full rounded-[16px] border border-line bg-white px-5 py-4 font-sans text-ink transition-all outline-none placeholder:text-ink-muted focus:border-gold focus:shadow-[0_0_0_4px_rgba(232,184,63,0.15)]"
                        />

                        <div className="grid k-scrollbar max-h-80 grid-cols-3 gap-2.5 overflow-y-auto pr-2">
                            {filteredBarangays.map((barangay) => (
                                <Link
                                    key={barangay.id}
                                    href={`/barangays/${barangay.slug}`}
                                    className="block rounded-[12px] border border-transparent bg-cream px-4 py-3 text-[0.88rem] text-primary transition-all hover:border-green-soft hover:bg-green-soft hover:text-green-dark"
                                >
                                    {barangay.name}
                                </Link>
                            ))}
                        </div>

                        {filteredBarangays.length === 0 && query && (
                            <p className="mt-4 text-sm text-ink-muted">
                                No barangays match "{query}".
                            </p>
                        )}
                    </div>

                    <div className="h-full min-h-[400px] overflow-hidden rounded-[20px] border border-line bg-image-bed shadow-k-soft">
                        {mapEmbedUrl ? (
                            <iframe
                                src={mapEmbedUrl}
                                className="h-full min-h-[400px] w-full border-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Kiblawan Map"
                            />
                        ) : (
                            <div className="flex h-full min-h-[400px] items-center justify-center gap-3 text-ink-muted">
                                <MapPin className="size-5 text-primary" />
                                <span className="font-semibold">
                                    Map unavailable
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
