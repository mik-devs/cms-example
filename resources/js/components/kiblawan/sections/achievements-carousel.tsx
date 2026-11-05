import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '@/components/kiblawan/ui/container';
import { Headline } from '@/components/kiblawan/ui/headline';
import { Section } from '@/components/kiblawan/ui/section';
import { AchievementCard } from '@/components/kiblawan/ui/achievement-card';
import type { Achievement } from '@/types';

const CARD_GAP = 20;
const AUTOPLAY_TIMEOUT = 3000;
const END_THRESHOLD = 5;
const REPEAT_COUNT = 5;

export function AchievementsCarousel({
    achievements,
}: {
    achievements: Achievement[];
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const repeatedAchievements = Array.from(
        { length: REPEAT_COUNT },
        () => achievements,
    ).flat();

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

        const cards = el.querySelectorAll<HTMLElement>('[data-card]');
        const firstCard = cards[0];
        const secondSetFirstCard = cards[achievements.length];
        const thirdSetFirstCard = cards[achievements.length * 2];

        if (!firstCard || !secondSetFirstCard || !thirdSetFirstCard) {
            return;
        }

        const getContentLeft = (card: HTMLElement): number =>
            card.getBoundingClientRect().left -
            el.getBoundingClientRect().left +
            el.scrollLeft;

        let firstSetStart = getContentLeft(firstCard);
        let secondSetStart = getContentLeft(secondSetFirstCard);
        let thirdSetStart = getContentLeft(thirdSetFirstCard);

        const setScrollLeftImmediately = (scrollLeft: number): void => {
            const previousScrollBehavior = el.style.scrollBehavior;
            el.style.scrollBehavior = 'auto';
            el.scrollLeft = scrollLeft;
            el.style.scrollBehavior = previousScrollBehavior;
        };

        const measure = (): void => {
            firstSetStart = getContentLeft(firstCard);
            secondSetStart = getContentLeft(secondSetFirstCard);
            thirdSetStart = getContentLeft(thirdSetFirstCard);
        };

        setScrollLeftImmediately(secondSetStart);

        const handleScroll = (): void => {
            if (el.scrollLeft <= firstSetStart + END_THRESHOLD) {
                setScrollLeftImmediately(secondSetStart);
            } else if (el.scrollLeft >= thirdSetStart - END_THRESHOLD) {
                setScrollLeftImmediately(secondSetStart);
            }
        };

        const resizeObserver = new ResizeObserver(measure);

        resizeObserver.observe(el);
        el.addEventListener('scroll', handleScroll);

        return () => {
            resizeObserver.disconnect();
            el.removeEventListener('scroll', handleScroll);
        };
    }, [achievements.length]);

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
                    className="flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto scroll-smooth px-12 pb-4 md:px-16 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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

                <button
                    type="button"
                    onClick={() => scrollByStep(-1)}
                    aria-label="Previous achievement"
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 size-[46px] rounded-full bg-[#7A2926] text-white grid place-items-center text-xl shadow-md transition-all duration-300 hover:bg-[#5E141C] hover:scale-105 hidden sm:grid"
                >
                    ‹
                </button>
                <button
                    type="button"
                    onClick={() => scrollByStep(1)}
                    aria-label="Next achievement"
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 size-[46px] rounded-full bg-[#7A2926] text-white grid place-items-center text-xl shadow-md transition-all duration-300 hover:bg-[#5E141C] hover:scale-105 hidden sm:grid"
                >
                    ›
                </button>
            </div>
        </Section>
    );
}
