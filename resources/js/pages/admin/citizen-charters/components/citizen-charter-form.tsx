import { useForm, type InertiaForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { CitizenCharter } from '@/types';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormWrapper } from '@/components/kiblawan/ui/form-wrapper';

export interface CitizenCharterFormData {
    title: string;
    description: string;
    file_path: File | null;
    order: number;
}

interface CitizenCharterFormProps {
    initialValues?: CitizenCharter;
    onSubmit: (form: InertiaForm<CitizenCharterFormData>) => void;
    submitLabel: string;
    title?: string;
    backHref?: string;
}

export default function CitizenCharterForm({
    initialValues,
    onSubmit,
    submitLabel,
    title = submitLabel,
    backHref,
}: CitizenCharterFormProps) {
    const form = useForm<CitizenCharterFormData>({
        title: initialValues?.title ?? '',
        description: initialValues?.description ?? '',
        file_path: null,
        order: initialValues?.order ?? 0,
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
                    <Label htmlFor="title">
                        Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="title"
                        required
                        value={form.data.title}
                        onChange={(event) =>
                            form.setData('title', event.target.value)
                        }
                        aria-invalid={Boolean(form.errors.title)}
                    />
                    <InputError message={form.errors.title} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                        id="description"
                        value={form.data.description}
                        onChange={(event) =>
                            form.setData('description', event.target.value)
                        }
                        aria-invalid={Boolean(form.errors.description)}
                        className="min-h-32 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive"
                    />
                    <InputError message={form.errors.description} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="file_path">
                        PDF Document
                        {!initialValues && (
                            <span className="text-red-500"> *</span>
                        )}
                    </Label>
                    <Input
                        id="file_path"
                        type="file"
                        accept="application/pdf,.pdf"
                        required={!initialValues}
                        onChange={(event) =>
                            form.setData(
                                'file_path',
                                event.currentTarget.files?.[0] ?? null,
                            )
                        }
                        aria-invalid={Boolean(form.errors.file_path)}
                    />
                    {initialValues?.file_url && (
                        <a
                            href={initialValues.file_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-primary underline"
                        >
                            View current PDF
                        </a>
                    )}
                    <InputError message={form.errors.file_path} />
                </div>
            </div>

            <div className="space-y-6 bg-cream/50 p-6 rounded-[16px] border border-line-soft h-fit lg:col-span-1">
                <div className="grid gap-2 sm:max-w-xs">
                    <Label htmlFor="order">
                        Order <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="order"
                        type="number"
                        min={0}
                        required
                        value={form.data.order}
                        onChange={(event) =>
                            form.setData(
                                'order',
                                event.target.value === ''
                                    ? 0
                                    : Number(event.target.value),
                            )
                        }
                        aria-invalid={Boolean(form.errors.order)}
                    />
                    <InputError message={form.errors.order} />
                </div>
            </div>
        </FormWrapper>
    );
}