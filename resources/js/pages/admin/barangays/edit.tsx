import { Head } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/BarangayController';
import type { Barangay } from '@/types';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import BarangayForm from '@/pages/admin/barangays/components/barangay-form';

export default function EditBarangay({ barangay }: { barangay: Barangay }) {
    return (
        <>
            <Head title={`Edit ${barangay.name}`} />
            <AdminFormPage
                title="Edit Barangay"
                description={`Update “${barangay.name}”.`}
                backHref={index.url()}
                backLabel="Barangays"
            >
                <BarangayForm
                    initialValues={barangay}
                    onSubmit={(form) =>
                        form.put(update.url({ barangay: barangay.id }))
                    }
                    submitLabel="Save Changes"
                />
            </AdminFormPage>
        </>
    );
}
