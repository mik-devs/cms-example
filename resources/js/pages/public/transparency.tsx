import { Link } from '@inertiajs/react';
import { Calendar, FileText } from 'lucide-react';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { formatDate } from '@/lib/format-date';
import PublicLayout from '@/layouts/public/public-layout';
import type { AnnualReport, Bid } from '@/types';

export default function Transparency({
    bids,
    annualReports,
    tab,
}: {
    bids: Bid[];
    annualReports: AnnualReport[];
    tab: 'bids' | 'reports' | null;
}) {
    return (
        <PublicLayout title="Transparency">
            <PageHeader
                title="Transparency"
                subtitle="Access public procurement and full disclosure documents."
            />
            <Container className="py-12 md:py-16">
                <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
                    <section
                        id="bids"
                        className={`h-full rounded-[20px] border border-t-4 border-line-soft border-t-green bg-white/80 p-6 shadow-k-card md:p-7 ${
                            tab === 'bids' ? 'ring-2 ring-gold/40' : ''
                        }`}
                    >
                        <h2 className="mb-5 font-display text-xl font-bold text-forest">
                            Bids & Awards
                        </h2>
                        {bids.length > 0 ? (
                            <ul className="m-0 list-none p-0">
                                {bids.map((bid) => (
                                    <li
                                        key={bid.id}
                                        className="flex items-start gap-3 border-b border-dashed border-line-soft py-4 first:pt-0 last:border-0 last:pb-0"
                                    >
                                        <FileText className="mt-1 size-5 shrink-0 text-pdf-red" />
                                        <div className="min-w-0 flex-1">
                                            {bid.pdf_path ? (
                                                <a
                                                    href={bid.pdf_path}
                                                    className="font-bold text-forest hover:text-green-600"
                                                >
                                                    {bid.title}
                                                </a>
                                            ) : (
                                                <span className="font-bold text-forest">
                                                    {bid.title}
                                                </span>
                                            )}
                                            <span className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
                                                <Calendar className="size-3 text-gold" />
                                                {formatDate(bid.date_posted)}
                                            </span>
                                        </div>
                                        <span className="rounded-full bg-green-soft px-2.5 py-1 text-xs font-semibold text-forest">
                                            {bid.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-ink-muted">
                                No bid documents are currently available.
                            </p>
                        )}
                        <Link
                            href="/transparency/bids"
                            className="mt-6 inline-flex font-semibold text-green-600 hover:text-gold"
                        >
                            View bid documents
                        </Link>
                    </section>

                    <section
                        id="reports"
                        className={`h-full rounded-[20px] border border-t-4 border-line-soft border-t-green bg-white/80 p-6 shadow-k-card md:p-7 ${
                            tab === 'reports' ? 'ring-2 ring-gold/40' : ''
                        }`}
                    >
                        <h2 className="mb-5 font-display text-xl font-bold text-forest">
                            Full Disclosure Reports
                        </h2>
                        {annualReports.length > 0 ? (
                            <ul className="m-0 list-none p-0">
                                {annualReports.map((report) => (
                                    <li
                                        key={report.id}
                                        className="flex items-start gap-3 border-b border-dashed border-line-soft py-4 first:pt-0 last:border-0 last:pb-0"
                                    >
                                        <FileText className="mt-1 size-5 shrink-0 text-pdf-red" />
                                        <div className="min-w-0 flex-1">
                                            {report.pdf_path ? (
                                                <a
                                                    href={report.pdf_path}
                                                    className="font-bold text-forest hover:text-green-600"
                                                >
                                                    {report.title}
                                                </a>
                                            ) : (
                                                <span className="font-bold text-forest">
                                                    {report.title}
                                                </span>
                                            )}
                                            <span className="mt-1 block text-xs text-ink-muted">
                                                {report.year}
                                                {report.category
                                                    ? ` · ${report.category}`
                                                    : ''}
                                            </span>
                                        </div>
                                        <span className="shrink-0 text-xs text-ink-muted">
                                            {formatDate(report.date_posted)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-ink-muted">
                                No disclosure reports are currently available.
                            </p>
                        )}
                        <Link
                            href="/transparency/reports"
                            className="mt-6 inline-flex font-semibold text-green-600 hover:text-gold"
                        >
                            View disclosure reports
                        </Link>
                    </section>
                </div>
            </Container>
        </PublicLayout>
    );
}
