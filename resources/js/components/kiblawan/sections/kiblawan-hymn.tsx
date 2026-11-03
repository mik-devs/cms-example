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
            <Container className="relative z-10">
                <div className="text-center">
                    <h2 className="mb-3 font-display text-[clamp(2.4rem,4.5vw,3.4rem)] tracking-[2px] text-gold">
                        Kiblawan Hymn
                    </h2>
                    <p className="mb-16 text-center text-base font-extrabold tracking-[0.25em] text-hymn-sub uppercase">
                        Official Music Video
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="aspect-video w-full overflow-hidden rounded-[24px] border-[5px] border-gold bg-black shadow-k-deep lg:w-9/12 xl:w-8/12">
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
