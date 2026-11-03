import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import {
    create,
    destroy,
    edit,
} from '@/actions/App/Http/Controllers/Admin/HeroSlideController';
import ResourceTable, {
    type ResourceTableColumn,
} from '@/pages/admin/components/resource-table';
import type { HeroSlide } from '@/types';

interface PaginatedHeroSlides {
    data: HeroSlide[];
    links: { url: string | null; label: string; active: boolean }[];
}

const columns: ResourceTableColumn<HeroSlide>[] = [
    {
        label: 'Image',
        render: (slide) => (
            <img
                src={slide.image_url}
                alt=""
                className="size-20 rounded-md object-cover"
            />
        ),
    },
    { label: 'Kicker', render: (slide) => slide.kicker ?? '—' },
    { label: 'Title', render: (slide) => slide.title },
    { label: 'Order', render: (slide) => slide.order },
    {
        label: 'Status',
        render: (slide) => (
            <Badge
                className={
                    slide.is_active
                        ? 'border-transparent bg-green text-white'
                        : 'border-transparent bg-gold text-ink'
                }
            >
                {slide.is_active ? 'Active' : 'Inactive'}
            </Badge>
        ),
    },
];

export default function HeroSlidesIndex({
    heroSlides,
}: {
    heroSlides: PaginatedHeroSlides;
}) {
    return (
        <>
            <Head title="Hero Slides" />
            <ResourceTable
                title="Hero Slides"
                description="Manage the images and text shown in the home page hero carousel."
                items={heroSlides.data}
                links={heroSlides.links}
                columns={columns}
                createHref={create.url()}
                editHref={(slide) => edit.url({ hero_slide: slide.id })}
                deleteHref={(slide) => destroy.url({ hero_slide: slide.id })}
                getItemLabel={(slide) => slide.title}
                emptyMessage="No hero slides found."
            />
        </>
    );
}
