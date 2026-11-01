import { Head, Link } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/HeroSlideController';
import Heading from '@/components/heading';
import HeroSlideForm from '@/pages/admin/hero-slides/components/hero-slide-form';

export default function CreateHeroSlide() {
    return (
        <>
            <Head title="Create Hero Slide" />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Create Hero Slide"
                        description="Add a slide to the home page carousel."
                    />
                    <Link
                        href={index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Hero Slides
                    </Link>
                </div>
                <HeroSlideForm
                    onSubmit={(form) => form.post(store.url())}
                    submitLabel="Create Hero Slide"
                />
            </div>
        </>
    );
}
