import { useForm, type InertiaForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { Bid } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface BidFormData {
    title: string;
    pdf_path: File | null;
    date_posted: string;
    status: 'open' | 'closed';
}

export default function BidForm({
    initialValues,
    onSubmit,
    submitLabel,
}: {
    initialValues?: Bid;
    onSubmit: (form: InertiaForm<BidFormData>) => void;
    submitLabel: string;
}) {
    const form = useForm<BidFormData>({
        title: initialValues?.title ?? '',
        pdf_path: null,
        date_posted: initialValues?.date_posted?.slice(0, 10) ?? '',
        status: initialValues?.status ?? 'open',
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={form.data.title}
                    onChange={(event) =>
                        form.setData('title', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.title)}
                />
                <InputError message={form.errors.title} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="pdf_path">PDF Document</Label>
                <Input
                    id="pdf_path"
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={(event) =>
                        form.setData(
                            'pdf_path',
                            event.target.files?.[0] ?? null,
                        )
                    }
                    aria-invalid={Boolean(form.errors.pdf_path)}
                />
                {initialValues?.pdf_url && (
                    <a
                        href={initialValues.pdf_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-primary underline"
                    >
                        View current PDF
                    </a>
                )}
                <InputError message={form.errors.pdf_path} />
            </div>
            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="date_posted">Date Posted</Label>
                <Input
                    id="date_posted"
                    type="date"
                    value={form.data.date_posted}
                    onChange={(event) =>
                        form.setData('date_posted', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.date_posted)}
                />
                <InputError message={form.errors.date_posted} />
            </div>
            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="status">Status</Label>
                <select
                    id="status"
                    value={form.data.status}
                    onChange={(event) => {
                        const status = event.target.value;

                        if (status === 'open' || status === 'closed') {
                            form.setData('status', status);
                        }
                    }}
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                </select>
                <InputError message={form.errors.status} />
            </div>
            <Button type="submit" disabled={form.processing}>
                {form.processing ? 'Saving...' : submitLabel}
            </Button>
        </form>
    );
}
