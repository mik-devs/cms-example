import { Head, Link } from '@inertiajs/react';
import MayorMessageController from '@/actions/App/Http/Controllers/Admin/MayorMessageController';
import Heading from '@/components/heading';
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
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Edit Mayor Message"
                        description={`Update “${mayorMessage.title}”.`}
                    />
                    <Link
                        href={MayorMessageController.index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Mayor's Corner
                    </Link>
                </div>
                <MayorMessageForm
                    initialValues={mayorMessage}
                    onSubmit={(form) =>
                        form.put(
                            MayorMessageController.update.url(mayorMessage.id),
                        )
                    }
                    submitLabel="Save Changes"
                />
            </div>
        </>
    );
}
