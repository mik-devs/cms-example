import { Head, Link } from '@inertiajs/react';
import OfficialController from '@/actions/App/Http/Controllers/Admin/OfficialController';
import Heading from '@/components/heading';
import OfficialForm from '@/pages/admin/officials/components/official-form';

export default function CreateOfficial() {
    return (
        <>
            <Head title="Create Official" />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Create Official"
                        description="Add a municipal official."
                    />
                    <Link
                        href={OfficialController.index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Officials
                    </Link>
                </div>
                <OfficialForm
                    onSubmit={(form) => form.post(OfficialController.store.url())}
                    submitLabel="Create Official"
                />
            </div>
        </>
    );
}
