import { Head } from '@inertiajs/react';
import OfficeController from '@/actions/App/Http/Controllers/Admin/OfficeController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import OfficeForm from '@/pages/admin/offices/components/office-form';

export default function CreateOffice() {
    return (
        <>
            <Head title="Create Office" />
            <AdminFormPage
                title="Create Office"
                description="Add a municipal office to the public directory."
                backHref={OfficeController.index.url()}
                backLabel="Office Directories"
            >
                <OfficeForm
                    onSubmit={(form) => form.post(OfficeController.store.url())}
                    submitLabel="Create Office"
                />
            </AdminFormPage>
        </>
    );
}
