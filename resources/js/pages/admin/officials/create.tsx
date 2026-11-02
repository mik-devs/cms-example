import { Head } from '@inertiajs/react';
import OfficialController from '@/actions/App/Http/Controllers/Admin/OfficialController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import OfficialForm from '@/pages/admin/officials/components/official-form';

export default function CreateOfficial() {
    return (
        <>
            <Head title="Create Official" />
            <AdminFormPage
                title="Create Official"
                description="Add a municipal official."
                backHref={OfficialController.index.url()}
                backLabel="Officials"
            >
                <OfficialForm
                    onSubmit={(form) =>
                        form.post(OfficialController.store.url())
                    }
                    submitLabel="Create Official"
                />
            </AdminFormPage>
        </>
    );
}
