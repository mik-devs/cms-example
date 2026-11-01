import { Head, Link } from '@inertiajs/react';
import BidController from '@/actions/App/Http/Controllers/Admin/BidController';
import Heading from '@/components/heading';
import BidForm from '@/pages/admin/bids/components/bid-form';

export default function CreateBid() {
    return (
        <>
            <Head title="Create Bid" />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading title="Create Bid" description="Add a bid notice or award." />
                    <Link
                        href={BidController.index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Bids
                    </Link>
                </div>
                <BidForm
                    onSubmit={(form) => form.post(BidController.store.url())}
                    submitLabel="Create Bid"
                />
            </div>
        </>
    );
}
