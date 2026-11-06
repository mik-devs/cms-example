import { Head } from '@inertiajs/react';
import OfficialController from '@/actions/App/Http/Controllers/Admin/OfficialController';
import ResourceTable, {
    type ResourceTableColumn,
} from '@/pages/admin/components/resource-table';
import type { Official } from '@/types';

interface PaginatedOfficials {
    data: Official[];
    links: { url: string | null; label: string; active: boolean }[];
}

export default function OfficialsIndex({
    officials,
}: {
    officials: PaginatedOfficials;
}) {
    const columns: ResourceTableColumn<Official>[] = [
        { label: 'Name', render: (official) => official.name },
        { label: 'Position', render: (official) => official.position },
        { label: 'Order', render: (official) => official.order },
    ];

    return (
        <>
            <Head title="Officials" />
            <ResourceTable
                title="Officials"
                description="Manage municipal officials and their display order."
                items={officials.data}
                links={officials.links}
                columns={columns}
                createHref={OfficialController.create.url()}
                createLabel="Add Official"
                editHref={(official) =>
                    OfficialController.edit.url(official.id)
                }
                deleteHref={(official) =>
                    OfficialController.destroy.url(official.id)
                }
                getItemLabel={(official) => official.name}
                emptyMessage="No officials have been added yet."
            />
        </>
    );
}
