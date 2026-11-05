import { Head } from '@inertiajs/react';
import OfficeController from '@/actions/App/Http/Controllers/Admin/OfficeController';
import OfficeForm from '@/pages/admin/offices/components/office-form';

export default function CreateOffice() {
    return (
        <>
            <Head title="Create Office" />
            <OfficeForm
                title="Create Office"
                backHref={OfficeController.index.url()}
                onSubmit={(form) => form.post(OfficeController.store.url())}
                submitLabel="Create Office"
            />
        </>
    );
}