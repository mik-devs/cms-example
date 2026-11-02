import { Head } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/TourismController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import TourismForm from '@/pages/admin/tourism/components/tourism-form';
import type { TourismSpot } from '@/types';

export default function EditTourismSpot({
    tourismSpot,
}: {
    tourismSpot: TourismSpot;
}) {
    return (
        <>
            <Head title={`Edit ${tourismSpot.name}`} />
            <AdminFormPage
                title="Edit Tourism Spot"
                description={`Update ${tourismSpot.name}.`}
                backHref={index.url()}
                backLabel="Tourism"
            >
                <TourismForm
                    initialValues={tourismSpot}
                    onSubmit={(form) =>
                        form.put(update.url({ tourism: tourismSpot.id }))
                    }
                    submitLabel="Save Changes"
                />
            </AdminFormPage>
        </>
    );
}
