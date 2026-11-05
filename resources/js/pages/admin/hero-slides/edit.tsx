import { Head } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/HeroSlideController';
import type { HeroSlide } from '@/types';
import HeroSlideForm from '@/pages/admin/hero-slides/components/hero-slide-form';

export default function EditHeroSlide({ heroSlide }: { heroSlide: HeroSlide }) {
    return (
        <>
            <Head title={`Edit ${heroSlide.title}`} />
            <HeroSlideForm
                title="Edit Hero Slide"
                backHref={index.url()}
                initialValues={heroSlide}
                onSubmit={(form) =>
                    form.put(update.url({ hero_slide: heroSlide.id }))
                }
                submitLabel="Save Changes"
            />
        </>
    );
}
