import { Container } from '@/components/kiblawan/ui/container';
import { Section } from '@/components/kiblawan/ui/section';

export function KiblawanHymn({
    videoSrc,
    posterSrc,
}: {
    videoSrc: string;
    posterSrc: string;
}) {
    return (
        <Section className="relative overflow-hidden bg-k-grad-green py-28 text-white">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_15%_20%,rgba(94,20,28,0.35)_0,transparent_40%),radial-gradient(circle_at_85%_80%,rgba(201,162,39,0.12)_0,transparent_45%)]"
            />
            <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-maroon via-gold to-maroon"
            />

            <Container className="relative z-10">
                <div className="text-center">
                    <h2 className="mb-3 font-display text-[clamp(2.4rem,4.5vw,3.4rem)] tracking-[2px] text-gold-soft [text-shadow:0_6px_24px_rgba(0,0,0,0.45)]">
                        Kiblawan Hymn
                    </h2>
                    <p className="mb-16 text-center text-base font-extrabold uppercase tracking-[0.25em] text-hymn-sub">
                        Official Music Video
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="aspect-video w-full overflow-hidden rounded-[24px] border-[5px] border-maroon bg-black shadow-k-deep transition-all duration-[400ms] ease-k-smooth hover:scale-[1.015] hover:shadow-[0_34px_76px_rgba(0,0,0,0.85),0_0_70px_rgba(94,20,28,0.75)] lg:w-9/12 xl:w-8/12">
                        <video
                            src={videoSrc}
                            controls
                            poster={posterSrc}
                            className="block h-full w-full object-cover"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
