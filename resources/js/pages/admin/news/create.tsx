import { Head } from '@inertiajs/react';
import NewsController from '@/actions/App/Http/Controllers/Admin/NewsController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import NewsForm from '@/pages/admin/news/components/news-form';

export default function CreateNews() {
    return (
        <>
            <Head title="Create News" />
            <AdminFormPage
                title="Create News"
                description="Add a news article or announcement."
                backHref={NewsController.index.url()}
                backLabel="News"
            >
                <NewsForm
                    onSubmit={(form) => form.post(NewsController.store.url())}
                    submitLabel="Create News"
                />
            </AdminFormPage>
        </>
    );
}
