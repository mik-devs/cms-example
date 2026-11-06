import { Head, Link, router } from '@inertiajs/react';
import { Lock, Pencil, Shield, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import RoleController from '@/actions/App/Http/Controllers/Admin/RoleController';
import PageBanner from '@/components/kiblawan/admin/page-banner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export interface RoleItem {
    id: number;
    name: string;
    guard_name: string;
    permissions_count: number;
    users_count?: number;
    permissions?: { id: number; name: string }[];
}

interface RolesIndexProps {
    roles: RoleItem[];
}

function formatRoleName(name: string): string {
    return name
        .replaceAll('_', ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getRoleDescription(name: string): string {
    switch (name) {
        case 'super_admin':
            return 'Full, unrestricted system access and user authorization.';
        case 'admin':
            return 'Broad municipal administration across core portal modules.';
        case 'editor':
            return 'Content authoring and publishing for news & achievements.';
        case 'department':
            return 'Departmental submissions, news, and transparency records.';
        case 'hr':
            return 'Human resources and municipal job vacancy management.';
        case 'legislative':
            return 'Sangguniang Bayan ordinances, resolutions, and session notes.';
        case 'mmo_info':
            return "Mayor's Office public releases, news, and civic information.";
        case 'mpdo':
            return 'Planning, development reports, and transparency publishing.';
        case 'tourism':
            return 'Tourism spots, festival archives, and destination media.';
        case 'menro':
            return 'Environmental initiatives, solid waste management updates.';
        default:
            return 'Municipal role with custom assigned privileges.';
    }
}

export default function RolesIndex({ roles }: RolesIndexProps) {
    const [search, setSearch] = useState('');

    const filteredRoles = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) {
            return roles;
        }

        return roles.filter(
            (role) =>
                role.name.toLowerCase().includes(query) ||
                formatRoleName(role.name).toLowerCase().includes(query) ||
                getRoleDescription(role.name).toLowerCase().includes(query),
        );
    }, [roles, search]);

    return (
        <>
            <Head title="Roles & Permissions" />
            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 p-6 md:p-8">
                <PageBanner
                    title="Roles & Permissions"
                    subtitle="Configure role-based access control and system privileges for municipal staff."
                    actionLabel="Create Role"
                    actionHref={RoleController.create.url()}
                />

                <div className="flex flex-col gap-4 rounded-[20px] border border-line-soft bg-white p-6 shadow-xs">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="font-display text-lg font-bold text-forest">
                                System Roles ({filteredRoles.length})
                            </h2>
                            <p className="text-xs text-ink-muted">
                                Select a role to inspect or modify its assigned
                                permissions.
                            </p>
                        </div>
                        <div className="w-full sm:w-72">
                            <Input
                                placeholder="Search roles..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-9 text-sm"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-line-soft">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-line-soft bg-cream/40">
                                    <TableHead className="w-[240px] px-4 py-3 font-bold text-forest">
                                        Role
                                    </TableHead>
                                    <TableHead className="px-4 py-3 font-bold text-forest">
                                        Description
                                    </TableHead>
                                    <TableHead className="w-[160px] px-4 py-3 text-center font-bold text-forest">
                                        Permissions
                                    </TableHead>
                                    <TableHead className="w-[200px] px-4 py-3 text-right font-bold text-forest">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRoles.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="py-10 text-center text-sm text-ink-muted"
                                        >
                                            No roles found matching “{search}”.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredRoles.map((role) => {
                                        const isAdmin = role.name === 'admin';
                                        const permissionsCount =
                                            role.permissions_count ??
                                            role.permissions?.length ??
                                            0;

                                        return (
                                            <TableRow
                                                key={role.id}
                                                className="border-b border-line-soft transition-colors hover:bg-cream/20"
                                            >
                                                <TableCell className="px-4 py-4 align-top">
                                                    <div className="flex items-center gap-2.5">
                                                        <span
                                                            className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
                                                                isAdmin
                                                                    ? 'bg-primary/10 text-primary'
                                                                    : 'bg-forest/10 text-forest'
                                                            }`}
                                                        >
                                                            {isAdmin ? (
                                                                <Shield className="size-4.5" />
                                                            ) : (
                                                                <Lock className="size-4" />
                                                            )}
                                                        </span>
                                                        <div>
                                                            <div className="font-bold text-forest">
                                                                {formatRoleName(
                                                                    role.name,
                                                                )}
                                                            </div>
                                                            <span className="font-mono text-[11px] text-ink-muted">
                                                                {role.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell className="px-4 py-4 align-top">
                                                    <p className="text-xs text-ink-muted">
                                                        {getRoleDescription(
                                                            role.name,
                                                        )}
                                                    </p>
                                                    {role.users_count !==
                                                        undefined && (
                                                        <p className="mt-1 text-[11px] text-ink-muted/80">
                                                            {role.users_count}{' '}
                                                            {role.users_count ===
                                                            1
                                                                ? 'staff user assigned'
                                                                : 'staff users assigned'}
                                                        </p>
                                                    )}
                                                </TableCell>

                                                <TableCell className="px-4 py-4 text-center align-top">
                                                    <Badge className="border-transparent bg-forest/10 font-semibold text-forest">
                                                        {permissionsCount}{' '}
                                                        active
                                                    </Badge>
                                                </TableCell>

                                                <TableCell className="px-4 py-4 text-right align-top">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            asChild
                                                            size="sm"
                                                            variant="outline"
                                                            className="border-line-soft text-xs font-semibold text-forest hover:border-forest hover:bg-forest hover:text-white"
                                                        >
                                                            <Link
                                                                href={RoleController.edit.url(
                                                                    role.id,
                                                                )}
                                                            >
                                                                <Pencil className="mr-1.5 size-3.5" />
                                                                Edit
                                                            </Link>
                                                        </Button>

                                                        <Dialog>
                                                            <DialogTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    type="button"
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="border-line-soft text-xs font-semibold text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white"
                                                                >
                                                                    <Trash2 className="mr-1.5 size-3.5" />
                                                                    Delete
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogTitle>
                                                                    Delete this
                                                                    role?
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    "
                                                                    {formatRoleName(
                                                                        role.name,
                                                                    )}
                                                                    " will be
                                                                    permanently
                                                                    deleted. Staff
                                                                    users assigned
                                                                    this role will
                                                                    lose its
                                                                    permissions.
                                                                </DialogDescription>
                                                                <DialogFooter>
                                                                    <DialogClose
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant="outline"
                                                                        >
                                                                            Cancel
                                                                        </Button>
                                                                    </DialogClose>
                                                                    <Button
                                                                        variant="destructive"
                                                                        onClick={() =>
                                                                            router.delete(
                                                                                RoleController.destroy.url(
                                                                                    role.id,
                                                                                ),
                                                                            )
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}
