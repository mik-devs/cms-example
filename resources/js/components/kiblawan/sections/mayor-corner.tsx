import { useState } from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/use-in-view';
import { Container } from '@/components/kiblawan/ui/container';
import { Headline } from '@/components/kiblawan/ui/headline';
import { JobCard } from '@/components/kiblawan/ui/job-card';
import { Section } from '@/components/kiblawan/ui/section';
import type { JobPosting, MayorMessage } from '@/types';

const tabs = ['Photo Release', 'Speeches', 'Achievements', 'Gallery'] as const;

type MayorTab = (typeof tabs)[number];

const messageTypes: Record<MayorTab, MayorMessage['type']> = {
    'Photo Release': 'photo_release',
    Speeches: 'speech',
    Achievements: 'achievement',
    Gallery: 'gallery',
};

export function MayorCorner({
    messages,
    jobs,
}: {
    messages: MayorMessage[];
    jobs: JobPosting[];
}) {
    const [activeTab, setActiveTab] = useState<MayorTab>('Photo Release');
    const { ref: leftRef, inView: leftInView } = useInView<HTMLDivElement>();
    const { ref: rightRef, inView: rightInView } = useInView<HTMLDivElement>();

    const featuredMessage = messages.filter(
        (message) => message.type === messageTypes[activeTab],
    )[0];

    return (
        <Section id="mayor-corner" className="overflow-hidden bg-paper">
            <Container>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div
                        ref={leftRef}
                        className={cn(
                            'lg:col-span-8',
                            'slide-in-left',
                            leftInView && 'is-visible',
                        )}
                    >
                        <Headline title={"Mayor's Corner"} />

                        <div className="flex h-full flex-col overflow-hidden rounded-[24px] border border-line-soft bg-white/85 shadow-k-card backdrop-blur-[14px] backdrop-saturate-150">
                            <div className="relative">
                                <img
                                    src={
                                        featuredMessage?.image_url ??
                                        '/images/mayor/mayor.jpg'
                                    }
                                    alt={
                                        featuredMessage?.title ??
                                        "Mayor's Corner"
                                    }
                                    className="h-[400px] w-full bg-cream object-contain"
                                    onError={(event) => {
                                        event.currentTarget.src =
                                            '/images/mayor/mayor.jpg';
                                    }}
                                />
                                <div className="absolute top-4 right-4 z-10 flex gap-2">
                                    <a
                                        href="https://www.facebook.com/p/Carl-Jason-Rama-61570573016071/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex size-10 items-center justify-center rounded-full bg-white/80 text-forest shadow-k-card backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-gold hover:text-maroon-dark"
                                        aria-label="Mayor's Facebook"
                                    >
                                        <Facebook className="size-5" />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/carljasonrama/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex size-10 items-center justify-center rounded-full bg-white/80 text-forest shadow-k-card backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-gold hover:text-maroon-dark"
                                        aria-label="Mayor's Instagram"
                                    >
                                        <Instagram className="size-5" />
                                    </a>
                                </div>
                            </div>

                            <div className="p-5">
                                {featuredMessage ? (
                                    <h3 className="mb-4 font-display text-xl font-bold text-forest">
                                        {featuredMessage.title}
                                    </h3>
                                ) : (
                                    <p className="mb-4 text-sm text-ink-muted">
                                        No {activeTab.toLowerCase()} are
                                        available yet.
                                    </p>
                                )}
                                <div className="flex border-b border-line-soft">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab}
                                            type="button"
                                            onClick={() => setActiveTab(tab)}
                                            className={cn(
                                                'flex-1 border-b-2 px-2.5 py-4 text-[0.85rem] font-extrabold transition-all',
                                                activeTab === tab
                                                    ? 'border-gold text-forest'
                                                    : 'border-transparent text-ink-muted hover:bg-green/5 hover:text-green-600',
                                            )}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        ref={rightRef}
                        className={cn(
                            'lg:col-span-4',
                            'slide-in-right',
                            rightInView && 'is-visible',
                        )}
                    >
                        <Headline
                            title="Latest Jobs"
                            action={{ label: 'More →', href: '/careers' }}
                        />

                        <div className="flex h-full flex-col gap-4 rounded-[24px] border border-line-soft bg-white/85 p-6 shadow-k-card backdrop-blur-[14px]">
                            {jobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
