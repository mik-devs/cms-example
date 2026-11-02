import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/BarangayController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import BarangayForm from '@/pages/admin/barangays/components/barangay-form';

export default function CreateBarangay() {
    return (
        <>
            <Head title="Create Barangay" />
            <AdminFormPage
                title="Create Barangay"
                description="Add a barangay profile."
                backHref={index.url()}
                backLabel="Barangays"
            >
                <BarangayForm
                    onSubmit={(form) => form.post(store.url())}
                    submitLabel="Create Barangay"
                />
            </AdminFormPage>
        </>
    );
}
