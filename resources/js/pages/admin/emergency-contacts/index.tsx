import { Head } from '@inertiajs/react';
import {
    create,
    destroy,
    edit,
} from '@/actions/App/Http/Controllers/Admin/EmergencyContactController';
import { Badge } from '@/components/ui/badge';
import ResourceTable, {
    type ResourceTableColumn,
} from '@/pages/admin/components/resource-table';
import type { EmergencyContact } from '@/types';

interface PaginatedEmergencyContacts {
    data: EmergencyContact[];
    links: { url: string | null; label: string; active: boolean }[];
}

const columns: ResourceTableColumn<EmergencyContact>[] = [
    { label: 'Name', render: (contact) => contact.name },
    { label: 'Phone', render: (contact) => contact.phone },
    { label: 'Icon', render: (contact) => contact.icon },
    { label: 'Order', render: (contact) => contact.order },
    {
        label: 'Status',
        render: (contact) => (
            <Badge
                className={
                    contact.is_active
                        ? 'border-transparent bg-green text-white'
                        : 'border-transparent bg-gold text-ink'
                }
            >
                {contact.is_active ? 'Active' : 'Inactive'}
            </Badge>
        ),
    },
];

export default function EmergencyContactsIndex({
    emergencyContacts,
}: {
    emergencyContacts: PaginatedEmergencyContacts;
}) {
    return (
        <>
            <Head title="Emergency Contacts" />
            <ResourceTable
                title="Emergency Contacts"
                description="Manage emergency contact numbers shown on the public site."
                items={emergencyContacts.data}
                links={emergencyContacts.links}
                columns={columns}
                createHref={create.url()}
                editHref={(contact) =>
                    edit.url({ emergency_contact: contact.id })
                }
                deleteHref={(contact) =>
                    destroy.url({ emergency_contact: contact.id })
                }
                getItemLabel={(contact) => contact.name}
                emptyMessage="No emergency contacts found."
            />
        </>
    );
}
