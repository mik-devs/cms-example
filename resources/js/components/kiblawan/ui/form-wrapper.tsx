import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { PageBanner } from '@/components/kiblawan/ui/page-banner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FormWrapperProps = {
    title: string;
    subtitle?: string;
    backHref?: string;
    backLabel?: string;
    children: ReactNode;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    processing?: boolean;
    submitLabel?: string;
    className?: string;
};

export function FormWrapper({
    title,
    subtitle,
    backHref,
    backLabel = 'Back',
    children,
    onSubmit,
    processing = false,
    submitLabel = 'Save',
    className,
}: FormWrapperProps) {
    return (
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 p-6 md:p-8">
            {/* THE PREMIUM BANNER */}
            <PageBanner
                title={title}
                subtitle={subtitle || `Manage ${title.toLowerCase()} details.`}
            >
                {backHref && (
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur-sm transition-colors hover:text-gold"
                    >
                        <ArrowLeft className="size-4" /> {backLabel}
                    </Link>
                )}
            </PageBanner>

            {/* THE FORM CONTENT */}
            <form
                onSubmit={onSubmit}
                className={cn('flex flex-col gap-6', className)}
            >
                <div className="grid gap-6 lg:grid-cols-3">{children}</div>

                <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 rounded-2xl border border-line-soft bg-background/95 px-6 py-4 shadow-sm backdrop-blur">
                    {backHref && (
                        <Button variant="outline" asChild>
                            <Link href={backHref}>Cancel</Link>
                        </Button>
                    )}
                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-primary text-white hover:bg-forest"
                    >
                        {processing ? 'Saving...' : submitLabel}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default FormWrapper;
