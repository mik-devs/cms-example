import { Head } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/StatController';
import type { Stat } from '@/types';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import StatForm from '@/pages/admin/stats/components/stat-form';

export default function EditStat({ stat }: { stat: Stat }) {
    return (
        <>
            <Head title={`Edit ${stat.label}`} />
            <AdminFormPage
                title="Edit Stat"
                description={`Update “${stat.label}”.`}
                backHref={index.url()}
                backLabel="Stats"
            >
                <StatForm
                    initialValues={stat}
                    onSubmit={(form) => form.put(update.url({ stat: stat.id }))}
                    submitLabel="Save Changes"
                />
            </AdminFormPage>
        </>
    );
}
