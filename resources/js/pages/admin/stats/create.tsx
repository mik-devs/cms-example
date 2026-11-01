import { Head, Link } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/StatController';
import Heading from '@/components/heading';
import StatForm from '@/pages/admin/stats/components/stat-form';

export default function CreateStat() {
    return (
        <>
            <Head title="Create Stat" />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Create Stat"
                        description="Add a figure to the home page statistics."
                    />
                    <Link
                        href={index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Stats
                    </Link>
                </div>
                <StatForm
                    onSubmit={(form) => form.post(store.url())}
                    submitLabel="Create Stat"
                />
            </div>
        </>
    );
}
