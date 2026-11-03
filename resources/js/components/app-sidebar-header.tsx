import { AppHeader } from '@/components/app-header';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <AppHeader
            breadcrumbs={breadcrumbs}
            leading={
                <SidebarTrigger className="-ml-1 size-8 text-ink-muted hover:bg-(--color-bg-light) hover:text-primary" />
            }
        />
    );
}
