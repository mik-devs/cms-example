import { Head } from '@inertiajs/react';
import CitizenCharterController from '@/actions/App/Http/Controllers/Admin/CitizenCharterController';
import CitizenCharterForm from '@/pages/admin/citizen-charters/components/citizen-charter-form';

export default function CreateCitizenCharter() {
    return (
        <>
            <Head title="Create Citizen's Charter" />
            <CitizenCharterForm
                title="Create Citizen's Charter"
                backHref={CitizenCharterController.index.url()}
                onSubmit={(form) =>
                    form.post(CitizenCharterController.store.url())
                }
                submitLabel="Create Citizen's Charter"
            />
        </>
    );
}