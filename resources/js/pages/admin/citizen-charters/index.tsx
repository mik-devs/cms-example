import { Head } from '@inertiajs/react';
import CitizenCharterController from '@/actions/App/Http/Controllers/Admin/CitizenCharterController';
import ResourceTable, {
    type ResourceTableColumn,
} from '@/pages/admin/components/resource-table';
import type { CitizenCharter } from '@/types';

interface PaginatedCitizenCharters {
    data: CitizenCharter[];
    links: { url: string | null; label: string; active: boolean }[];
}

export default function CitizenChartersIndex({
    citizenCharters,
}: {
    citizenCharters: PaginatedCitizenCharters;
}) {
    const columns: ResourceTableColumn<CitizenCharter>[] = [
        { label: 'Title', render: (charter) => charter.title },
        { label: 'Order', render: (charter) => charter.order },
        {
            label: 'Description',
            render: (charter) => charter.description ?? '—',
        },
        {
            label: 'Document',
            render: (charter) =>
                charter.file_url ? (
                    <a
                        href={charter.file_url}
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
            <Head title="Citizen's Charter" />
            <ResourceTable
                title="Citizen's Charter"
                description="Manage the official Citizen’s Charter documents."
                items={citizenCharters.data}
                links={citizenCharters.links}
                columns={columns}
                createHref={CitizenCharterController.create.url()}
                createLabel="Upload Document"
                editHref={(charter) =>
                    CitizenCharterController.edit.url(charter.id)
                }
                deleteHref={(charter) =>
                    CitizenCharterController.destroy.url(charter.id)
                }
                emptyMessage="No citizen charters have been uploaded yet."
            />
        </>
    );
}
