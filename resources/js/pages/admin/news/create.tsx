import { Head } from '@inertiajs/react';
import NewsController from '@/actions/App/Http/Controllers/Admin/NewsController';
import Heading from '@/components/heading';
import { Link } from '@inertiajs/react';
import NewsForm from '@/pages/admin/news/components/news-form';

export default function CreateNews() {
    return (
        <>
            <Head title="Create News" />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Create News"
                        description="Add a news article or announcement."
                    />
                    <Link
                        href={NewsController.index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to News
                    </Link>
                </div>
                <NewsForm
                    onSubmit={(form) =>
                        form.post(NewsController.store.url())
                    }
                    submitLabel="Create News"
                />
            </div>
        </>
    );
}
