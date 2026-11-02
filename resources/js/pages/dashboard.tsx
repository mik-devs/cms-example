import { Head, Link } from '@inertiajs/react';
import { BriefcaseBusiness, Gavel, Newspaper, Plus, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import NewsController from '@/actions/App/Http/Controllers/Admin/NewsController';
import JobController from '@/actions/App/Http/Controllers/Admin/JobController';
import BidController from '@/actions/App/Http/Controllers/Admin/BidController';
import PageBanner from '@/components/kiblawan/admin/page-banner';
import { cn } from '@/lib/utils';

type DashboardStats = {
    news: number;
    jobs: number;
    bids: number;
    officials: number;
};

type StatCard = {
    key: keyof DashboardStats;
    label: string;
    icon: LucideIcon;
    accentClassName: string;
};

const statCards: StatCard[] = [
    {
        key: 'news',
        label: 'Total News',
        icon: Newspaper,
        accentClassName: 'bg-cream text-gold',
    },
    {
        key: 'jobs',
        label: 'Total Jobs',
        icon: BriefcaseBusiness,
        accentClassName: 'bg-green-soft text-green',
    },
    {
        key: 'bids',
        label: 'Total Bids',
        icon: Gavel,
        accentClassName: 'bg-gold-soft text-maroon',
    },
    {
        key: 'officials',
        label: 'Total Officials',
        icon: Users,
        accentClassName: 'bg-green-soft text-forest',
    },
];

const quickActions = [
    { label: 'Add News', href: NewsController.create.url(), icon: Newspaper },
    {
        label: 'Add Job',
        href: JobController.create.url(),
        icon: BriefcaseBusiness,
    },
    { label: 'Add Bid', href: BidController.create.url(), icon: Gavel },
];

export default function Dashboard({
    stats = { news: 0, jobs: 0, bids: 0, officials: 0 },
}: {
    stats?: DashboardStats;
}) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 p-6 md:p-8">
                <PageBanner
                    title="Dashboard"
                    subtitle="Welcome back to the Kiblawan Admin Console."
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((card) => (
                        <div
                            key={card.key}
                            className="rounded-xl border border-line-soft bg-white p-6 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-ink-muted">
                                        {card.label}
                                    </p>
                                    <p className="mt-3 font-display text-3xl font-bold text-forest">
                                        {Number(
                                            stats[card.key] ?? 0,
                                        ).toLocaleString()}
                                    </p>
                                </div>
                                <span
                                    className={cn(
                                        'flex size-11 shrink-0 items-center justify-center rounded-full',
                                        card.accentClassName,
                                    )}
                                >
                                    <card.icon className="size-5" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <section className="rounded-xl border border-line-soft bg-white p-6 shadow-sm">
                    <div>
                        <h2 className="font-display text-lg font-bold text-forest">
                            Quick Actions
                        </h2>
                        <p className="mt-1 text-sm text-ink-muted">
                            Create new content for the public website.
                        </p>
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {quickActions.map((action) => (
                            <Link
                                key={action.label}
                                href={action.href}
                                prefetch
                                className="flex items-center justify-center gap-2 rounded-lg bg-forest px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-forest-deep focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:outline-none"
                            >
                                <Plus className="h-4 w-4" />
                                {action.label}
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/admin',
        },
    ],
};
