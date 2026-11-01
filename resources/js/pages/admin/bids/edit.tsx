import { Head, Link } from '@inertiajs/react';
import BidController from '@/actions/App/Http/Controllers/Admin/BidController';
import Heading from '@/components/heading';
import BidForm from '@/pages/admin/bids/components/bid-form';
import type { Bid } from '@/types';

export default function EditBid({ bid }: { bid: Bid }) {
    return (
        <>
            <Head title={`Edit ${bid.title}`} />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading title="Edit Bid" description={`Update “${bid.title}”.`} />
                    <Link
                        href={BidController.index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Bids
                    </Link>
                </div>
                <BidForm
                    initialValues={bid}
                    onSubmit={(form) => form.put(BidController.update.url(bid.id))}
                    submitLabel="Save Changes"
                />
            </div>
        </>
    );
}
