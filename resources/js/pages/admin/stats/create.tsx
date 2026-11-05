import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/StatController';
import StatForm from '@/pages/admin/stats/components/stat-form';

export default function CreateStat() {
    return (
        <>
            <Head title="Create Stat" />
            <StatForm
                title="Create Stat"
                backHref={index.url()}
                onSubmit={(form) => form.post(store.url())}
                submitLabel="Create Stat"
            />
        </>
    );
}