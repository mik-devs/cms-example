import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Container } from '@/components/kiblawan/ui/container';
import { Section } from '@/components/kiblawan/ui/section';
import type { OfficialVideo } from '@/types';

interface KiblawanVideosProps {
    videos?: (OfficialVideo | { title: string; video_url?: string; src?: string })[];
}

export function KiblawanVideos({ videos = [] }: KiblawanVideosProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!videos || videos.length === 0) {
        return null;
    }

    const safeCurrentIndex = currentIndex >= videos.length ? 0 : currentIndex;
    const isMulti = videos.length > 1;
    const prevIndex = (safeCurrentIndex - 1 + videos.length) % videos.length;
    const nextIndex = (safeCurrentIndex + 1) % videos.length;

    function goTo(index: number): void {
        setCurrentIndex((index + videos.length) % videos.length);
    }

    const getVideoSrc = (video: (typeof videos)[number]): string => {
        return 'video_url' in video && video.video_url
            ? video.video_url
            : 'src' in video && video.src
              ? video.src
              : '';
    };

    const renderVideo = (
        video: (typeof videos)[number],
        position: 'prev' | 'active' | 'next',
    ) => {
        const isCenter = position === 'active';
        const src = getVideoSrc(video);

        return (
            <div
                key={`${src}-${position}`}
                className={`relative overflow-hidden rounded-[24px] border-[5px] border-gold bg-black shadow-k-deep transition-all duration-500 ${
                    isCenter
                        ? 'z-20 scale-100 opacity-100'
                        : 'z-10 scale-75 opacity-50'
                } ${position === 'prev' ? '-mr-12' : ''} ${
                    position === 'next' ? '-ml-12' : ''
                }`}
                style={{ width: isCenter ? '62%' : '46%', aspectRatio: '16 / 9' }}
            >
                <video
                    src={src}
                    controls={isCenter}
                    muted={!isCenter}
                    loop={isCenter}
                    playsInline
                    preload="metadata"
                    className="block h-full w-full object-cover"
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    };

    return (
        <Section className="relative overflow-hidden bg-k-grad-green py-20 text-white">
            <Container className="relative z-10">
                <div className="text-center">
                    <h2 className="mb-3 font-display text-[clamp(2.4rem,4.5vw,3.4rem)] tracking-[2px] text-gold">
                        Kiblawan Official Videos
                    </h2>
                    <p className="mb-16 text-center text-base font-extrabold uppercase tracking-[0.25em] text-white/80">
                        Watch our latest milestones, festivals, and official
                        updates.
                    </p>
                </div>

                <div className="relative flex items-center justify-center">
                    {isMulti && (
                        <button
                            type="button"
                            aria-label="Previous video"
                            onClick={() => goTo(safeCurrentIndex - 1)}
                            className="absolute left-2 z-30 flex size-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-md backdrop-blur transition-colors hover:bg-gold hover:text-primary-dark"
                        >
                            <ChevronLeft className="size-6" />
                        </button>
                    )}

                    <div className="flex w-full items-center justify-center">
                        {isMulti && renderVideo(videos[prevIndex], 'prev')}
                        {renderVideo(videos[safeCurrentIndex], 'active')}
                        {isMulti && renderVideo(videos[nextIndex], 'next')}
                    </div>

                    {isMulti && (
                        <button
                            type="button"
                            aria-label="Next video"
                            onClick={() => goTo(safeCurrentIndex + 1)}
                            className="absolute right-2 z-30 flex size-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-md backdrop-blur transition-colors hover:bg-gold hover:text-primary-dark"
                        >
                            <ChevronRight className="size-6" />
                        </button>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <h3 className="font-display text-2xl font-bold text-gold">
                        {videos[safeCurrentIndex].title}
                    </h3>
                </div>

                {isMulti && (
                    <div className="mt-6 flex justify-center gap-2">
                        {videos.map((video, index) => {
                            const src = getVideoSrc(video);
                            return (
                                <button
                                    key={src || index}
                                    type="button"
                                    aria-label={`Go to ${video.title}`}
                                    onClick={() => goTo(index)}
                                    className={`h-2.5 rounded-full transition-all ${
                                        index === safeCurrentIndex
                                            ? 'w-8 bg-gold'
                                            : 'w-2.5 bg-white/40 hover:bg-white/70'
                                    }`}
                                />
                            );
                        })}
                    </div>
                )}
            </Container>
        </Section>
    );
}

export { KiblawanVideos as KiblawanHymn };
