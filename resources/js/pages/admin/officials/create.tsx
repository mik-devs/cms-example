import { Head } from '@inertiajs/react';
import OfficialController from '@/actions/App/Http/Controllers/Admin/OfficialController';
import OfficialForm from '@/pages/admin/officials/components/official-form';

export default function CreateOfficial() {
    return (
        <>
            <Head title="Create Official" />
            <OfficialForm
                title="Create Official"
                backHref={OfficialController.index.url()}
                onSubmit={(form) => form.post(OfficialController.store.url())}
                submitLabel="Create Official"
            />
        </>
    );
}