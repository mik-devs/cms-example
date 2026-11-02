import { Container } from '@/components/kiblawan/ui/container';
import { GovernmentNavigation } from '@/components/kiblawan/government-navigation';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import PublicLayout from '@/layouts/public/public-layout';

const tabTitles: Record<string, string> = {
    'vision-mission': 'Vision & Mission',
    officials: 'Elected Officials',
    'sangguniang-bayan': 'Sangguniang Bayan',
    'citizens-charter': "Citizen's Charter",
    directories: 'Office Directories',
};

export default function Government({
    tab,
}: {
    tab: string | null;
}) {
    const activeTab = tab ?? 'overview';
    const title = tabTitles[activeTab] ?? 'Government of Kiblawan';

    return (
        <PublicLayout title={title}>
            <PageHeader title="Government" />
            <Container className="py-12 md:py-16">
                <GovernmentNavigation activeTab={activeTab} />
                <article className="rounded-[20px] border border-line-soft bg-white/80 p-6 shadow-k-soft md:p-9">
                    <h2 className="mb-4 font-display text-2xl font-bold text-forest">
                        {title}
                    </h2>
                    <p className="m-0 text-ink-muted">
                        Content coming soon. This section will be populated via
                        the CMS.
                    </p>
                </article>
            </Container>
        </PublicLayout>
    );
}
