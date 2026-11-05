import { useForm, type InertiaForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { AnnualReport } from '@/types';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormWrapper } from '@/components/kiblawan/ui/form-wrapper';
import { DatePicker } from '@/components/kiblawan/ui/date-picker';
import { format } from 'date-fns';

export interface AnnualReportFormData {
    title: string;
    category: string;
    pdf_path: File | null;
    year: number;
    date_posted: string;
}

interface AnnualReportFormProps {
    initialValues?: AnnualReport;
    onSubmit: (form: InertiaForm<AnnualReportFormData>) => void;
    submitLabel: string;
    title?: string;
    backHref?: string;
}

export default function AnnualReportForm({
    initialValues,
    onSubmit,
    submitLabel,
    title = submitLabel,
    backHref,
}: AnnualReportFormProps) {
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
        <FormWrapper
            title={title}
            backHref={backHref}
            onSubmit={handleSubmit}
            processing={form.processing}
            submitLabel={submitLabel}
        >
            <div className="space-y-6 lg:col-span-2">
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
            </div>

            <div className="space-y-6 bg-cream/50 p-6 rounded-[16px] border border-line-soft h-fit lg:col-span-1">
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
                <div className="grid gap-2">
                    <Label htmlFor="date_posted">Date Posted</Label>
                    <DatePicker
                        value={
                            form.data.date_posted
                                ? new Date(form.data.date_posted + 'T00:00:00')
                                : undefined
                        }
                        onChange={(date) =>
                            form.setData(
                                'date_posted',
                                date ? format(date, 'yyyy-MM-dd') : '',
                            )
                        }
                    />
                    <InputError message={form.errors.date_posted} />
                </div>
            </div>
        </FormWrapper>
    );
}
