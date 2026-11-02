import { Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import type { TourismSpot } from '@/types';
import { KImage } from './k-image';

export function TourCard({ spot }: { spot: TourismSpot }) {
    return (
        <Link
            href={`/tourism/${spot.slug}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-[20px]"
        >
            <KImage
                src={spot.image_url}
                alt={spot.name}
                className="absolute inset-0 z-[1] h-full w-full object-cover transition-transform duration-[900ms] ease-k-smooth group-hover:scale-[1.12]"
            />
            <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-forest/92 via-forest/55 to-transparent p-9 px-7 text-white transition-transform duration-[400ms] ease-k-smooth group-hover:-translate-y-1.5">
                <h4 className="m-0 mb-3 font-display text-xl text-gold-soft">
                    {spot.name}
                </h4>
                <p className="m-0 text-[0.9rem] leading-snug text-tour-pale">
                    {spot.description}
                </p>
            </div>
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-t from-forest/95 via-forest/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex translate-y-4 transform items-center gap-2 text-sm font-bold tracking-widest text-white uppercase transition-transform duration-300 group-hover:translate-y-0">
                    <Search className="h-4 w-4" /> View Details
                </span>
            </div>
        </Link>
    );
}
