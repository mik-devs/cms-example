import { Head } from '@inertiajs/react';
import OfficeController from '@/actions/App/Http/Controllers/Admin/OfficeController';
import OfficeForm from '@/pages/admin/offices/components/office-form';
import type { Office } from '@/types';

export default function EditOffice({ office }: { office: Office }) {
    return (
        <>
            <Head title={`Edit ${office.name}`} />
            <OfficeForm
                title="Edit Office"
                backHref={OfficeController.index.url()}
                initialValues={office}
                onSubmit={(form) =>
                    form.put(OfficeController.update.url(office.id))
                }
                submitLabel="Save Changes"
            />
        </>
    );
}