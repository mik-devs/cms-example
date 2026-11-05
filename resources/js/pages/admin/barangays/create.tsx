import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/BarangayController';
import BarangayForm from '@/pages/admin/barangays/components/barangay-form';

export default function CreateBarangay() {
    return (
        <>
            <Head title="Create Barangay" />
            <BarangayForm
                title="Create Barangay"
                backHref={index.url()}
                onSubmit={(form) => form.post(store.url())}
                submitLabel="Create Barangay"
            />
        </>
    );
}