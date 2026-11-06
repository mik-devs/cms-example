import {
    Briefcase,
    FileCheck,
    FileText,
    Key,
    MessageSquare,
    Search,
    Settings,
    Users,
    type LucideIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface PermissionOption {
    id: number;
    name: string;
}

interface PermissionPickerProps {
    permissionGroups: Record<string, Record<string, string>>;
    allPermissions: PermissionOption[];
    selectedPermissions: string[];
    onChange: (permissions: string[]) => void;
}

function getGroupIcon(groupName: string): LucideIcon {
    switch (groupName) {
        case 'Content Management':
            return FileText;
        case 'Governance & Officials':
            return Users;
        case 'Transparency & Bids':
            return FileCheck;
        case 'Careers & Recruitment':
            return Briefcase;
        case 'Communication':
            return MessageSquare;
        case 'System & Administration':
            return Settings;
        default:
            return Key;
    }
}

export default function PermissionPicker({
    permissionGroups,
    allPermissions,
    selectedPermissions,
    onChange,
}: PermissionPickerProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const allPermissionNames = useMemo(
        () => allPermissions.map((permission) => permission.name),
        [allPermissions],
    );

    const mergedGroups = useMemo(() => {
        const groupedNames = new Set(
            Object.values(permissionGroups).flatMap((permissions) =>
                Object.keys(permissions),
            ),
        );
        const extraPermissions = allPermissionNames.filter(
            (name) => !groupedNames.has(name),
        );

        return {
            ...permissionGroups,
            ...(extraPermissions.length > 0
                ? {
                      'Other Capabilities': Object.fromEntries(
                          extraPermissions.map((name) => [
                              name,
                              `Custom privilege: ${name}`,
                          ]),
                      ),
                  }
                : {}),
        };
    }, [permissionGroups, allPermissionNames]);

    const filteredGroups = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) {
            return mergedGroups;
        }

        const filtered: Record<string, Record<string, string>> = {};
        for (const [groupName, permissions] of Object.entries(mergedGroups)) {
            const matchesGroupName = groupName.toLowerCase().includes(query);
            const matchingPermissions: Record<string, string> = {};

            for (const [permissionName, description] of Object.entries(
                permissions,
            )) {
                if (
                    matchesGroupName ||
                    permissionName.toLowerCase().includes(query) ||
                    description.toLowerCase().includes(query)
                ) {
                    matchingPermissions[permissionName] = description;
                }
            }

            if (Object.keys(matchingPermissions).length > 0) {
                filtered[groupName] = matchingPermissions;
            }
        }

        return filtered;
    }, [mergedGroups, searchQuery]);

    function togglePermission(permission: string, checked: boolean): void {
        if (checked) {
            onChange([...selectedPermissions, permission]);

            return;
        }

        onChange(selectedPermissions.filter((item) => item !== permission));
    }

    function toggleGroup(permissionsInGroup: string[], select: boolean): void {
        if (select) {
            onChange(
                Array.from(
                    new Set([...selectedPermissions, ...permissionsInGroup]),
                ),
            );

            return;
        }

        onChange(
            selectedPermissions.filter(
                (permission) => !permissionsInGroup.includes(permission),
            ),
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 rounded-2xl border border-line-soft bg-white p-4 shadow-2xs">
                <Search className="size-4 text-ink-muted" />
                <Input
                    placeholder="Filter permissions by name, module, or description..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="h-9 border-0 bg-transparent p-0 text-sm focus-visible:ring-0"
                />
                {searchQuery && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchQuery('')}
                        className="h-7 px-2 text-xs text-ink-muted hover:text-forest"
                    >
                        Clear
                    </Button>
                )}
            </div>

            {Object.keys(filteredGroups).length === 0 ? (
                <div className="rounded-2xl border border-line-soft bg-white p-10 text-center">
                    <p className="text-sm font-semibold text-forest">
                        No permissions matched "{searchQuery}"
                    </p>
                    <p className="mt-1 text-xs text-ink-muted">
                        Try searching with different terms or clear the filter.
                    </p>
                </div>
            ) : (
                Object.entries(filteredGroups).map(([groupName, permissions]) => {
                    const groupPermissionNames = Object.keys(permissions);
                    const selectedInGroup = groupPermissionNames.filter(
                        (name) => selectedPermissions.includes(name),
                    );
                    const isAllInGroupSelected =
                        groupPermissionNames.length > 0 &&
                        selectedInGroup.length ===
                            groupPermissionNames.length;
                    const GroupIcon = getGroupIcon(groupName);

                    return (
                        <div
                            key={groupName}
                            className="overflow-hidden rounded-2xl border border-line-soft bg-white shadow-2xs transition-shadow hover:shadow-xs"
                        >
                            <div className="flex items-center justify-between border-b border-line-soft bg-cream/20 px-5 py-3.5">
                                <div className="flex items-center gap-2.5">
                                    <span className="flex size-7 items-center justify-center rounded-lg bg-white shadow-2xs">
                                        <GroupIcon className="size-4 text-primary" />
                                    </span>
                                    <div>
                                        <h4 className="font-display text-sm font-bold text-forest">
                                            {groupName}
                                        </h4>
                                        <span className="text-[11px] text-ink-muted">
                                            {selectedInGroup.length} of{' '}
                                            {groupPermissionNames.length}{' '}
                                            active
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        toggleGroup(
                                            groupPermissionNames,
                                            !isAllInGroupSelected,
                                        )
                                    }
                                    className="h-7 px-2.5 text-xs font-semibold text-primary hover:bg-white hover:text-forest"
                                >
                                    {isAllInGroupSelected
                                        ? 'Deselect group'
                                        : 'Select all'}
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
                                {Object.entries(permissions).map(
                                    ([permissionName, description]) => {
                                        const isChecked =
                                            selectedPermissions.includes(
                                                permissionName,
                                            );

                                        return (
                                            <div
                                                key={permissionName}
                                                onClick={() =>
                                                    togglePermission(
                                                        permissionName,
                                                        !isChecked,
                                                    )
                                                }
                                                className={`flex cursor-pointer select-none items-start gap-3 rounded-xl border p-3.5 transition-all ${
                                                    isChecked
                                                        ? 'border-primary/40 bg-primary/[0.04] shadow-2xs'
                                                        : 'border-line-soft bg-white hover:border-forest/30 hover:bg-cream/10'
                                                }`}
                                            >
                                                <Checkbox
                                                    id={`perm-${permissionName}`}
                                                    checked={isChecked}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        togglePermission(
                                                            permissionName,
                                                            checked === true,
                                                        )
                                                    }
                                                    onClick={(event) =>
                                                        event.stopPropagation()
                                                    }
                                                    className="mt-0.5"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <Label
                                                        htmlFor={`perm-${permissionName}`}
                                                        className="block cursor-pointer font-semibold text-forest text-xs"
                                                    >
                                                        {permissionName}
                                                    </Label>
                                                    <p className="mt-1 text-[11px] text-ink-muted leading-relaxed">
                                                        {description}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
