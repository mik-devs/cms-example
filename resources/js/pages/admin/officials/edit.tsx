import { Head } from '@inertiajs/react';
import OfficialController from '@/actions/App/Http/Controllers/Admin/OfficialController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import OfficialForm from '@/pages/admin/officials/components/official-form';
import type { Official } from '@/types';

export default function EditOfficial({ official }: { official: Official }) {
    return (
        <>
            <Head title={`Edit ${official.name}`} />
            <AdminFormPage
                title="Edit Official"
                description={`Update “${official.name}”.`}
                backHref={OfficialController.index.url()}
                backLabel="Officials"
            >
                <OfficialForm
                    initialValues={official}
                    onSubmit={(form) =>
                        form.put(OfficialController.update.url(official.id))
                    }
                    submitLabel="Save Changes"
                />
            </AdminFormPage>
        </>
    );
}
