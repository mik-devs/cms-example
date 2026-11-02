import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/HeroSlideController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import HeroSlideForm from '@/pages/admin/hero-slides/components/hero-slide-form';

export default function CreateHeroSlide() {
    return (
        <>
            <Head title="Create Hero Slide" />
            <AdminFormPage
                title="Create Hero Slide"
                description="Add a slide to the home page carousel."
                backHref={index.url()}
                backLabel="Hero Slides"
            >
                <HeroSlideForm
                    onSubmit={(form) => form.post(store.url())}
                    submitLabel="Create Hero Slide"
                />
            </AdminFormPage>
        </>
    );
}
