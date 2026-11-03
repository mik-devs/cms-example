import { Link } from '@inertiajs/react';
import { Container } from '@/components/kiblawan/ui/container';
import { KImage } from '@/components/kiblawan/ui/k-image';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { formatDate } from '@/lib/format-date';
import PublicLayout from '@/layouts/public/public-layout';
import type { News } from '@/types';

export default function NewsShow({ news }: { news: News }) {
    return (
        <PublicLayout title={news.title}>
            <PageHeader
                title={news.title}
                subtitle={formatDate(news.published_at)}
            />
            <Container className="py-12 md:py-16">
                <article className="mx-auto max-w-4xl">
                    {news.image_url && (
                        <KImage
                            src={news.image_url}
                            alt={news.title}
                            className="mb-8 aspect-[21/9] w-full rounded-xl object-cover"
                        />
                    )}
                    <div className="rounded-[20px] border border-line bg-white p-6 shadow-k-soft md:p-10">
                        <p className="leading-relaxed whitespace-pre-line text-ink">
                            {news.content}
                        </p>
                    </div>
                    <Link
                        href="/news"
                        className="mt-8 inline-flex font-bold text-green-dark hover:text-primary"
                    >
                        ← Back to News
                    </Link>
                </article>
            </Container>
        </PublicLayout>
    );
}
