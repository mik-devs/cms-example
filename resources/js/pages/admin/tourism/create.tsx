import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/TourismController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import TourismForm from '@/pages/admin/tourism/components/tourism-form';

export default function CreateTourismSpot() {
    return (
        <>
            <Head title="Create Tourism Spot" />
            <AdminFormPage
                title="Create Tourism Spot"
                description="Add a tourist destination to the public site."
                backHref={index.url()}
                backLabel="Tourism"
            >
                <TourismForm
                    onSubmit={(form) => form.post(store.url())}
                    submitLabel="Create Tourism Spot"
                />
            </AdminFormPage>
        </>
    );
}
