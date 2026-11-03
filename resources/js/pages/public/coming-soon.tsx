import { Link } from '@inertiajs/react';
import { Construction } from 'lucide-react';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import PublicLayout from '@/layouts/public/public-layout';

export default function ComingSoon({ title }: { title: string }) {
    return (
        <PublicLayout title={title}>
            <PageHeader title={title} />
            <Container className="py-16 md:py-24">
                <div className="mx-auto flex max-w-xl flex-col items-center rounded-[24px] border border-line bg-white px-6 py-12 text-center shadow-k-card">
                    <Construction className="mb-5 size-12 text-primary" />
                    <h2 className="mb-3 font-display text-2xl font-bold text-primary">
                        This section is under construction
                    </h2>
                    <p className="mb-7 text-ink-muted">
                        Please check back soon for more information.
                    </p>
                    <Link
                        href="/"
                        className="rounded-full bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-green"
                    >
                        Back to Home
                    </Link>
                </div>
            </Container>
        </PublicLayout>
    );
}
