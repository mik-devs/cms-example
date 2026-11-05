import { Head } from '@inertiajs/react';
import type { Official } from '@/types';
import OfficialController from '@/actions/App/Http/Controllers/Admin/OfficialController';
import OfficialForm from '@/pages/admin/officials/components/official-form';

export default function EditOfficial({ official }: { official: Official }) {
    return (
        <>
            <Head title={`Edit ${official.name}`} />
            <OfficialForm
                title="Edit Official"
                backHref={OfficialController.index.url()}
                initialValues={official}
                onSubmit={(form) =>
                    form.put(OfficialController.update.url(official.id))
                }
                submitLabel="Save Changes"
            />
        </>
    );
}