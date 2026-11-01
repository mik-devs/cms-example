import { Link } from '@inertiajs/react';
import { Calendar, Search } from 'lucide-react';
import { formatDate } from '@/lib/format-date';
import type { News } from '@/types';
import { KImage } from './k-image';

export function NewsCard({ news }: { news: News }) {
    return (
        <Link
            href={`/news/${news.slug}`}
            className="group relative block overflow-hidden rounded-[20px] border border-line-soft bg-white/85 shadow-k-card transition-all duration-[400ms] ease-k-smooth hover:-translate-y-2 hover:border-gold hover:shadow-k-glow"
        >
            <div className="overflow-hidden">
                <KImage
                    src={news.image_url}
                    alt={news.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[800ms] ease-k-smooth group-hover:scale-[1.07]"
                />
            </div>

            <p className="m-0 px-[1.3rem] pt-5 pb-1 text-[0.96rem] leading-[1.45] font-extrabold text-forest">
                {news.title}
            </p>

            <strong className="flex items-center gap-1.5 px-[1.3rem] pb-5 text-[0.78rem] font-semibold text-ink-muted">
                <Calendar className="size-3.5 text-gold" />
                {formatDate(news.published_at ?? news.created_at)}
            </strong>

            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent to-forest/85 opacity-0 transition-opacity duration-[400ms] ease-k-smooth group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 text-[0.85rem] font-extrabold tracking-[0.06em] text-white uppercase">
                    <Search className="size-4" /> View Details
                </span>
            </div>
        </Link>
    );
}
