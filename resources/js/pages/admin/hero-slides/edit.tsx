import { Head, Link } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/HeroSlideController';
import type { HeroSlide } from '@/types';
import Heading from '@/components/heading';
import HeroSlideForm from '@/pages/admin/hero-slides/components/hero-slide-form';

export default function EditHeroSlide({ heroSlide }: { heroSlide: HeroSlide }) {
    return (
        <>
            <Head title={`Edit ${heroSlide.title}`} />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Edit Hero Slide"
                        description={`Update “${heroSlide.title}”.`}
                    />
                    <Link
                        href={index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Hero Slides
                    </Link>
                </div>
                <HeroSlideForm
                    initialValues={heroSlide}
                    onSubmit={(form) =>
                        form.put(update.url({ hero_slide: heroSlide.id }))
                    }
                    submitLabel="Save Changes"
                />
            </div>
        </>
    );
}
