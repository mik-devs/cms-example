import { Link } from '@inertiajs/react';
import { Calendar, FileText } from 'lucide-react';
import { Container } from '@/components/kiblawan/ui/container';
import { Headline } from '@/components/kiblawan/ui/headline';
import { Section } from '@/components/kiblawan/ui/section';
import { formatDate } from '@/lib/format-date';
import type { AnnualReport, Bid } from '@/types';

export function TransparencySeal({
    bids,
    annualReports,
}: {
    bids: Bid[];
    annualReports: AnnualReport[];
}) {
    return (
        <Section className="bg-cream">
            <Container>
                <Headline title="Transparency & Documents" align="center" />

                <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <div className="h-full rounded-[20px] border border-t-4 border-line-soft border-t-green bg-white/80 p-7 px-7 shadow-k-card backdrop-blur-[14px] backdrop-saturate-150 transition-all hover:border-t-gold hover:shadow-k-glow">
                            <h3 className="mb-4 flex items-center justify-between text-[1.05rem] font-bold">
                                <span>Invitation to Bid</span>
                                <Link
                                    href="/transparency/bids"
                                    className="text-[0.78rem] font-extrabold uppercase tracking-[0.06em] text-green-600 hover:text-gold"
                                >
                                    More →
                                </Link>
                            </h3>

                            {bids.map((bid) => (
                                <div
                                    key={bid.id}
                                    className="mb-3 flex items-start gap-3 border-b border-dashed border-line-soft pb-4 last:mb-0 last:border-0 last:pb-0"
                                >
                                    <FileText className="mt-0.5 size-5 shrink-0 text-pdf-red" />
                                    <Link href={bid.pdf_path ?? '#'} className="block flex-1">
                                        <b className="mb-1 block text-[0.88rem] font-bold leading-snug text-forest hover:text-green-600">
                                            {bid.title}
                                        </b>
                                        <span className="flex items-center gap-1.5 text-[0.78rem] text-ink-muted">
                                            <Calendar className="size-3 text-gold" />
                                            {formatDate(bid.date_posted)}
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="h-full rounded-[20px] border border-t-4 border-line-soft border-t-green bg-white/80 p-7 px-7 shadow-k-card backdrop-blur-[14px] backdrop-saturate-150 transition-all hover:border-t-gold hover:shadow-k-glow">
                            <h3 className="mb-4 flex items-center justify-between text-[1.05rem] font-bold">
                                <span>Full Disclosure Policy Reports</span>
                                <Link
                                    href="/transparency/reports"
                                    className="text-[0.78rem] font-extrabold uppercase tracking-[0.06em] text-green-600 hover:text-gold"
                                >
                                    Archive →
                                </Link>
                            </h3>

                            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
                                {annualReports.map((report) => (
                                    <div
                                        key={report.id}
                                        className="mb-3 flex items-start gap-3 border-b border-dashed border-line-soft pb-4"
                                    >
                                        <FileText className="mt-0.5 size-5 shrink-0 text-pdf-red" />
                                        <Link href={report.pdf_path || '#'} className="block flex-1">
                                            <b className="block text-[0.88rem] font-bold leading-snug text-forest hover:text-green-600">
                                                {report.title}
                                            </b>
                                        </Link>
                                        <Link
                                            href={report.pdf_path || '#'}
                                            className="shrink-0 text-[0.78rem] font-extrabold uppercase tracking-[0.06em] text-green-600 hover:text-gold"
                                        >
                                            View
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
