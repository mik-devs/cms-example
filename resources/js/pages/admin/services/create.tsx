import { Head, Link } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Controllers/Admin/ServiceController';
import Heading from '@/components/heading';
import ServiceForm from '@/pages/admin/services/components/service-form';
import { index } from '@/actions/App/Http/Controllers/Admin/ServiceController';

export default function CreateService() {
    return (
        <>
            <Head title="Create Service" />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Create Service"
                        description="Add a service to the public services page."
                    />
                    <Link
                        href={index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Services
                    </Link>
                </div>
                <ServiceForm
                    onSubmit={(form) => form.post(store.url())}
                    submitLabel="Create Service"
                />
            </div>
        </>
    );
}
