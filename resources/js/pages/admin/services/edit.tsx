import { Head } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/ServiceController';
import type { Service } from '@/types';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import ServiceForm from '@/pages/admin/services/components/service-form';

export default function EditService({ service }: { service: Service }) {
    return (
        <>
            <Head title={`Edit ${service.title}`} />
            <AdminFormPage
                title="Edit Service"
                description={`Update “${service.title}”.`}
                backHref={index.url()}
                backLabel="Services"
            >
                <ServiceForm
                    initialValues={service}
                    onSubmit={(form) =>
                        form.put(update.url({ service: service.id }))
                    }
                    submitLabel="Save Changes"
                />
            </AdminFormPage>
        </>
    );
}
