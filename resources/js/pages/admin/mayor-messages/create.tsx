import { Head } from '@inertiajs/react';
import MayorMessageController from '@/actions/App/Http/Controllers/Admin/MayorMessageController';
import MayorMessageForm from '@/pages/admin/mayor-messages/components/mayor-message-form';

export default function CreateMayorMessage() {
    return (
        <>
            <Head title="Create Mayor Message" />
            <MayorMessageForm
                title="Create Mayor Message"
                backHref={MayorMessageController.index.url()}
                onSubmit={(form) =>
                    form.post(MayorMessageController.store.url())
                }
                submitLabel="Create Message"
            />
        </>
    );
}
