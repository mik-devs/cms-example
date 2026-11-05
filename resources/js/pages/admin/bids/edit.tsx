import { Head } from '@inertiajs/react';
import BidController from '@/actions/App/Http/Controllers/Admin/BidController';
import BidForm from '@/pages/admin/bids/components/bid-form';
import type { Bid } from '@/types';

export default function EditBid({ bid }: { bid: Bid }) {
    return (
        <>
            <Head title={`Edit ${bid.title}`} />
            <BidForm
                title="Edit Bid"
                backHref={BidController.index.url()}
                initialValues={bid}
                onSubmit={(form) =>
                    form.put(BidController.update.url(bid.id))
                }
                submitLabel="Save Changes"
            />
        </>
    );
}
