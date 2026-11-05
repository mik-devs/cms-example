import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/AchievementController';
import AchievementForm from '@/pages/admin/achievements/components/achievement-form';

export default function CreateAchievement() {
    return (
        <>
            <Head title="Create Achievement" />
            <AchievementForm
                title="Create Achievement"
                backHref={index.url()}
                onSubmit={(form) => form.post(store.url())}
                submitLabel="Create Achievement"
            />
        </>
    );
}
