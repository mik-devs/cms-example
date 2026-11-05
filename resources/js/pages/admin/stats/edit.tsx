import { Head } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/StatController';
import StatForm from '@/pages/admin/stats/components/stat-form';
import type { Stat } from '@/types';

export default function EditStat({ stat }: { stat: Stat }) {
    return (
        <>
            <Head title={`Edit ${stat.label}`} />
            <StatForm
                title="Edit Stat"
                backHref={index.url()}
                initialValues={stat}
                onSubmit={(form) => form.put(update.url({ stat: stat.id }))}
                submitLabel="Save Changes"
            />
        </>
    );
}