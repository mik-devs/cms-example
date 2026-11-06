import { Head, useForm } from '@inertiajs/react';
import { CheckCheck, Shield, X } from 'lucide-react';
import { useMemo, type FormEvent } from 'react';
import RoleController from '@/actions/App/Http/Controllers/Admin/RoleController';
import { FormWrapper } from '@/components/kiblawan/ui/form-wrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PermissionPicker, {
    type PermissionOption,
} from '@/pages/admin/roles/components/permission-picker';

interface RoleData {
    id: number;
    name: string;
    guard_name: string;
}

interface EditRoleProps {
    role: RoleData;
    assignedPermissions: string[];
    allPermissions: PermissionOption[];
    permissionGroups: Record<string, Record<string, string>>;
}

function formatRoleName(name: string): string {
    return name
        .replaceAll('_', ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getRoleDescription(name: string): string {
    switch (name) {
        case 'admin':
            return 'Broad municipal administration across core portal modules.';
        case 'editor':
            return 'Content authoring and publishing for municipal news and milestones.';
        case 'department':
            return 'Departmental submissions, news updates, and transparency records.';
        case 'hr':
            return 'Human resources and municipal job vacancy management.';
        case 'legislative':
            return 'Sangguniang Bayan ordinances, resolutions, and session notes.';
        case 'mmo_info':
            return "Mayor's Office public releases, news announcements, and civic information.";
        case 'mpdo':
            return 'Municipal planning, development reports, and public project tracking.';
        case 'tourism':
            return 'Municipal tourism destinations, festival updates, and local culture media.';
        case 'menro':
            return 'Environmental initiatives, solid waste management, and natural resources.';
        default:
            return 'Municipal staff role with custom system privileges.';
    }
}

export default function EditRole({
    role,
    assignedPermissions,
    allPermissions,
    permissionGroups,
}: EditRoleProps) {
    const form = useForm<{
        permissions: string[];
    }>({
        permissions: assignedPermissions ?? [],
    });

    const allPermissionNames = useMemo(
        () => allPermissions.map((permission) => permission.name),
        [allPermissions],
    );

    const activeCount = form.data.permissions.length;
    const totalCount = allPermissionNames.length;
    const percentActive = totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0;

    function selectAll() {
        form.setData('permissions', allPermissionNames);
    }

    function deselectAll() {
        form.setData('permissions', []);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        form.put(RoleController.update.url(role.id));
    }

    return (
        <>
            <Head title={`Edit Permissions - ${formatRoleName(role.name)}`} />

            <FormWrapper
                title={`Edit Role: ${formatRoleName(role.name)}`}
                subtitle={`Assign or revoke administrative capabilities for municipal staff with the "${role.name}" role.`}
                backHref={RoleController.index.url()}
                backLabel="Back to Roles"
                onSubmit={handleSubmit}
                processing={form.processing}
                submitLabel="Save Changes"
            >
                {/* LEFT COLUMN: Role Details & Sticky Actions (lg:col-span-1) */}
                <div className="space-y-6 lg:col-span-1">
                    <div className="sticky top-6 space-y-6">
                        {/* Role Summary Card */}
                        <div className="rounded-2xl border border-line-soft bg-white p-6 shadow-xs">
                            <div className="flex items-center gap-3">
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-forest/10 text-forest">
                                    <Shield className="size-6 text-forest" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate font-display text-lg font-bold text-forest">
                                        {formatRoleName(role.name)}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="font-mono text-[10px] text-ink-muted"
                                        >
                                            {role.name}
                                        </Badge>
                                        <span className="text-[11px] text-ink-muted">
                                            guard: {role.guard_name}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-ink-muted leading-relaxed">
                                {getRoleDescription(role.name)}
                            </p>

                            <hr className="my-5 border-line-soft" />

                            {/* Permission Counter & Progress Bar */}
                            <div>
                                <div className="flex items-baseline justify-between">
                                    <span className="text-xs font-semibold text-forest">
                                        Assigned Privileges
                                    </span>
                                    <span className="font-mono text-xs font-bold text-forest">
                                        {activeCount} / {totalCount} ({percentActive}%)
                                    </span>
                                </div>
                                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-cream">
                                    <div
                                        className="h-full rounded-full bg-primary transition-all duration-300"
                                        style={{ width: `${percentActive}%` }}
                                    />
                                </div>
                            </div>

                            {/* Quick Select Buttons */}
                            <div className="mt-5 grid grid-cols-2 gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={selectAll}
                                    className="border-line-soft text-xs font-semibold text-forest hover:bg-forest hover:text-white"
                                >
                                    <CheckCheck className="mr-1.5 size-3.5" />
                                    Select All
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={deselectAll}
                                    className="border-line-soft text-xs font-semibold text-ink-muted hover:bg-red-50 hover:text-red-700"
                                >
                                    <X className="mr-1.5 size-3.5" />
                                    Clear All
                                </Button>
                            </div>
                        </div>

                        {/* Guidelines Note Card */}
                        <div className="rounded-2xl border border-line-soft bg-cream/30 p-5 text-xs text-ink-muted">
                            <h4 className="font-bold text-forest">
                                Security Tip
                            </h4>
                            <p className="mt-1 leading-relaxed">
                                Grant only the permissions necessary for this department’s operational functions. Permissions take effect immediately upon next page visit.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Permission Groups List (lg:col-span-2) */}
                <div className="lg:col-span-2">
                    <PermissionPicker
                        permissionGroups={permissionGroups}
                        allPermissions={allPermissions}
                        selectedPermissions={form.data.permissions}
                        onChange={(permissions) =>
                            form.setData('permissions', permissions)
                        }
                    />
                </div>
            </FormWrapper>
        </>
    );
}
