import { Head } from '@inertiajs/react';
import {
    create,
    destroy,
    edit,
} from '@/actions/App/Http/Controllers/Admin/ServiceController';
import ResourceTable, {
    type ResourceTableColumn,
} from '@/pages/admin/components/resource-table';
import { Badge } from '@/components/ui/badge';
import type { Service } from '@/types';

interface PaginatedServices {
    data: Service[];
    links: { url: string | null; label: string; active: boolean }[];
}

const columns: ResourceTableColumn<Service>[] = [
    { label: 'Title', render: (service) => service.title },
    { label: 'Icon', render: (service) => service.icon },
    {
        label: 'Order',
        render: (service) => service.order,
    },
    {
        label: 'Status',
        render: (service) => (
            <Badge
                className={
                    service.is_active
                        ? 'border-transparent bg-green text-white'
                        : 'border-transparent bg-gold text-ink'
                }
            >
                {service.is_active ? 'Active' : 'Inactive'}
            </Badge>
        ),
    },
];

export default function ServicesIndex({
    services,
}: {
    services: PaginatedServices;
}) {
    return (
        <>
            <Head title="Services" />
            <ResourceTable
                title="Services"
                description="Manage the services shown to residents."
                items={services.data}
                links={services.links}
                columns={columns}
                createHref={create.url()}
                createLabel="Add Service"
                editHref={(service) => edit.url({ service: service.id })}
                deleteHref={(service) => destroy.url({ service: service.id })}
                emptyMessage="No services found."
            />
        </>
    );
}
