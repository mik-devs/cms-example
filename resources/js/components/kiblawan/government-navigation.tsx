import { Link } from '@inertiajs/react';
import {
    citizensCharter,
    directories,
    officials,
    sangguniangBayan,
    visionMission,
} from '@/routes/government';

const tabs = [
    {
        key: 'vision-mission',
        label: 'Vision & Mission',
        href: visionMission.url(),
    },
    { key: 'officials', label: 'Elected Officials', href: officials.url() },
    {
        key: 'sangguniang-bayan',
        label: 'Sangguniang Bayan',
        href: sangguniangBayan.url(),
    },
    {
        key: 'citizens-charter',
        label: "Citizen's Charter",
        href: citizensCharter.url(),
    },
    {
        key: 'directories',
        label: 'Office Directories',
        href: directories.url(),
    },
];

export function GovernmentNavigation({ activeTab }: { activeTab: string }) {
    return (
        <nav
            aria-label="Government sections"
            className="mb-8 flex flex-wrap gap-2"
        >
            {tabs.map((item) => (
                <Link
                    key={item.key}
                    href={item.href}
                    aria-current={activeTab === item.key ? 'page' : undefined}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                        activeTab === item.key
                            ? 'border-primary bg-primary text-white'
                            : 'border-line bg-white text-primary hover:border-primary/30 hover:bg-primary/5'
                    }`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}
