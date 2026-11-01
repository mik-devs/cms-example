import { Link } from '@inertiajs/react';
import {
    Award,
    BarChart3,
    BookOpen,
    Briefcase,
    BriefcaseBusiness,
    FolderGit2,
    Image,
    LayoutGrid,
    MapPin,
    Newspaper,
    Settings,
} from 'lucide-react';
import { index as barangaysIndex } from '@/actions/App/Http/Controllers/Admin/BarangayController';
import { index as heroSlidesIndex } from '@/actions/App/Http/Controllers/Admin/HeroSlideController';
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

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'News',
        href: '/admin/news',
        icon: Newspaper,
    },
    {
        title: 'Services',
        href: '/admin/services',
        icon: Briefcase,
    },
    {
        title: 'Achievements',
        href: '/admin/achievements',
        icon: Award,
    },
    {
        title: 'Jobs',
        href: '/admin/jobs',
        icon: BriefcaseBusiness,
    },
    {
        title: 'Barangays',
        href: barangaysIndex(),
        icon: MapPin,
    },
    {
        title: 'Hero Slides',
        href: heroSlidesIndex(),
        icon: Image,
    },
    {
        title: 'Stats',
        href: statsIndex(),
        icon: BarChart3,
    },
    {
        title: 'Settings',
        href: settingsIndex(),
        icon: Settings,
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
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
