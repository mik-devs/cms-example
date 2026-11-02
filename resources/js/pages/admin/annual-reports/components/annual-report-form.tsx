import { useForm, type InertiaForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { AnnualReport } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface AnnualReportFormData {
    title: string;
    category: string;
    pdf_path: File | null;
    year: number;
    date_posted: string;
}

export default function AnnualReportForm({
    initialValues,
    onSubmit,
    submitLabel,
}: {
    initialValues?: AnnualReport;
    onSubmit: (form: InertiaForm<AnnualReportFormData>) => void;
    submitLabel: string;
}) {
    const form = useForm<AnnualReportFormData>({
        title: initialValues?.title ?? '',
        category: initialValues?.category ?? '',
        pdf_path: null,
        year: initialValues?.year ?? new Date().getFullYear(),
        date_posted: initialValues?.date_posted?.slice(0, 10) ?? '',
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
                <Label htmlFor="category">Category</Label>
                <Input
                    id="category"
                    value={form.data.category}
                    onChange={(event) =>
                        form.setData('category', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.category)}
                />
                <InputError message={form.errors.category} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="pdf_path">PDF Document</Label>
                <Input
                    id="pdf_path"
                    type="file"
                    accept="application/pdf,.pdf"
                    required={!initialValues}
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
                <Label htmlFor="year">Year</Label>
                <Input
                    id="year"
                    type="number"
                    value={form.data.year}
                    onChange={(event) =>
                        form.setData(
                            'year',
                            event.target.value === ''
                                ? 0
                                : Number(event.target.value),
                        )
                    }
                    aria-invalid={Boolean(form.errors.year)}
                />
                <InputError message={form.errors.year} />
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
            <Button type="submit" disabled={form.processing}>
                {form.processing ? 'Saving...' : submitLabel}
            </Button>
        </form>
    );
}
