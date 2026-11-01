import { Head, Link } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/AchievementController';
import type { Achievement } from '@/types';
import Heading from '@/components/heading';
import AchievementForm from '@/pages/admin/achievements/components/achievement-form';

export default function EditAchievement({
    achievement,
}: {
    achievement: Achievement;
}) {
    return (
        <>
            <Head title={`Edit ${achievement.title}`} />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Edit Achievement"
                        description={`Update “${achievement.title}”.`}
                    />
                    <Link
                        href={index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Achievements
                    </Link>
                </div>
                <AchievementForm
                    initialValues={achievement}
                    onSubmit={(form) =>
                        form.put(update.url({ achievement: achievement.id }))
                    }
                    submitLabel="Save Changes"
                />
            </div>
        </>
    );
}
