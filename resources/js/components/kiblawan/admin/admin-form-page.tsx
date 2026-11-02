import type { ReactNode } from 'react';
import PageBanner from '@/components/kiblawan/admin/page-banner';

interface AdminFormPageProps {
    title: string;
    description: string;
    backHref: string;
    backLabel: string;
    children: ReactNode;
}

export default function AdminFormPage({
    title,
    description,
    backHref,
    backLabel,
    children,
}: AdminFormPageProps) {
    return (
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 p-6 md:p-8">
            <PageBanner
                title={title}
                subtitle={description}
                backHref={backHref}
                backLabel={backLabel}
            />
            <div className="rounded-[20px] border border-line-soft bg-white p-6 shadow-sm">
                {children}
            </div>
        </div>
    );
}
