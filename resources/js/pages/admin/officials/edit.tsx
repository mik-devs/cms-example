import { Head, Link } from '@inertiajs/react';
import OfficialController from '@/actions/App/Http/Controllers/Admin/OfficialController';
import Heading from '@/components/heading';
import OfficialForm from '@/pages/admin/officials/components/official-form';
import type { Official } from '@/types';

export default function EditOfficial({ official }: { official: Official }) {
    return (
        <>
            <Head title={`Edit ${official.name}`} />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Edit Official"
                        description={`Update “${official.name}”.`}
                    />
                    <Link
                        href={OfficialController.index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Officials
                    </Link>
                </div>
                <OfficialForm
                    initialValues={official}
                    onSubmit={(form) =>
                        form.put(OfficialController.update.url(official.id))
                    }
                    submitLabel="Save Changes"
                />
            </div>
        </>
    );
}
