import { Link, router, usePage } from '@inertiajs/react';
import {
    Award,
    BarChart3,
    BriefcaseBusiness,
    FileText,
    Gavel,
    Image,
    Landmark,
    LayoutGrid,
    LogOut,
    MapPin,
    MapPinned,
    Mic,
    Newspaper,
    Settings,
    Siren,
    Users,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { logout } from '@/routes';
import type { NavItem } from '@/types';

type AdminNavItem = NavItem & {
    permission?: string;
};

type AdminNavGroup = {
    label: string;
    items: AdminNavItem[];
};

const navGroups: AdminNavGroup[] = [
    {
        label: 'Content',
        items: [
            {
                title: 'News',
                href: '/admin/news',
                icon: Newspaper,
                permission: 'manage news',
            },
            {
                title: 'Achievements',
                href: '/admin/achievements',
                icon: Award,
                permission: 'manage achievements',
            },
            {
                title: 'Tourism',
                href: '/admin/tourism',
                icon: MapPinned,
                permission: 'manage tourism',
            },
            {
                title: 'Jobs',
                href: '/admin/jobs',
                icon: BriefcaseBusiness,
                permission: 'manage jobs',
            },
        ],
    },
    {
        label: 'LGU Info',
        items: [
            {
                title: 'Officials',
                href: '/admin/officials',
                icon: Users,
                permission: 'manage officials',
            },
            {
                title: 'Barangays',
                href: '/admin/barangays',
                icon: MapPin,
                permission: 'manage settings',
            },
            {
                title: 'Services',
                href: '/admin/services',
                icon: Landmark,
                permission: 'manage services',
            },
            {
                title: "Mayor's Messages",
                href: '/admin/mayor-messages',
                icon: Mic,
                permission: 'manage officials',
            },
        ],
    },
    {
        label: 'Transparency',
        items: [
            {
                title: 'Bids',
                href: '/admin/bids',
                icon: Gavel,
                permission: 'manage bids',
            },
            {
                title: 'Reports',
                href: '/admin/annual-reports',
                icon: FileText,
                permission: 'manage reports',
            },
        ],
    },
    {
        label: 'System',
        items: [
            {
                title: 'Settings',
                href: '/admin/settings',
                icon: Settings,
                permission: 'manage settings',
            },
            {
                title: 'Hero Slides',
                href: '/admin/hero-slides',
                icon: Image,
                permission: 'manage hero',
            },
            {
                title: 'Stats',
                href: '/admin/stats',
                icon: BarChart3,
                permission: 'manage stats',
            },
            {
                title: 'Emergency',
                href: '/admin/emergency-contacts',
                icon: Siren,
                permission: 'manage emergency',
            },
        ],
    },
];

const navItemClassName =
    'h-9 gap-2 rounded-lg px-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-cream hover:text-forest data-[active=true]:bg-forest data-[active=true]:font-semibold data-[active=true]:text-white data-[active=true]:shadow-sm data-[active=true]:hover:bg-forest data-[active=true]:hover:text-white';

export function AppSidebar() {
    const { auth } = usePage().props;
    const permissions = auth?.user?.permissions ?? [];
    const user = auth?.user ?? null;
    const role = user?.roles?.[0]?.replaceAll('_', ' ') ?? 'Administrator';
    const getInitials = useInitials();
    const { isCurrentUrl, isCurrentOrParentUrl } = useCurrentUrl();

    const handleLogout = () => {
        router.flushAll();
    };

    return (
        <Sidebar collapsible="icon" className="border-r border-line-soft">
            <SidebarHeader className="border-b border-line-soft p-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="h-auto justify-start gap-3 p-1 hover:bg-cream"
                        >
                            <Link href="/admin" prefetch>
                                <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream ring-1 ring-line-soft group-data-[collapsible=icon]:size-7">
                                    <img
                                        src="/images/image.png"
                                        alt="Kiblawan logo"
                                        className="size-full object-contain p-0.5"
                                    />
                                </span>
                                <span className="grid min-w-0 flex-1 text-left group-data-[collapsible=icon]:hidden">
                                    <span className="truncate font-display text-base leading-tight font-bold text-forest">
                                        Kiblawan
                                    </span>
                                    <span className="text-[10px] font-semibold tracking-[0.2em] text-ink-muted uppercase">
                                        Admin
                                    </span>
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="[scrollbar-width:none] gap-0 overflow-y-auto px-1 py-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <SidebarGroup className="px-1 pt-1 pb-0">
                    <SidebarMenu className="gap-1">
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl('/admin')}
                                tooltip={{ children: 'Dashboard' }}
                                className={navItemClassName}
                            >
                                <Link href="/admin" prefetch>
                                    <LayoutGrid className="h-4 w-4 shrink-0" />
                                    <span className="truncate">Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                {navGroups.map((group) => {
                    const items = group.items.filter(
                        ({ permission }) =>
                            !permission || permissions.includes(permission),
                    );

                    if (items.length === 0) {
                        return null;
                    }

                    return (
                        <SidebarGroup key={group.label} className="px-1 py-2">
                            <SidebarGroupLabel className="h-7 px-2 text-[10px] font-semibold tracking-[0.18em] text-ink-muted/80 uppercase">
                                {group.label}
                            </SidebarGroupLabel>
                            <SidebarMenu className="gap-1">
                                {items.map((item) => {
                                    const isActive = isCurrentOrParentUrl(
                                        item.href,
                                    );
                                    const Icon = item.icon;

                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                tooltip={{
                                                    children: item.title,
                                                }}
                                                className={navItemClassName}
                                            >
                                                <Link href={item.href} prefetch>
                                                    {Icon && (
                                                        <Icon className="h-4 w-4 shrink-0" />
                                                    )}
                                                    <span className="truncate">
                                                        {item.title}
                                                    </span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroup>
                    );
                })}
            </SidebarContent>

            <SidebarFooter className="border-t border-line-soft p-3">
                {user && (
                    <div className="rounded-xl border border-line-soft bg-cream/60 p-3 group-data-[collapsible=icon]:hidden">
                        <div className="flex items-center gap-2.5">
                            <Avatar className="size-9 border border-white shadow-sm">
                                <AvatarImage
                                    src={user.avatar}
                                    alt={user.name}
                                />
                                <AvatarFallback className="bg-forest text-xs font-semibold text-white">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-forest">
                                    {user.name}
                                </p>
                                <p className="truncate text-[11px] text-ink-muted capitalize">
                                    {role}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={logout()}
                            as="button"
                            method="post"
                            onClick={handleLogout}
                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-line-soft bg-white px-3 py-2 text-xs font-semibold text-maroon transition-colors hover:border-maroon/20 hover:bg-maroon/5"
                        >
                            <LogOut className="h-4 w-4" />
                            Log Out
                        </Link>
                    </div>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
