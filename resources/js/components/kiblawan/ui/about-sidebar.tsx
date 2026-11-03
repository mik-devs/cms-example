import { Link } from '@inertiajs/react';
import { Globe2, History, Mountain, Users } from 'lucide-react';

const sections = [
    { key: 'history', label: 'History', icon: History, href: '/about/history' },
    {
        key: 'demographic',
        label: 'Demographic',
        icon: Users,
        href: '/about/demographic',
    },
    {
        key: 'socio-economic',
        label: 'Socio-Economic',
        icon: Globe2,
        href: '/about/socio-economic',
    },
    {
        key: 'geography',
        label: 'Geography',
        icon: Mountain,
        href: '/about/geography',
    },
] as const;

export function AboutSidebar({ currentSection }: { currentSection: string }) {
    return (
        <nav
            aria-label="About Kiblawan sections"
            className="sticky top-[calc(var(--nav-offset)+1.5rem)]"
        >
            <p className="mb-3 hidden px-3 text-xs font-extrabold tracking-[0.18em] text-ink-muted uppercase lg:block">
                Explore Kiblawan
            </p>
            <div className="flex [scrollbar-width:none] gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
                {sections.map(({ key, label, icon: Icon, href }) => {
                    const isActive = currentSection === key;

                    return (
                        <Link
                            key={key}
                            href={href}
                            aria-current={isActive ? 'page' : undefined}
                            className={`inline-flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition-colors duration-300 lg:w-full ${
                                isActive
                                    ? 'border-primary bg-primary text-white shadow-sm'
                                    : 'border-line bg-white text-primary shadow-sm hover:border-primary/30 hover:bg-primary/5 hover:text-primary'
                            }`}
                        >
                            <Icon
                                className="size-4 shrink-0"
                                aria-hidden="true"
                            />
                            {label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
