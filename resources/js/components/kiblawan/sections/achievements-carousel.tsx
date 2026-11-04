import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '@/components/kiblawan/ui/container';
import { Headline } from '@/components/kiblawan/ui/headline';
import { Section } from '@/components/kiblawan/ui/section';
import { AchievementCard } from '@/components/kiblawan/ui/achievement-card';
import type { Achievement } from '@/types';

const CARD_GAP = 20;
const AUTOPLAY_TIMEOUT = 3000;
const END_THRESHOLD = 5;

export function AchievementsCarousel({
    achievements,
}: {
    achievements: Achievement[];
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const repeatedAchievements = [
        ...achievements,
        ...achievements,
        ...achievements,
    ];

    const getSetWidth = useCallback(
        (el: HTMLDivElement): number => {
            const cards = el.querySelectorAll<HTMLElement>('[data-card]');
            const firstCard = cards[0];
            const nextSetFirstCard = cards[achievements.length];

            if (!firstCard || !nextSetFirstCard) {
                return 0;
            }

            return nextSetFirstCard.offsetLeft - firstCard.offsetLeft;
        },
        [achievements.length],
    );

    const scrollByStep = useCallback((direction: 1 | -1): void => {
        const el = trackRef.current;

        if (!el) {
            return;
        }

        const card = el.querySelector<HTMLElement>('[data-card]');
        const step = (card?.offsetWidth ?? 320) + CARD_GAP;

        el.scrollBy({ left: step * direction, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const el = trackRef.current;

        if (!el || achievements.length === 0) {
            return;
        }

        const setWidth = getSetWidth(el);

        if (setWidth === 0) {
            return;
        }

        const setScrollLeftImmediately = (scrollLeft: number): void => {
            const previousScrollBehavior = el.style.scrollBehavior;
            el.style.scrollBehavior = 'auto';
            el.scrollLeft = scrollLeft;
            el.style.scrollBehavior = previousScrollBehavior;
        };

        setScrollLeftImmediately(setWidth);

        const handleScroll = (): void => {
            const maxScrollLeft = el.scrollWidth - el.clientWidth;

            if (el.scrollLeft <= END_THRESHOLD) {
                setScrollLeftImmediately(el.scrollLeft + setWidth);
            } else if (el.scrollLeft >= maxScrollLeft - END_THRESHOLD) {
                setScrollLeftImmediately(el.scrollLeft - setWidth);
            }
        };

        el.addEventListener('scroll', handleScroll);

        return () => el.removeEventListener('scroll', handleScroll);
    }, [achievements.length, getSetWidth]);

    useEffect(() => {
        if (isPaused || achievements.length === 0) {
            return;
        }

        const interval = setInterval(() => {
            scrollByStep(1);
        }, AUTOPLAY_TIMEOUT);

        return () => clearInterval(interval);
    }, [achievements.length, isPaused, scrollByStep]);

    if (achievements.length === 0) {
        return null;
    }

    return (
        <Section className="bg-cream">
            <Container>
                <Headline
                    title="Achievements"
                    action={{ label: 'View All →', href: '/achievements' }}
                />
            </Container>

            <div className="relative">
                <div
                    ref={trackRef}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto scroll-smooth px-4 pb-4 [-ms-overflow-style:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {repeatedAchievements.map((achievement, i) => (
                        <div
                            key={`${achievement.id}-${i}`}
                            data-card=""
                            className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[32%] xl:w-[calc((1320px-8rem-3.75rem)/4)]"
                        >
                            <AchievementCard achievement={achievement} />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
