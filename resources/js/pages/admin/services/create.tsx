import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/ServiceController';
import ServiceForm from '@/pages/admin/services/components/service-form';

export default function CreateService() {
    return (
        <>
            <Head title="Create Service" />
            <ServiceForm
                title="Create Service"
                backHref={index.url()}
                onSubmit={(form) => form.post(store.url())}
                submitLabel="Create Service"
            />
        </>
    );
}