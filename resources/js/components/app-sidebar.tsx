import { Link, usePage } from '@inertiajs/react';
import {
    Award,
    BarChart3,
    BookOpen,
    Briefcase,
    BriefcaseBusiness,
    FolderGit2,
    FileText,
    Gavel,
    Image,
    LayoutGrid,
    MapPin,
    Mic,
    Newspaper,
    Settings,
    Users,
} from 'lucide-react';
import { index as annualReportsIndex } from '@/actions/App/Http/Controllers/Admin/AnnualReportController';
import { index as bidsIndex } from '@/actions/App/Http/Controllers/Admin/BidController';
import { index as barangaysIndex } from '@/actions/App/Http/Controllers/Admin/BarangayController';
import { index as heroSlidesIndex } from '@/actions/App/Http/Controllers/Admin/HeroSlideController';
import { index as mayorMessagesIndex } from '@/actions/App/Http/Controllers/Admin/MayorMessageController';
import { index as officialsIndex } from '@/actions/App/Http/Controllers/Admin/OfficialController';
import { index as settingsIndex } from '@/actions/App/Http/Controllers/Admin/SettingController';
import { index as statsIndex } from '@/actions/App/Http/Controllers/Admin/StatController';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

type PermissionNavItem = NavItem & {
    permission?: string;
};

const mainNavItems: PermissionNavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'News',
        href: '/admin/news',
        icon: Newspaper,
        permission: 'manage news',
    },
    {
        title: 'Services',
        href: '/admin/services',
        icon: Briefcase,
        permission: 'manage services',
    },
    {
        title: 'Achievements',
        href: '/admin/achievements',
        icon: Award,
        permission: 'manage achievements',
    },
    {
        title: 'Jobs',
        href: '/admin/jobs',
        icon: BriefcaseBusiness,
        permission: 'manage jobs',
    },
    {
        title: 'Barangays',
        href: barangaysIndex(),
        icon: MapPin,
        permission: 'manage settings',
    },
    {
        title: 'Hero Slides',
        href: heroSlidesIndex(),
        icon: Image,
        permission: 'manage hero',
    },
    {
        title: 'Stats',
        href: statsIndex(),
        icon: BarChart3,
        permission: 'manage stats',
    },
    {
        title: 'Settings',
        href: settingsIndex(),
        icon: Settings,
        permission: 'manage settings',
    },
    {
        title: 'Bids & Awards',
        href: bidsIndex(),
        icon: Gavel,
        permission: 'manage bids',
    },
    {
        title: 'Annual Reports',
        href: annualReportsIndex(),
        icon: FileText,
        permission: 'manage reports',
    },
    {
        title: 'Officials',
        href: officialsIndex(),
        icon: Users,
        permission: 'manage officials',
    },
    {
        title: "Mayor's Corner",
        href: mayorMessagesIndex(),
        icon: Mic,
        permission: 'manage officials',
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    const permissions = auth.user?.permissions ?? [];
    const visibleMainNavItems = mainNavItems.filter(
        ({ permission }) => !permission || permissions.includes(permission),
    );

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={visibleMainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
