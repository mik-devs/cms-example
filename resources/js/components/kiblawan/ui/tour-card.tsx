import { Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import type { TourismSpot } from '@/types';

export function TourCard({ spot }: { spot: TourismSpot }) {
    return (
        <Link
            href={`/tourism/${spot.slug}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-[20px]"
        >
            <img
                src={spot.image_url}
                alt={spot.name}
                className="absolute inset-0 z-[1] h-full w-full object-cover"
                loading="lazy"
                decoding="async"
            />
            <div className="absolute inset-x-0 bottom-0 z-[2] bg-linear-to-t from-dark-brown/95 via-dark-brown/60 to-transparent p-9 px-7 text-white">
                <h3 className="m-0 mb-3 font-display text-xl text-gold">
                    {spot.name}
                </h3>
                <p className="m-0 text-sm leading-snug text-cream/85">
                    {spot.description}
                </p>
            </div>
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-linear-to-t from-dark-brown/95 via-dark-brown/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-white uppercase">
                    <Search className="h-4 w-4" /> View Details
                </span>
            </div>
        </Link>
    );
}
