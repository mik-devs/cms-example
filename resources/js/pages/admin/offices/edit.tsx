import { Head } from '@inertiajs/react';
import OfficeController from '@/actions/App/Http/Controllers/Admin/OfficeController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import OfficeForm from '@/pages/admin/offices/components/office-form';
import type { Office } from '@/types';

export default function EditOffice({ office }: { office: Office }) {
    return (
        <>
            <Head title={`Edit ${office.name}`} />
            <AdminFormPage
                title="Edit Office"
                description={`Update ${office.name}.`}
                backHref={OfficeController.index.url()}
                backLabel="Office Directories"
            >
                <OfficeForm
                    initialValues={office}
                    onSubmit={(form) =>
                        form.put(OfficeController.update.url(office.id))
                    }
                    submitLabel="Save Changes"
                />
            </AdminFormPage>
        </>
    );
}
