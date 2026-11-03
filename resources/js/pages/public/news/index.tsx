import { Link } from '@inertiajs/react';
import { Container } from '@/components/kiblawan/ui/container';
import { NewsCard } from '@/components/kiblawan/ui/news-card';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import PublicLayout from '@/layouts/public/public-layout';
import type { News } from '@/types';

interface NewsPageData {
    data: News[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

function paginationLabel(label: string): string {
    return label
        .replaceAll('&laquo;', '←')
        .replaceAll('&raquo;', '→')
        .replaceAll('&hellip;', '…');
}

export default function NewsIndex({ news }: { news: NewsPageData }) {
    return (
        <PublicLayout title="News & Announcements">
            <PageHeader
                title="News & Announcements"
                subtitle="The latest updates from the Municipality of Kiblawan."
            />
            <Container className="py-12 md:py-16">
                {news.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {news.data.map((item) => (
                                <NewsCard key={item.id} news={item} />
                            ))}
                        </div>

                        {news.links.length > 0 && (
                            <nav
                                aria-label="News pagination"
                                className="mt-10 flex flex-wrap justify-center gap-2"
                            >
                                {news.links.map((link, index) => {
                                    const label = paginationLabel(link.label);
                                    const className = `inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition-colors ${
                                        link.active
                                            ? 'border-gold bg-gold text-primary'
                                            : link.url
                                              ? 'border-line bg-white text-primary hover:border-gold hover:bg-cream'
                                              : 'cursor-not-allowed border-line bg-cream text-ink-muted'
                                    }`;

                                    return link.url ? (
                                        <Link
                                            key={`${index}-${label}`}
                                            href={link.url}
                                            aria-current={
                                                link.active ? 'page' : undefined
                                            }
                                            className={className}
                                        >
                                            {label}
                                        </Link>
                                    ) : (
                                        <span
                                            key={`${index}-${label}`}
                                            aria-disabled="true"
                                            className={className}
                                        >
                                            {label}
                                        </span>
                                    );
                                })}
                            </nav>
                        )}
                    </>
                ) : (
                    <p className="rounded-[20px] border border-line bg-white p-8 text-ink-muted">
                        No news or announcements are available right now.
                    </p>
                )}
            </Container>
        </PublicLayout>
    );
}
