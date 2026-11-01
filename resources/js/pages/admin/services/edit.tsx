import { Head, Link } from '@inertiajs/react';
import { index, update } from '@/actions/App/Http/Controllers/Admin/ServiceController';
import type { Service } from '@/types';
import Heading from '@/components/heading';
import ServiceForm from '@/pages/admin/services/components/service-form';

export default function EditService({ service }: { service: Service }) {
    return (
        <>
            <Head title={`Edit ${service.title}`} />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Edit Service"
                        description={`Update “${service.title}”.`}
                    />
                    <Link
                        href={index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Services
                    </Link>
                </div>
                <ServiceForm
                    initialValues={service}
                    onSubmit={(form) =>
                        form.put(update.url({ service: service.id }))
                    }
                    submitLabel="Save Changes"
                />
            </div>
        </>
    );
}
