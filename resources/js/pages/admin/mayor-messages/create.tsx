import { Head, Link } from '@inertiajs/react';
import MayorMessageController from '@/actions/App/Http/Controllers/Admin/MayorMessageController';
import Heading from '@/components/heading';
import MayorMessageForm from '@/pages/admin/mayor-messages/components/mayor-message-form';

export default function CreateMayorMessage() {
    return (
        <>
            <Head title="Create Mayor Message" />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Create Mayor Message"
                        description="Add content to the Mayor's Corner."
                    />
                    <Link
                        href={MayorMessageController.index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Mayor's Corner
                    </Link>
                </div>
                <MayorMessageForm
                    onSubmit={(form) => form.post(MayorMessageController.store.url())}
                    submitLabel="Create Message"
                />
            </div>
        </>
    );
}
