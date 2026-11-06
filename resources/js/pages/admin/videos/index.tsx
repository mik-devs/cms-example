import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import {
    create,
    destroy,
    edit,
} from '@/actions/App/Http/Controllers/Admin/OfficialVideoController';
import ResourceTable, {
    type ResourceTableColumn,
} from '@/pages/admin/components/resource-table';
import type { OfficialVideo } from '@/types';

interface PaginatedVideos {
    data: OfficialVideo[];
    links: { url: string | null; label: string; active: boolean }[];
}

const columns: ResourceTableColumn<OfficialVideo>[] = [
    {
        label: 'Video',
        render: (video) => (
            <video
                src={video.video_url}
                className="h-16 w-28 rounded-lg border border-line-soft bg-black object-cover shadow-sm"
                preload="metadata"
                muted
            />
        ),
    },
    { label: 'Title', render: (video) => video.title },
    { label: 'Order', render: (video) => video.order },
    {
        label: 'Status',
        render: (video) => (
            <Badge
                className={
                    video.is_active
                        ? 'border-transparent bg-green text-white'
                        : 'border-transparent bg-gold text-ink'
                }
            >
                {video.is_active ? 'Active' : 'Inactive'}
            </Badge>
        ),
    },
];

export default function OfficialVideosIndex({
    videos,
}: {
    videos: PaginatedVideos;
}) {
    return (
        <>
            <Head title="Official Videos" />
            <ResourceTable
                title="Official Videos"
                description="Manage the official videos displayed in the home page video section."
                items={videos.data}
                links={videos.links}
                columns={columns}
                createHref={create.url()}
                createLabel="Upload Video"
                editHref={(video) => edit.url({ video: video.id })}
                deleteHref={(video) => destroy.url({ video: video.id })}
                getItemLabel={(video) => video.title}
                emptyMessage="No official videos found."
            />
        </>
    );
}

