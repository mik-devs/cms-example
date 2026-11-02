import { Head } from '@inertiajs/react';
import BidController from '@/actions/App/Http/Controllers/Admin/BidController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import BidForm from '@/pages/admin/bids/components/bid-form';
import type { Bid } from '@/types';

export default function EditBid({ bid }: { bid: Bid }) {
    return (
        <>
            <Head title={`Edit ${bid.title}`} />
            <AdminFormPage
                title="Edit Bid"
                description={`Update “${bid.title}”.`}
                backHref={BidController.index.url()}
                backLabel="Bids"
            >
                <BidForm
                    initialValues={bid}
                    onSubmit={(form) =>
                        form.put(BidController.update.url(bid.id))
                    }
                    submitLabel="Save Changes"
                />
            </AdminFormPage>
        </>
    );
}
