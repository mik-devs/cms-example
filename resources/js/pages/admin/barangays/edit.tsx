import { Head } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/BarangayController';
import type { Barangay } from '@/types';
import BarangayForm from '@/pages/admin/barangays/components/barangay-form';

export default function EditBarangay({ barangay }: { barangay: Barangay }) {
    return (
        <>
            <Head title={`Edit ${barangay.name}`} />
            <BarangayForm
                title="Edit Barangay"
                backHref={index.url()}
                initialValues={barangay}
                onSubmit={(form) =>
                    form.put(update.url({ barangay: barangay.id }))
                }
                submitLabel="Save Changes"
            />
        </>
    );
}