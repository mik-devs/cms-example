import { Head } from '@inertiajs/react';
import BidController from '@/actions/App/Http/Controllers/Admin/BidController';
import ResourceTable, {
    type ResourceTableColumn,
} from '@/pages/admin/components/resource-table';
import type { Bid } from '@/types';

interface PaginatedBids {
    data: Bid[];
    links: { url: string | null; label: string; active: boolean }[];
}

export default function BidsIndex({ bids }: { bids: PaginatedBids }) {
    const columns: ResourceTableColumn<Bid>[] = [
        { label: 'Title', render: (bid) => bid.title },
        { label: 'Date Posted', render: (bid) => bid.date_posted.slice(0, 10) },
        { label: 'Status', render: (bid) => bid.status },
        {
            label: 'Document',
            render: (bid) =>
                bid.pdf_url ? (
                    <a
                        href={bid.pdf_url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                    >
                        View PDF
                    </a>
                ) : (
                    'No document'
                ),
        },
    ];

    return (
        <>
            <Head title="Bids & Awards" />
            <ResourceTable
                title="Bids"
                description="Manage bid notices and awards."
                items={bids.data}
                links={bids.links}
                columns={columns}
                createHref={BidController.create.url()}
                createLabel="Add Bid"
                editHref={(bid) => BidController.edit.url(bid.id)}
                deleteHref={(bid) => BidController.destroy.url(bid.id)}
                emptyMessage="No bids have been added yet."
            />
        </>
    );
}
