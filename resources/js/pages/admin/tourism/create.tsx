import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/TourismController';
import TourismForm from '@/pages/admin/tourism/components/tourism-form';

export default function CreateTourismSpot() {
    return (
        <>
            <Head title="Create Tourism Spot" />
            <TourismForm
                title="Create Tourism Spot"
                backHref={index.url()}
                onSubmit={(form) => form.post(store.url())}
                submitLabel="Create Tourism Spot"
            />
        </>
    );
}
