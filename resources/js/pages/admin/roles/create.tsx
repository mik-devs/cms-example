import { Head, useForm } from '@inertiajs/react';
import { CheckCheck, Shield, X } from 'lucide-react';
import { type FormEvent } from 'react';
import RoleController from '@/actions/App/Http/Controllers/Admin/RoleController';
import InputError from '@/components/input-error';
import { FormWrapper } from '@/components/kiblawan/ui/form-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PermissionPicker, {
    type PermissionOption,
} from '@/pages/admin/roles/components/permission-picker';

interface CreateRoleProps {
    allPermissions: PermissionOption[];
    permissionGroups: Record<string, Record<string, string>>;
}

export default function CreateRole({
    allPermissions,
    permissionGroups,
}: CreateRoleProps) {
    const form = useForm<{ name: string; permissions: string[] }>({
        name: '',
        permissions: [],
    });

    const allPermissionNames = allPermissions.map(
        (permission) => permission.name,
    );
    const activeCount = form.data.permissions.length;
    const totalCount = allPermissionNames.length;
    const percentActive =
        totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0;

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        form.post(RoleController.store.url());
    }

    return (
        <>
            <Head title="Create Role" />

            <FormWrapper
                title="Create Role"
                subtitle="Add a new municipal role and assign the capabilities available to its staff."
                backHref={RoleController.index.url()}
                backLabel="Back to Roles"
                onSubmit={handleSubmit}
                processing={form.processing}
                submitLabel="Create Role"
            >
                <div className="space-y-6 lg:col-span-1">
                    <div className="sticky top-6 space-y-6">
                        <div className="space-y-4 rounded-2xl border border-line-soft bg-white p-6 shadow-xs">
                            <div className="flex items-center gap-3">
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-forest/10 text-forest">
                                    <Shield className="size-6 text-forest" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-display text-lg font-bold text-forest">
                                        Role Details
                                    </h3>
                                    <p className="text-[11px] text-ink-muted">
                                        A name and the initial privileges.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="name"
                                    className="text-sm font-semibold text-forest"
                                >
                                    Role Name{' '}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    required
                                    autoFocus
                                    maxLength={255}
                                    placeholder="e.g. assessor"
                                    value={form.data.name}
                                    onChange={(event) =>
                                        form.setData('name', event.target.value)
                                    }
                                    className="w-full rounded-[12px] border border-line-soft bg-white p-3 text-ink outline-none transition-all focus:border-gold focus:ring-1 focus:ring-gold"
                                    aria-invalid={Boolean(form.errors.name)}
                                />
                                <p className="text-xs text-ink-muted">
                                    Use lowercase letters and underscores
                                    (e.g. <code>assessor</code>).
                                </p>
                                <InputError message={form.errors.name} />
                            </div>

                            <hr className="border-line-soft" />

                            <div>
                                <div className="flex items-baseline justify-between">
                                    <span className="text-xs font-semibold text-forest">
                                        Assigned Privileges
                                    </span>
                                    <span className="font-mono text-xs font-bold text-forest">
                                        {activeCount} / {totalCount} (
                                        {percentActive}%)
                                    </span>
                                </div>
                                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-cream">
                                    <div
                                        className="h-full rounded-full bg-primary transition-all duration-300"
                                        style={{ width: `${percentActive}%` }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        form.setData(
                                            'permissions',
                                            allPermissionNames,
                                        )
                                    }
                                    className="border-line-soft text-xs font-semibold text-forest hover:bg-forest hover:text-white"
                                >
                                    <CheckCheck className="mr-1.5 size-3.5" />
                                    Select All
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        form.setData('permissions', [])
                                    }
                                    className="border-line-soft text-xs font-semibold text-ink-muted hover:bg-red-50 hover:text-red-700"
                                >
                                    <X className="mr-1.5 size-3.5" />
                                    Clear All
                                </Button>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-line-soft bg-cream/30 p-5 text-xs text-ink-muted">
                            <h4 className="font-bold text-forest">
                                Security Tip
                            </h4>
                            <p className="mt-1 leading-relaxed">
                                Grant only the permissions necessary for this
                                role's operational functions. Permissions take
                                effect immediately upon next page visit.
                            </p>
                        </div>
                    </div>
                </div>

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
