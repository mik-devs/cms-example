import { Head } from '@inertiajs/react';
import type { News } from '@/types';
import NewsController from '@/actions/App/Http/Controllers/Admin/NewsController';
import NewsForm from '@/pages/admin/news/components/news-form';

export default function EditNews({ news }: { news: News }) {
    return (
        <>
            <Head title={`Edit ${news.title}`} />
            <NewsForm
                title="Edit News"
                backHref={NewsController.index.url()}
                initialValues={news}
                onSubmit={(form) =>
                    form.put(NewsController.update.url(news.id))
                }
                submitLabel="Save Changes"
            />
        </>
    );
}
