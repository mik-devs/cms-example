import { Link } from '@inertiajs/react';
import type { TourismSpot } from '@/types';
import { KImage } from './k-image';

export function TourCard({ spot }: { spot: TourismSpot }) {
    return (
        <Link
            href={`/tourism/${spot.slug}`}
            className="group relative flex aspect-[4/5] items-end overflow-hidden rounded-[20px]"
        >
            <KImage
                src={spot.image_url}
                alt={spot.name}
                className="absolute inset-0 z-[1] h-full w-full object-cover transition-transform duration-[900ms] ease-k-smooth group-hover:scale-[1.12]"
            />
            <div className="relative z-[2] w-full bg-gradient-to-t from-forest/92 via-forest/55 to-transparent p-9 px-7 text-white transition-transform duration-[400ms] ease-k-smooth group-hover:-translate-y-1.5">
                <h4 className="m-0 mb-3 font-display text-[1.5rem] text-gold-soft">
                    {spot.name}
                </h4>
                <p className="m-0 text-[0.9rem] leading-snug text-tour-pale">
                    {spot.description}
                </p>
            </div>
        </Link>
    );
}
