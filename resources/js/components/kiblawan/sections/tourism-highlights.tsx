import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '@/components/kiblawan/ui/container';
import { Headline } from '@/components/kiblawan/ui/headline';
import { Section } from '@/components/kiblawan/ui/section';
import { TourCard } from '@/components/kiblawan/ui/tour-card';
import type { TourismSpot } from '@/types';

const CARD_GAP = 24;
const AUTOPLAY_TIMEOUT = 3000;
const END_THRESHOLD = 5;
const REPEAT_COUNT = 5;

export function TourismHighlights({ spots }: { spots: TourismSpot[] }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const repeatedSpots = Array.from(
        { length: REPEAT_COUNT },
        () => spots,
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

    const scrollNext = useCallback(() => scrollByStep(1), [scrollByStep]);
    const scrollPrev = useCallback(() => scrollByStep(-1), [scrollByStep]);

    useEffect(() => {
        const el = trackRef.current;

        if (!el || spots.length === 0) {
            return;
        }

        const cards = el.querySelectorAll<HTMLElement>('[data-card]');
        const firstCard = cards[0];
        const secondSetFirstCard = cards[spots.length];
        const thirdSetFirstCard = cards[spots.length * 2];

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
    }, [spots.length]);

    useEffect(() => {
        if (isPaused || spots.length === 0) {
            return;
        }

        const interval = setInterval(scrollNext, AUTOPLAY_TIMEOUT);

        return () => clearInterval(interval);
    }, [isPaused, scrollNext, spots.length]);

    if (spots.length === 0) {
        return null;
    }

    return (
        <Section className="overflow-hidden bg-cream">
            <Container>
                <Headline
                    title="Tourism Highlights"
                    action={{ label: 'Discover Kiblawan →', href: '/tourism' }}
                />
            </Container>

            <div className="relative">
                <div
                    ref={trackRef}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto scroll-smooth px-4 pb-8 [-ms-overflow-style:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden"
                >
                    {repeatedSpots.map((spot, index) => (
                        <div
                            key={`${spot.id}-${index}`}
                            data-card=""
                            className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[32%] xl:w-[calc((1320px-10rem)/4)]"
                        >
                            <TourCard spot={spot} />
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={scrollPrev}
                    aria-label="Previous tourism highlights"
                    className="absolute top-1/2 left-1 z-10 hidden size-[46px] -translate-y-1/2 place-items-center rounded-full bg-primary text-lg text-white shadow-k-card transition-all duration-[400ms] ease-k-smooth hover:bg-gold hover:text-primary sm:grid"
                >
                    ‹
                </button>
                <button
                    type="button"
                    onClick={scrollNext}
                    aria-label="Next tourism highlights"
                    className="absolute top-1/2 right-1 z-10 hidden size-[46px] -translate-y-1/2 place-items-center rounded-full bg-primary text-lg text-white shadow-k-card transition-all duration-[400ms] ease-k-smooth hover:bg-gold hover:text-primary sm:grid"
                >
                    ›
                </button>
            </div>
        </Section>
    );
}
