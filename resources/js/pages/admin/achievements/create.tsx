import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/AchievementController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import AchievementForm from '@/pages/admin/achievements/components/achievement-form';

export default function CreateAchievement() {
    return (
        <>
            <Head title="Create Achievement" />
            <AdminFormPage
                title="Create Achievement"
                description="Add an achievement to the public site."
                backHref={index.url()}
                backLabel="Achievements"
            >
                <AchievementForm
                    onSubmit={(form) => form.post(store.url())}
                    submitLabel="Create Achievement"
                />
            </AdminFormPage>
        </>
    );
}
