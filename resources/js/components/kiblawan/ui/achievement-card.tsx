import { Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import type { Achievement } from '@/types';
import { KImage } from './k-image';

export function AchievementCard({ achievement }: { achievement: Achievement }) {
    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line-soft bg-white/80 shadow-k-card backdrop-blur-[14px] backdrop-saturate-150 transition-all duration-[400ms] ease-k-smooth hover:-translate-y-2 hover:border-gold hover:shadow-k-glow">
            <div className="relative aspect-[16/10] overflow-hidden bg-image-bed">
                <KImage
                    src={achievement.image_url}
                    alt={achievement.title}
                    className="h-full w-full object-cover transition-transform duration-[800ms] ease-k-smooth group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 z-[2] flex items-center justify-center bg-gradient-to-b from-transparent to-forest/85 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100">
                    <Link
                        href={`/achievements/${achievement.id}`}
                        className="inline-flex items-center gap-2 text-[0.85rem] font-extrabold tracking-[0.06em] text-white uppercase"
                    >
                        <Search className="size-4" /> View Details
                    </Link>
                </div>
            </div>

            <div className="relative grow p-6 pt-[1.6rem] pb-[1.8rem]">
                <div className="absolute -top-[1.1rem] right-6 z-[3] rounded-full border border-white/40 bg-gold px-3.5 py-1 font-sans text-[0.78rem] font-extrabold text-forest shadow-[0_8px_20px_rgba(201,162,39,0.3)]">
                    {achievement.badge_year}
                </div>
                <h4 className="m-0 mb-2.5 font-display text-[1.15rem] leading-tight text-forest">
                    {achievement.title}
                </h4>
                <p className="m-0 text-[0.88rem] leading-relaxed text-ink-muted">
                    {achievement.description}
                </p>
            </div>
        </div>
    );
}
