import { Head } from '@inertiajs/react';
import UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import { Badge } from '@/components/ui/badge';
import ResourceTable, {
    type ResourceTableColumn,
} from '@/pages/admin/components/resource-table';
import type { RoleOption, UserItem } from '@/pages/admin/users/components/user-form';

export default function UsersIndex({
    users,
    roles,
}: {
    users: UserItem[];
    roles: RoleOption[];
}) {
    const columns: ResourceTableColumn<UserItem>[] = [
        {
            label: 'Name',
            render: (user) => (
                <div className="font-semibold text-ink">{user.name}</div>
            ),
        },
        {
            label: 'Email',
            render: (user) => (
                <span className="text-ink-muted">{user.email}</span>
            ),
        },
        {
            label: 'Role',
            render: (user) => {
                const roleName = user.roles?.[0]?.name ?? 'No Role';
                const isSuperAdmin = roleName === 'super_admin';
                const isAdmin = roleName === 'admin';

                return (
                    <Badge
                        className={
                            isSuperAdmin
                                ? 'border-transparent bg-maroon text-white font-semibold'
                                : isAdmin
                                  ? 'border-transparent bg-primary text-white font-semibold'
                                  : 'border-transparent bg-forest/10 text-forest font-medium'
                        }
                    >
                        {roleName
                            .replaceAll('_', ' ')
                            .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </Badge>
                );
            },
        },
    ];

    return (
        <>
            <Head title="Staff User Management" />
            <ResourceTable
                title="Staff User Management"
                description="Manage municipal staff accounts, credentials, and assigned role access."
                items={users}
                links={[]}
                columns={columns}
                createHref={UserController.create.url()}
                createLabel="Create Staff User"
                editHref={(user) => UserController.edit.url(user.id)}
                deleteHref={(user) => UserController.destroy.url(user.id)}
                getItemLabel={(user) => user.name}
                emptyMessage="No staff accounts found."
            />
        </>
    );
}

