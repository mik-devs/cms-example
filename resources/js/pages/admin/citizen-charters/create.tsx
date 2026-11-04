import { Head } from '@inertiajs/react';
import CitizenCharterController from '@/actions/App/Http/Controllers/Admin/CitizenCharterController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import CitizenCharterForm from '@/pages/admin/citizen-charters/components/citizen-charter-form';

export default function CreateCitizenCharter() {
    return (
        <>
            <Head title="Create Citizen's Charter" />
            <AdminFormPage
                title="Create Citizen's Charter"
                description="Add an official Citizen's Charter PDF to the public site."
                backHref={CitizenCharterController.index.url()}
                backLabel="Citizen's Charter"
            >
                <CitizenCharterForm
                    onSubmit={(form) =>
                        form.post(CitizenCharterController.store.url())
                    }
                    submitLabel="Create Citizen's Charter"
                />
            </AdminFormPage>
        </>
    );
}
