import { Head } from '@inertiajs/react';
import {
    create,
    destroy,
    edit,
} from '@/actions/App/Http/Controllers/Admin/AchievementController';
import ResourceTable, {
    type ResourceTableColumn,
} from '@/pages/admin/components/resource-table';
import { Badge } from '@/components/ui/badge';
import type { Achievement } from '@/types';

interface PaginatedAchievements {
    data: Achievement[];
    links: { url: string | null; label: string; active: boolean }[];
}

const columns: ResourceTableColumn<Achievement>[] = [
    {
        label: 'Image',
        render: (achievement) =>
            achievement.image_url ? (
                <img
                    src={achievement.image_url}
                    alt=""
                    className="size-14 rounded-md object-cover"
                />
            ) : (
                <span className="text-sm text-muted-foreground">No image</span>
            ),
    },
    { label: 'Title', render: (achievement) => achievement.title },
    { label: 'Badge Year', render: (achievement) => achievement.badge_year },
    { label: 'Order', render: (achievement) => achievement.order },
    {
        label: 'Status',
        render: (achievement) => (
            <Badge variant={achievement.is_active ? 'default' : 'secondary'}>
                {achievement.is_active ? 'Active' : 'Inactive'}
            </Badge>
        ),
    },
];

export default function AchievementsIndex({
    achievements,
}: {
    achievements: PaginatedAchievements;
}) {
    return (
        <>
            <Head title="Achievements" />
            <ResourceTable
                title="Achievements"
                description="Manage municipal achievements."
                items={achievements.data}
                links={achievements.links}
                columns={columns}
                createHref={create.url()}
                editHref={(achievement) =>
                    edit.url({ achievement: achievement.id })
                }
                deleteHref={(achievement) =>
                    destroy.url({ achievement: achievement.id })
                }
                emptyMessage="No achievements found."
            />
        </>
    );
}
