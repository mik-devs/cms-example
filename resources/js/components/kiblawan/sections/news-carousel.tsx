import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '@/components/kiblawan/ui/container';
import { Headline } from '@/components/kiblawan/ui/headline';
import { NewsCard } from '@/components/kiblawan/ui/news-card';
import { Section } from '@/components/kiblawan/ui/section';
import type { News } from '@/types';

const CARD_GAP = 20;
const AUTOPLAY_TIMEOUT = 3000;
const END_THRESHOLD = 5;
const REPEAT_COUNT = 5;

export function NewsCarousel({ news }: { news: News[] }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const repeatedNews = Array.from(
        { length: REPEAT_COUNT },
        () => news,
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

        if (!el || news.length === 0) {
            return;
        }

        const cards = el.querySelectorAll<HTMLElement>('[data-card]');
        const firstCard = cards[0];
        const secondSetFirstCard = cards[news.length];
        const thirdSetFirstCard = cards[news.length * 2];

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
    }, [news.length]);

    useEffect(() => {
        if (isPaused || news.length === 0) {
            return;
        }

        const interval = setInterval(() => {
            scrollByStep(1);
        }, AUTOPLAY_TIMEOUT);

        return () => clearInterval(interval);
    }, [isPaused, news.length, scrollByStep]);

    if (news.length === 0) {
        return (
            <Section className="bg-paper">
                <Container>
                    <Headline
                        title="Latest News & Announcements"
                        action={{ label: 'More News →', href: '/news' }}
                    />
                    <p className="text-ink-muted">Walang balita sa ngayon.</p>
                </Container>
            </Section>
        );
    }

    return (
        <Section className="bg-paper">
            <Container>
                <Headline
                    title="Latest News & Announcements"
                    action={{ label: 'More News →', href: '/news' }}
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
                    {repeatedNews.map((item, i) => (
                        <div
                            key={`${item.id}-${i}`}
                            data-card=""
                            className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[32%] xl:w-[calc((1320px-8rem-3.75rem)/4)]"
                        >
                            <NewsCard news={item} />
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => scrollByStep(-1)}
                    aria-label="Previous news"
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 size-[46px] rounded-full bg-[#7A2926] text-white grid place-items-center text-xl shadow-md transition-all duration-300 hover:bg-[#5E141C] hover:scale-105 hidden sm:grid"
                >
                    ‹
                </button>
                <button
                    type="button"
                    onClick={() => scrollByStep(1)}
                    aria-label="Next news"
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 size-[46px] rounded-full bg-[#7A2926] text-white grid place-items-center text-xl shadow-md transition-all duration-300 hover:bg-[#5E141C] hover:scale-105 hidden sm:grid"
                >
                    ›
                </button>
            </div>
        </Section>
    );
}
