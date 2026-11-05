import { Head } from '@inertiajs/react';
import BidController from '@/actions/App/Http/Controllers/Admin/BidController';
import BidForm from '@/pages/admin/bids/components/bid-form';

export default function CreateBid() {
    return (
        <>
            <Head title="Create Bid" />
            <BidForm
                title="Create Bid"
                backHref={BidController.index.url()}
                onSubmit={(form) => form.post(BidController.store.url())}
                submitLabel="Create Bid"
            />
        </>
    );
}
