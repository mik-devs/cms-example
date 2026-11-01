import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '@/components/kiblawan/ui/container';
import { Headline } from '@/components/kiblawan/ui/headline';
import { NewsCard } from '@/components/kiblawan/ui/news-card';
import { Section } from '@/components/kiblawan/ui/section';
import type { News } from '@/types';

const CARD_GAP = 20;
const AUTOPLAY_TIMEOUT = 3000;
const END_THRESHOLD = 5;

export function NewsCarousel({ news }: { news: News[] }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const repeatedNews = [...news, ...news, ...news];

    const getSetWidth = useCallback(
        (el: HTMLDivElement): number => {
            const cards = el.querySelectorAll<HTMLElement>('[data-card]');
            const firstCard = cards[0];
            const nextSetFirstCard = cards[news.length];

            if (!firstCard || !nextSetFirstCard) {
                return 0;
            }

            return nextSetFirstCard.offsetLeft - firstCard.offsetLeft;
        },
        [news.length],
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

        if (!el || news.length === 0) {
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
    }, [getSetWidth, news.length]);

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
                    className="flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto scroll-smooth px-4 pb-4 [-ms-overflow-style:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden"
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
                    className="absolute top-1/2 left-1 z-10 hidden size-[46px] -translate-y-1/2 place-items-center rounded-full bg-forest text-lg text-white shadow-k-card transition-all duration-[400ms] ease-k-smooth hover:scale-105 hover:bg-gold hover:text-forest sm:grid"
                >
                    ‹
                </button>
                <button
                    type="button"
                    onClick={() => scrollByStep(1)}
                    aria-label="Next news"
                    className="absolute top-1/2 right-1 z-10 hidden size-[46px] -translate-y-1/2 place-items-center rounded-full bg-forest text-lg text-white shadow-k-card transition-all duration-[400ms] ease-k-smooth hover:scale-105 hover:bg-gold hover:text-forest sm:grid"
                >
                    ›
                </button>
            </div>
        </Section>
    );
}
