import { Head, Link } from '@inertiajs/react';
import type { News } from '@/types';
import NewsController from '@/actions/App/Http/Controllers/Admin/NewsController';
import Heading from '@/components/heading';
import NewsForm from '@/pages/admin/news/components/news-form';

export default function EditNews({ news }: { news: News }) {
    return (
        <>
            <Head title={`Edit ${news.title}`} />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Edit News"
                        description={`Update “${news.title}”.`}
                    />
                    <Link
                        href={NewsController.index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to News
                    </Link>
                </div>
                <NewsForm
                    initialValues={news}
                    onSubmit={(form) =>
                        form.put(NewsController.update.url(news.id))
                    }
                    submitLabel="Save Changes"
                />
            </div>
        </>
    );
}
