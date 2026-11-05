import { Head } from '@inertiajs/react';
import NewsController from '@/actions/App/Http/Controllers/Admin/NewsController';
import NewsForm from '@/pages/admin/news/components/news-form';

export default function CreateNews() {
    return (
        <>
            <Head title="Create News" />
            <NewsForm
                title="Create News"
                backHref={NewsController.index.url()}
                onSubmit={(form) => form.post(NewsController.store.url())}
                submitLabel="Create News"
            />
        </>
    );
}
