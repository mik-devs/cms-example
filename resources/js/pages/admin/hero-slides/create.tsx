import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/HeroSlideController';
import HeroSlideForm from '@/pages/admin/hero-slides/components/hero-slide-form';

export default function CreateHeroSlide() {
    return (
        <>
            <Head title="Create Hero Slide" />
            <HeroSlideForm
                title="Create Hero Slide"
                backHref={index.url()}
                onSubmit={(form) => form.post(store.url())}
                submitLabel="Create Hero Slide"
            />
        </>
    );
}
