import { Head } from '@inertiajs/react';
import type { News } from '@/types';
import NewsController from '@/actions/App/Http/Controllers/Admin/NewsController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import NewsForm from '@/pages/admin/news/components/news-form';

export default function EditNews({ news }: { news: News }) {
    return (
        <>
            <Head title={`Edit ${news.title}`} />
            <AdminFormPage
                title="Edit News"
                description={`Update “${news.title}”.`}
                backHref={NewsController.index.url()}
                backLabel="News"
            >
                <NewsForm
                    initialValues={news}
                    onSubmit={(form) =>
                        form.put(NewsController.update.url(news.id))
                    }
                    submitLabel="Save Changes"
                />
            </AdminFormPage>
        </>
    );
}
