import { Container } from '@/components/kiblawan/ui/container';
import { Headline } from '@/components/kiblawan/ui/headline';
import { Section } from '@/components/kiblawan/ui/section';
import { TourCard } from '@/components/kiblawan/ui/tour-card';
import type { TourismSpot } from '@/types';

export function TourismHighlights({
    spots,
}: {
    spots: TourismSpot[];
}) {
    if (spots.length === 0) {
        return null;
    }

    return (
        <Section className="bg-cream">
            <Container>
                <Headline
                    title="Tourism Highlights"
                    action={{ label: 'Discover Kiblawan →', href: '/tourism' }}
                />

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {spots.map((spot) => (
                        <TourCard key={spot.id} spot={spot} />
                    ))}
                </div>
            </Container>
        </Section>
    );
}
