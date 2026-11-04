import { Container } from '@/components/kiblawan/ui/container';
import { AchievementCard } from '@/components/kiblawan/ui/achievement-card';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';
import type { Achievement } from '@/types';

export default function AchievementsIndex({
    achievements,
}: {
    achievements: Achievement[];
}) {
    return (
        <PublicLayout title="Achievements | Municipality of Kiblawan">
            <PageHeader
                title="Achievements"
                subtitle="Recognition, milestones, and awards earned by the Municipality of Kiblawan."
            />

            <Section className="bg-cream py-14 md:py-18">
                <Container>
                    {achievements.length === 0 ? (
                        <div className="rounded-[24px] border border-line bg-white p-10 text-center text-ink-muted shadow-sm">
                            No achievements are available yet.
                        </div>
                    ) : (
                        <>
                            <p className="mb-8 max-w-3xl text-lg leading-relaxed text-ink-muted">
                                Explore the recognitions that reflect
                                Kiblawan&apos;s commitment to good governance,
                                community welfare, and sustainable progress.
                            </p>
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {achievements.map((achievement) => (
                                    <AchievementCard
                                        key={achievement.id}
                                        achievement={achievement}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </Container>
            </Section>
        </PublicLayout>
    );
}
