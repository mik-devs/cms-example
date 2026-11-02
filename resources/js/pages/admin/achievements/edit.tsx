import { Head } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/AchievementController';
import type { Achievement } from '@/types';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import AchievementForm from '@/pages/admin/achievements/components/achievement-form';

export default function EditAchievement({
    achievement,
}: {
    achievement: Achievement;
}) {
    return (
        <>
            <Head title={`Edit ${achievement.title}`} />
            <AdminFormPage
                title="Edit Achievement"
                description={`Update “${achievement.title}”.`}
                backHref={index.url()}
                backLabel="Achievements"
            >
                <AchievementForm
                    initialValues={achievement}
                    onSubmit={(form) =>
                        form.put(update.url({ achievement: achievement.id }))
                    }
                    submitLabel="Save Changes"
                />
            </AdminFormPage>
        </>
    );
}
