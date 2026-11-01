import { Head, Link } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/AchievementController';
import Heading from '@/components/heading';
import AchievementForm from '@/pages/admin/achievements/components/achievement-form';

export default function CreateAchievement() {
    return (
        <>
            <Head title="Create Achievement" />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Create Achievement"
                        description="Add an achievement to the public site."
                    />
                    <Link
                        href={index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Achievements
                    </Link>
                </div>
                <AchievementForm
                    onSubmit={(form) => form.post(store.url())}
                    submitLabel="Create Achievement"
                />
            </div>
        </>
    );
}
