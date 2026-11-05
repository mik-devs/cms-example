import { Head } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/ServiceController';
import type { Service } from '@/types';
import ServiceForm from '@/pages/admin/services/components/service-form';

export default function EditService({ service }: { service: Service }) {
    return (
        <>
            <Head title={`Edit ${service.title}`} />
            <ServiceForm
                title="Edit Service"
                backHref={index.url()}
                initialValues={service}
                onSubmit={(form) =>
                    form.put(update.url({ service: service.id }))
                }
                submitLabel="Save Changes"
            />
        </>
    );
}