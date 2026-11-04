import { Download, FileText } from 'lucide-react';
import { Container } from '@/components/kiblawan/ui/container';
import { GovernmentNavigation } from '@/components/kiblawan/government-navigation';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { Section } from '@/components/kiblawan/ui/section';
import PublicLayout from '@/layouts/public/public-layout';
import type { CitizenCharter } from '@/types';

export default function CitizensCharter({
    charters,
}: {
    charters: CitizenCharter[];
}) {
    return (
        <PublicLayout title="Citizen's Charter | Municipality of Kiblawan">
            <PageHeader
                title="Citizen's Charter"
                subtitle="Official service standards, commitments, and citizen rights when transacting with the Municipality of Kiblawan."
            />

            <Section className="bg-cream py-12 md:py-16">
                <Container>
                    <GovernmentNavigation activeTab="citizens-charter" />

                    {charters.length === 0 ? (
                        <div className="rounded-[24px] border border-line bg-white p-10 text-center text-ink-muted shadow-k-soft">
                            No Citizen's Charter documents have been published
                            yet.
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            {charters.map((charter) => (
                                <article
                                    key={charter.id}
                                    className="flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-white p-6 shadow-k-soft transition-colors duration-300 ease-k-smooth hover:border-primary/30 hover:shadow-k-glow"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                            <FileText
                                                className="size-6"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div>
                                            <h2 className="font-display text-xl leading-snug font-bold text-primary">
                                                {charter.title}
                                            </h2>
                                            {charter.description && (
                                                <p className="mt-2 leading-relaxed text-ink-muted">
                                                    {charter.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <a
                                        href={charter.file_url ?? undefined}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-extrabold tracking-wide text-white transition-all duration-300 ease-k-smooth hover:bg-primary-dark"
                                    >
                                        <Download
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                        Download PDF
                                    </a>
                                </article>
                            ))}
                        </div>
                    )}
                </Container>
            </Section>
        </PublicLayout>
    );
}
