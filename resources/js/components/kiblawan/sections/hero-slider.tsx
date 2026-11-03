import { Link } from '@inertiajs/react';

import { Container } from '@/components/kiblawan/ui/container';
import { useCarousel } from '@/hooks/use-carousel';
import { renderEmphasisTitle } from '@/lib/emphasis-title';
import { cn } from '@/lib/utils';
import type { HeroSlide } from '@/types';

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
    const { index, goTo, next, prev, containerProps } = useCarousel({
        length: slides.length,
        autoplay: true,
        timeout: 4000,
        pauseOnHover: true,
    });

    if (slides.length === 0) {
        return (
            <section
                aria-label="Featured highlights"
                className="h-[calc(100vh-var(--nav-offset))] min-h-[620px] w-full bg-k-grad-hero"
            />
        );
    }

    return (
        <section
            aria-label="Featured highlights"
            aria-roledescription="carousel"
            className="relative h-[calc(100vh-var(--nav-offset))] min-h-[620px] w-full overflow-hidden bg-k-grad-hero"
            {...containerProps}
        >
            {slides.map((slide, i) => (
                <div
                    key={slide.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${slides.length}`}
                    aria-hidden={i !== index}
                    className={cn(
                        'absolute inset-0 bg-cover bg-center transition-opacity duration-[1000ms] ease-k-smooth will-change-[opacity]',
                        i === index
                            ? 'z-10 opacity-100'
                            : 'pointer-events-none z-0 opacity-0',
                    )}
                    style={{ backgroundImage: `url(${slide.image_url})` }}
                >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(84,42,32,0.9)_0%,rgba(84,42,32,0.55)_50%,rgba(84,42,32,0.2)_100%)]" />

                    <Container className="relative z-[2] flex h-full w-full flex-col items-start justify-center px-4 py-8 text-left text-white sm:px-4 lg:px-4">
                        <div className="w-full max-w-3xl text-left">
                            {slide.kicker && (
                                <p className="mb-4 inline-flex items-center gap-2.5 text-[0.78rem] font-extrabold tracking-[0.22em] text-gold uppercase before:block before:h-0.5 before:w-[26px] before:rounded-sm before:bg-gold before:content-['']">
                                    {slide.kicker}
                                </p>
                            )}
                            <h2 className="mb-7 max-w-[20ch] font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.12] text-white [text-shadow:0_6px_30px_rgba(0,0,0,0.45)]">
                                {renderEmphasisTitle(
                                    slide.title,
                                    slide.title_emphasis,
                                )}
                            </h2>

                            {slide.subtitle && (
                                <p className="mb-8 max-w-[52ch] text-[clamp(1rem,1.6vw,1.15rem)] leading-relaxed text-white/90 [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]">
                                    {slide.subtitle}
                                </p>
                            )}

                            {slide.cta_text && slide.cta_link && (
                                <Link
                                    href={slide.cta_link}
                                    className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-extrabold tracking-wide text-primary-dark shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 ease-k-smooth hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-[0_14px_36px_rgba(0,0,0,0.3)]"
                                >
                                    {slide.cta_text}
                                    <span aria-hidden="true">→</span>
                                </Link>
                            )}
                        </div>
                    </Container>
                </div>
            ))}

            <div className="absolute right-0 bottom-7 left-0 z-[3] flex items-center justify-center gap-8">
                <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous slide"
                    className="size-12 rounded-full border border-white/40 bg-black/30 text-lg text-white transition-colors duration-300 ease-k-smooth hover:border-gold hover:bg-gold hover:text-primary-dark"
                >
                    ‹
                </button>

                <div
                    role="tablist"
                    aria-label="Slide navigation"
                    className="flex gap-2.5"
                >
                    {slides.map((slide, i) => (
                        <button
                            key={slide.id}
                            type="button"
                            role="tab"
                            onClick={() => goTo(i)}
                            aria-selected={i === index}
                            aria-label={`Go to slide ${i + 1}`}
                            className={cn(
                                'h-1.5 rounded-full transition-all duration-[400ms] ease-k-smooth',
                                i === index
                                    ? 'w-14 bg-gold shadow-[0_0_12px_var(--color-gold)]'
                                    : 'w-9 bg-white/35',
                            )}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={next}
                    aria-label="Next slide"
                    className="size-12 rounded-full border border-white/40 bg-black/30 text-lg text-white transition-colors duration-300 ease-k-smooth hover:border-gold hover:bg-gold hover:text-primary-dark"
                >
                    ›
                </button>
            </div>
        </section>
    );
}
