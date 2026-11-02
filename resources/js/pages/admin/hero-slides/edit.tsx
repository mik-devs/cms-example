import { Head } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/HeroSlideController';
import type { HeroSlide } from '@/types';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import HeroSlideForm from '@/pages/admin/hero-slides/components/hero-slide-form';

export default function EditHeroSlide({ heroSlide }: { heroSlide: HeroSlide }) {
    return (
        <>
            <Head title={`Edit ${heroSlide.title}`} />
            <AdminFormPage
                title="Edit Hero Slide"
                description={`Update “${heroSlide.title}”.`}
                backHref={index.url()}
                backLabel="Hero Slides"
            >
                <HeroSlideForm
                    initialValues={heroSlide}
                    onSubmit={(form) =>
                        form.put(update.url({ hero_slide: heroSlide.id }))
                    }
                    submitLabel="Save Changes"
                />
            </AdminFormPage>
        </>
    );
}
