import { Head } from '@inertiajs/react';
import CitizenCharterController from '@/actions/App/Http/Controllers/Admin/CitizenCharterController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import CitizenCharterForm from '@/pages/admin/citizen-charters/components/citizen-charter-form';
import type { CitizenCharter } from '@/types';

export default function EditCitizenCharter({
    citizenCharter,
}: {
    citizenCharter: CitizenCharter;
}) {
    return (
        <>
            <Head title={`Edit ${citizenCharter.title}`} />
            <AdminFormPage
                title="Edit Citizen's Charter"
                description={`Update ${citizenCharter.title}.`}
                backHref={CitizenCharterController.index.url()}
                backLabel="Citizen's Charter"
            >
                <CitizenCharterForm
                    initialValues={citizenCharter}
                    onSubmit={(form) =>
                        form.put(
                            CitizenCharterController.update.url(
                                citizenCharter.id,
                            ),
                        )
                    }
                    submitLabel="Save Changes"
                />
            </AdminFormPage>
        </>
    );
}
