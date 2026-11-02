import { Link } from '@inertiajs/react';
import { Construction } from 'lucide-react';
import { Container } from '@/components/kiblawan/ui/container';
import { KImage } from '@/components/kiblawan/ui/k-image';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import PublicLayout from '@/layouts/public/public-layout';
import type { TourismSpot } from '@/types';

export default function TourismShow({ spot }: { spot: TourismSpot }) {
    return (
        <PublicLayout title={`${spot.name} | Tourism`}>
            <PageHeader
                title={spot.name}
                subtitle={spot.category ?? 'Tourism Highlight'}
            />
            <Container className="py-12 md:py-16">
                <article className="mx-auto max-w-4xl">
                    <KImage
                        src={spot.image_url}
                        alt={spot.name}
                        className="mb-8 aspect-[21/9] w-full rounded-xl object-cover"
                    />
                    <div className="rounded-[20px] border border-line-soft bg-white/80 p-6 shadow-k-soft md:p-10">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-sm font-bold text-forest">
                            <Construction
                                aria-hidden="true"
                                className="size-4 text-gold"
                            />
                            Under Construction
                        </div>
                        <h2 className="mb-4 font-display text-2xl font-bold text-forest">
                            More details about {spot.name} are coming soon
                        </h2>
                        <p className="leading-relaxed whitespace-pre-line text-ink-muted">
                            {spot.description}
                        </p>
                    </div>
                    <Link
                        href="/"
                        className="mt-8 inline-flex font-bold text-green-600 hover:text-gold"
                    >
                        ← Back to Home
                    </Link>
                </article>
            </Container>
        </PublicLayout>
    );
}
