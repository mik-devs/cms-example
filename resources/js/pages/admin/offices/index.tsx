import { Head } from '@inertiajs/react';
import OfficeController from '@/actions/App/Http/Controllers/Admin/OfficeController';
import ResourceTable, {
    type ResourceTableColumn,
} from '@/pages/admin/components/resource-table';
import type { Office } from '@/types';

interface PaginatedOffices {
    data: Office[];
    links: { url: string | null; label: string; active: boolean }[];
}

export default function OfficesIndex({
    offices,
}: {
    offices: PaginatedOffices;
}) {
    const columns: ResourceTableColumn<Office>[] = [
        { label: 'Office Name', render: (office) => office.name },
        { label: 'Head', render: (office) => office.head ?? '—' },
        { label: 'Contact', render: (office) => office.contact_number ?? '—' },
        { label: 'Email', render: (office) => office.email ?? '—' },
        { label: 'Location', render: (office) => office.location ?? '—' },
        { label: 'Order', render: (office) => office.order },
        {
            label: 'Active',
            render: (office) => (office.is_active ? 'Yes' : 'No'),
        },
    ];

    return (
        <>
            <Head title="Office Directories" />
            <ResourceTable
                title="Office Directories"
                description="Manage municipal departments and office contact information."
                items={offices.data}
                links={offices.links}
                columns={columns}
                createHref={OfficeController.create.url()}
                editHref={(office) => OfficeController.edit.url(office.id)}
                deleteHref={(office) => OfficeController.destroy.url(office.id)}
                emptyMessage="No offices have been added yet."
            />
        </>
    );
}
