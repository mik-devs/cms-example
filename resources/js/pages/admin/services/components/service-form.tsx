import { useForm, type InertiaForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { Service } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface ServiceFormData {
    title: string;
    description: string;
    icon: string;
    link: string;
    order: number;
    is_active: boolean;
}

export default function ServiceForm({
    initialValues,
    onSubmit,
    submitLabel,
}: {
    initialValues?: Service;
    onSubmit: (form: InertiaForm<ServiceFormData>) => void;
    submitLabel: string;
}) {
    const form = useForm<ServiceFormData>({
        title: initialValues?.title ?? '',
        description: initialValues?.description ?? '',
        icon: initialValues?.icon ?? '',
        link: initialValues?.link ?? '',
        order: initialValues?.order ?? 0,
        is_active: initialValues?.is_active ?? true,
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
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
                <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                </Label>
                <textarea
                    id="description"
                    required
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
                <Label htmlFor="icon">
                    Icon <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="icon"
                    required
                    placeholder="e.g. Briefcase"
                    value={form.data.icon}
                    onChange={(event) =>
                        form.setData('icon', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.icon)}
                />
                <InputError message={form.errors.icon} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="link">Link</Label>
                <Input
                    id="link"
                    value={form.data.link}
                    onChange={(event) =>
                        form.setData('link', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.link)}
                />
                <InputError message={form.errors.link} />
            </div>
            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="order">
                    Order <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="order"
                    type="number"
                    min={0}
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
            <div className="grid gap-2">
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="is_active"
                        checked={form.data.is_active}
                        onCheckedChange={(checked) =>
                            form.setData('is_active', checked === true)
                        }
                        aria-invalid={Boolean(form.errors.is_active)}
                    />
                    <Label htmlFor="is_active">Active</Label>
                </div>
                <InputError message={form.errors.is_active} />
            </div>
            <Button type="submit" disabled={form.processing}>
                {form.processing ? 'Saving...' : submitLabel}
            </Button>
        </form>
    );
}
