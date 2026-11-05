import { Head } from '@inertiajs/react';
import CitizenCharterController from '@/actions/App/Http/Controllers/Admin/CitizenCharterController';
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
            <CitizenCharterForm
                title="Edit Citizen's Charter"
                backHref={CitizenCharterController.index.url()}
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
        </>
    );
}