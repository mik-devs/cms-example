import { Head, Link } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/StatController';
import type { Stat } from '@/types';
import Heading from '@/components/heading';
import StatForm from '@/pages/admin/stats/components/stat-form';

export default function EditStat({ stat }: { stat: Stat }) {
    return (
        <>
            <Head title={`Edit ${stat.label}`} />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Edit Stat"
                        description={`Update “${stat.label}”.`}
                    />
                    <Link
                        href={index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Stats
                    </Link>
                </div>
                <StatForm
                    initialValues={stat}
                    onSubmit={(form) => form.put(update.url({ stat: stat.id }))}
                    submitLabel="Save Changes"
                />
            </div>
        </>
    );
}
