import { Head } from '@inertiajs/react';
import BidController from '@/actions/App/Http/Controllers/Admin/BidController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import BidForm from '@/pages/admin/bids/components/bid-form';

export default function CreateBid() {
    return (
        <>
            <Head title="Create Bid" />
            <AdminFormPage
                title="Create Bid"
                description="Add a bid notice or award."
                backHref={BidController.index.url()}
                backLabel="Bids"
            >
                <BidForm
                    onSubmit={(form) => form.post(BidController.store.url())}
                    submitLabel="Create Bid"
                />
            </AdminFormPage>
        </>
    );
}
