import { Head } from '@inertiajs/react';
import MayorMessageController from '@/actions/App/Http/Controllers/Admin/MayorMessageController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import MayorMessageForm from '@/pages/admin/mayor-messages/components/mayor-message-form';

export default function CreateMayorMessage() {
    return (
        <>
            <Head title="Create Mayor Message" />
            <AdminFormPage
                title="Create Mayor Message"
                description="Add content to the Mayor's Corner."
                backHref={MayorMessageController.index.url()}
                backLabel="Mayor's Corner"
            >
                <MayorMessageForm
                    onSubmit={(form) =>
                        form.post(MayorMessageController.store.url())
                    }
                    submitLabel="Create Message"
                />
            </AdminFormPage>
        </>
    );
}
