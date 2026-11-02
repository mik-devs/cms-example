import { Head } from '@inertiajs/react';
import MayorMessageController from '@/actions/App/Http/Controllers/Admin/MayorMessageController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import MayorMessageForm from '@/pages/admin/mayor-messages/components/mayor-message-form';
import type { MayorMessage } from '@/types';

export default function EditMayorMessage({
    mayorMessage,
}: {
    mayorMessage: MayorMessage;
}) {
    return (
        <>
            <Head title={`Edit ${mayorMessage.title}`} />
            <AdminFormPage
                title="Edit Mayor Message"
                description={`Update “${mayorMessage.title}”.`}
                backHref={MayorMessageController.index.url()}
                backLabel="Mayor's Corner"
            >
                <MayorMessageForm
                    initialValues={mayorMessage}
                    onSubmit={(form) =>
                        form.put(
                            MayorMessageController.update.url(mayorMessage.id),
                        )
                    }
                    submitLabel="Save Changes"
                />
            </AdminFormPage>
        </>
    );
}
