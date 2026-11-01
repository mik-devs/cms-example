import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import {
    create,
    destroy,
    edit,
} from '@/actions/App/Http/Controllers/Admin/StatController';
import ResourceTable, {
    type ResourceTableColumn,
} from '@/pages/admin/components/resource-table';
import type { Stat } from '@/types';

interface PaginatedStats {
    data: Stat[];
    links: { url: string | null; label: string; active: boolean }[];
}

const columns: ResourceTableColumn<Stat>[] = [
    { label: 'Label', render: (stat) => stat.label },
    {
        label: 'Value',
        render: (stat) => `${stat.value}${stat.suffix ?? ''}`,
    },
    { label: 'Order', render: (stat) => stat.order },
    {
        label: 'Status',
        render: (stat) => (
            <Badge variant={stat.is_active ? 'default' : 'secondary'}>
                {stat.is_active ? 'Active' : 'Inactive'}
            </Badge>
        ),
    },
];

export default function StatsIndex({ stats }: { stats: PaginatedStats }) {
    return (
        <>
            <Head title="Stats" />
            <ResourceTable
                title="Stats"
                description="Manage the figures displayed in the home page statistics."
                items={stats.data}
                links={stats.links}
                columns={columns}
                createHref={create.url()}
                editHref={(stat) => edit.url({ stat: stat.id })}
                deleteHref={(stat) => destroy.url({ stat: stat.id })}
                getItemLabel={(stat) => stat.label}
                emptyMessage="No stats found."
            />
        </>
    );
}
