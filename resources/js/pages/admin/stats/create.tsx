import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/StatController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import StatForm from '@/pages/admin/stats/components/stat-form';

export default function CreateStat() {
    return (
        <>
            <Head title="Create Stat" />
            <AdminFormPage
                title="Create Stat"
                description="Add a figure to the home page statistics."
                backHref={index.url()}
                backLabel="Stats"
            >
                <StatForm
                    onSubmit={(form) => form.post(store.url())}
                    submitLabel="Create Stat"
                />
            </AdminFormPage>
        </>
    );
}
