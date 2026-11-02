import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/ServiceController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import ServiceForm from '@/pages/admin/services/components/service-form';

export default function CreateService() {
    return (
        <>
            <Head title="Create Service" />
            <AdminFormPage
                title="Create Service"
                description="Add a service to the public services page."
                backHref={index.url()}
                backLabel="Services"
            >
                <ServiceForm
                    onSubmit={(form) => form.post(store.url())}
                    submitLabel="Create Service"
                />
            </AdminFormPage>
        </>
    );
}
