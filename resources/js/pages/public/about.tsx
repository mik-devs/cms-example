import { Link } from '@inertiajs/react';
import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import PublicLayout from '@/layouts/public/public-layout';

const sections = [
    { key: 'history', label: 'History', href: '/about/history' },
    { key: 'demographic', label: 'Demographics', href: '/about/demographic' },
    {
        key: 'socio-economic',
        label: 'Socio-Economic Profile',
        href: '/about/socio-economic',
    },
    { key: 'geography', label: 'Geography', href: '/about/geography' },
];

const sectionTitles: Record<string, string> = {
    history: 'History of Kiblawan',
    demographic: 'Demographic Profile',
    'socio-economic': 'Socio-Economic Profile',
    geography: 'Physical / Geographical Profile',
};

export default function About({
    section,
}: {
    settings: Record<string, string | null>;
    section: string | null;
}) {
    const activeSection = section ?? 'overview';
    const title = sectionTitles[activeSection] ?? 'About Kiblawan';

    return (
        <PublicLayout title={title}>
            <PageHeader
                title="About Kiblawan"
                subtitle="Learn about the municipality, its people, and its communities."
            />
            <Container className="py-12 md:py-16">
                <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                    <nav
                        aria-label="About Kiblawan sections"
                        className="flex flex-col gap-2"
                    >
                        {sections.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                aria-current={
                                    activeSection === item.key
                                        ? 'page'
                                        : undefined
                                }
                                className={`rounded-[12px] border px-4 py-3 transition-colors ${
                                    activeSection === item.key
                                        ? 'border-green-soft bg-green-soft text-forest'
                                        : 'border-line-soft bg-white/70 text-forest hover:border-green-soft hover:bg-green-soft'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <article className="rounded-[20px] border border-line-soft bg-white/80 p-6 shadow-k-soft md:p-9">
                        <h2 className="mb-4 font-display text-2xl font-bold text-forest">
                            {title}
                        </h2>
                        <p className="m-0 text-ink-muted">
                            Content coming soon. This section will be populated
                            via the CMS.
                        </p>
                    </article>
                </div>
            </Container>
        </PublicLayout>
    );
}
