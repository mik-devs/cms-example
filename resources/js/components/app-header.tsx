import { usePage } from '@inertiajs/react';
import { Bell, ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import type { BreadcrumbItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
    leading?: ReactNode;
};

export function AppHeader({ breadcrumbs = [], leading }: Props) {
    const { auth } = usePage().props;
    const user = auth?.user ?? null;
    const role = user?.roles?.[0]?.replaceAll('_', ' ') ?? 'Administrator';
    const getInitials = useInitials();

    return (
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-line-soft bg-white px-4 md:px-6">
            {leading}

            <div className="flex min-w-0 items-center gap-2 text-sm text-ink-muted">
                {breadcrumbs.length > 0 ? (
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                ) : (
                    <span className="font-medium">Admin Console</span>
                )}
            </div>

            <div className="ml-auto flex items-center gap-2">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Notifications"
                    className="relative size-9 rounded-full text-ink-muted hover:bg-cream hover:text-forest"
                >
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-2 right-2 size-1.5 rounded-full bg-gold" />
                </Button>

                {user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-10 gap-2 rounded-full px-2 hover:bg-cream"
                            >
                                <Avatar className="size-8 border border-line-soft">
                                    <AvatarImage
                                        src={user.avatar}
                                        alt={user.name}
                                    />
                                    <AvatarFallback className="bg-forest text-xs font-semibold text-white">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="hidden text-left md:grid">
                                    <span className="text-sm leading-tight font-semibold text-forest">
                                        {user.name}
                                    </span>
                                    <span className="text-[11px] leading-tight text-ink-muted capitalize">
                                        {role}
                                    </span>
                                </span>
                                <ChevronDown className="hidden size-4 text-ink-muted md:block" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            <UserMenuContent user={user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </header>
    );
}
