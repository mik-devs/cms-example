import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import {
    create,
    destroy,
    edit,
} from '@/actions/App/Http/Controllers/Admin/BarangayController';
import ResourceTable, {
    type ResourceTableColumn,
} from '@/pages/admin/components/resource-table';
import type { Barangay } from '@/types';

interface PaginatedBarangays {
    data: Barangay[];
    links: { url: string | null; label: string; active: boolean }[];
}

const columns: ResourceTableColumn<Barangay>[] = [
    { label: 'Name', render: (barangay) => barangay.name },
    {
        label: 'Population',
        render: (barangay) => barangay.population ?? '—',
    },
    { label: 'Captain', render: (barangay) => barangay.captain ?? '—' },
    { label: 'Contact', render: (barangay) => barangay.contact ?? '—' },
    {
        label: 'Coordinates',
        render: (barangay) =>
            barangay.latitude && barangay.longitude
                ? `${barangay.latitude}, ${barangay.longitude}`
                : '—',
    },
    { label: 'Order', render: (barangay) => barangay.order },
    {
        label: 'Slug',
        render: (barangay) => (
            <Badge
                variant="outline"
                className="border-line bg-(--color-bg-light) text-ink-muted"
            >
                {barangay.slug}
            </Badge>
        ),
    },
];

export default function BarangaysIndex({
    barangays,
}: {
    barangays: PaginatedBarangays;
}) {
    return (
        <>
            <Head title="Barangays" />
            <ResourceTable
                title="Barangays"
                description="Manage barangay profiles and contact details."
                items={barangays.data}
                links={barangays.links}
                columns={columns}
                createHref={create.url()}
                createLabel="Add Barangay"
                editHref={(barangay) => edit.url({ barangay: barangay.id })}
                deleteHref={(barangay) =>
                    destroy.url({ barangay: barangay.id })
                }
                getItemLabel={(barangay) => barangay.name}
                emptyMessage="No barangays found."
            />
        </>
    );
}
