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
    settings,
}: {
    tab: string | null;
    settings: Record<string, string | null>;
}) {
    const activeTab = tab ?? 'overview';
    const title = tabTitles[activeTab] ?? 'Government of Kiblawan';

    return (
        <PublicLayout title={title}>
            <PageHeader title="Government" />
            <Container className="py-12 md:py-16">
                <GovernmentNavigation activeTab={activeTab} />
                <article className="rounded-[24px] border border-line-soft bg-white p-6 shadow-sm md:p-9">
                    <h1 className="mb-2 font-display text-3xl font-bold text-primary">
                        The Government of Kiblawan
                    </h1>
                    <p className="mb-6 text-lg font-semibold text-forest">
                        Dedicated to transparent, efficient, and people-centered
                        governance.
                    </p>

                    <h2 className="mb-3 font-display text-xl font-bold text-primary">
                        About the Government
                    </h2>
                    <p className="mb-8 leading-relaxed text-ink-muted">
                        {settings.gov_welcome_text}
                    </p>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <h3 className="mb-2 font-display text-lg font-bold text-forest">
                                Vision
                            </h3>
                            <p className="leading-relaxed text-ink-muted">
                                {settings.gov_vision}
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2 font-display text-lg font-bold text-forest">
                                Mission
                            </h3>
                            <p className="leading-relaxed text-ink-muted">
                                {settings.gov_mission}
                            </p>
                        </div>
                    </div>
                </article>
            </Container>
        </PublicLayout>
    );
}
