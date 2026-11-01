import { Head, Link } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/BarangayController';
import type { Barangay } from '@/types';
import Heading from '@/components/heading';
import BarangayForm from '@/pages/admin/barangays/components/barangay-form';

export default function EditBarangay({ barangay }: { barangay: Barangay }) {
    return (
        <>
            <Head title={`Edit ${barangay.name}`} />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Edit Barangay"
                        description={`Update “${barangay.name}”.`}
                    />
                    <Link
                        href={index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Barangays
                    </Link>
                </div>
                <BarangayForm
                    initialValues={barangay}
                    onSubmit={(form) =>
                        form.put(update.url({ barangay: barangay.id }))
                    }
                    submitLabel="Save Changes"
                />
            </div>
        </>
    );
}
