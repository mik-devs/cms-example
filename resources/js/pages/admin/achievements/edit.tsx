import { Head } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/AchievementController';
import type { Achievement } from '@/types';
import AchievementForm from '@/pages/admin/achievements/components/achievement-form';

export default function EditAchievement({
    achievement,
}: {
    achievement: Achievement;
}) {
    return (
        <>
            <Head title={`Edit ${achievement.title}`} />
            <AchievementForm
                title="Edit Achievement"
                backHref={index.url()}
                initialValues={achievement}
                onSubmit={(form) =>
                    form.put(update.url({ achievement: achievement.id }))
                }
                submitLabel="Save Changes"
            />
        </>
    );
}
