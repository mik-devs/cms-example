import { Link } from '@inertiajs/react';
import { Container } from '@/components/kiblawan/ui/container';
import { KImage } from '@/components/kiblawan/ui/k-image';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import PublicLayout from '@/layouts/public/public-layout';
import type { Official } from '@/types';

const tabs = [
    { key: 'vision-mission', label: 'Vision & Mission', href: '/government/vision-mission' },
    { key: 'officials', label: 'Elected Officials', href: '/government/officials' },
    { key: 'sangguniang-bayan', label: 'Sangguniang Bayan', href: '/government/sangguniang-bayan' },
    { key: 'citizens-charter', label: "Citizen's Charter", href: '/government/citizens-charter' },
    { key: 'directories', label: 'Office Directories', href: '/government/directories' },
];

const tabTitles: Record<string, string> = {
    'vision-mission': 'Vision & Mission',
    officials: 'Elected Officials',
    'sangguniang-bayan': 'Sangguniang Bayan',
    'citizens-charter': "Citizen's Charter",
    directories: 'Office Directories',
};

export default function Government({
    officials,
    tab,
}: {
    officials: Official[];
    settings: Record<string, string | null>;
    tab: string | null;
}) {
    const activeTab = tab ?? 'overview';
    const title = tabTitles[activeTab] ?? 'Government of Kiblawan';

    return (
        <PublicLayout title={title}>
            <PageHeader title="Government" />
            <Container className="py-12 md:py-16">
                <nav
                    aria-label="Government sections"
                    className="mb-8 flex flex-wrap gap-2"
                >
                    {tabs.map((item) => (
                        <Link
                            key={item.key}
                            href={item.href}
                            aria-current={
                                activeTab === item.key ? 'page' : undefined
                            }
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                                activeTab === item.key
                                    ? 'border-forest bg-forest text-white'
                                    : 'border-line-soft bg-white text-forest hover:border-gold hover:bg-cream'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {activeTab === 'officials' ? (
                    officials.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {officials.map((official) => (
                                <article
                                    key={official.id}
                                    className="overflow-hidden rounded-[20px] border border-white/80 bg-white/75 shadow-k-card backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-k-card"
                                >
                                    <KImage
                                        src={official.photo_url ?? '/images/image.png'}
                                        alt={official.name}
                                        className="aspect-[4/3] w-full object-cover"
                                    />
                                    <div className="p-5">
                                        <h2 className="font-display text-xl font-bold text-forest">
                                            {official.name}
                                        </h2>
                                        <p className="mt-1 text-sm text-ink-muted">
                                            {official.position}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-[20px] border border-line-soft bg-white/80 p-8 text-ink-muted">
                            Elected officials will be listed here soon.
                        </p>
                    )
                ) : (
                    <article className="rounded-[20px] border border-line-soft bg-white/80 p-6 shadow-k-soft md:p-9">
                        <h2 className="mb-4 font-display text-2xl font-bold text-forest">
                            {title}
                        </h2>
                        <p className="m-0 text-ink-muted">
                            Content coming soon. This section will be populated
                            via the CMS.
                        </p>
                    </article>
                )}
            </Container>
        </PublicLayout>
    );
}
