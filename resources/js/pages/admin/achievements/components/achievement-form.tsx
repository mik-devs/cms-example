import { useEffect, useState, type FormEvent } from 'react';
import { useForm, type InertiaForm } from '@inertiajs/react';
import type { Achievement } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface AchievementFormData {
    title: string;
    description: string;
    badge_year: string;
    order: number;
    is_active: boolean;
    image: File | null;
}

export default function AchievementForm({
    initialValues,
    onSubmit,
    submitLabel,
}: {
    initialValues?: Achievement;
    onSubmit: (form: InertiaForm<AchievementFormData>) => void;
    submitLabel: string;
}) {
    const form = useForm<AchievementFormData>({
        title: initialValues?.title ?? '',
        description: initialValues?.description ?? '',
        badge_year: initialValues?.badge_year ?? '',
        order: initialValues?.order ?? 0,
        is_active: initialValues?.is_active ?? true,
        image: null,
    });
    const [imagePreview, setImagePreview] = useState<string | null>(
        initialValues?.image_url ?? null,
    );

    useEffect(() => {
        if (!form.data.image) {
            setImagePreview(initialValues?.image_url ?? null);

            return;
        }

        const previewUrl = URL.createObjectURL(form.data.image);
        setImagePreview(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
    }, [form.data.image, initialValues?.image_url]);

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
            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="badge_year">
                    Badge Year <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="badge_year"
                    required
                    maxLength={10}
                    placeholder="e.g. 2026"
                    value={form.data.badge_year}
                    onChange={(event) =>
                        form.setData('badge_year', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.badge_year)}
                />
                <InputError message={form.errors.badge_year} />
            </div>
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
            <div className="grid gap-2">
                <Label htmlFor="image">
                    Image
                    {!initialValues && <span className="text-red-500"> *</span>}
                </Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    required={!initialValues}
                    onChange={(event) =>
                        form.setData(
                            'image',
                            event.currentTarget.files?.[0] ?? null,
                        )
                    }
                    aria-invalid={Boolean(form.errors.image)}
                />
                <InputError message={form.errors.image} />
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Achievement image preview"
                        className="mt-2 max-h-64 w-fit rounded-md border object-contain"
                    />
                )}
            </div>
            <Button type="submit" disabled={form.processing}>
                {form.processing ? 'Saving...' : submitLabel}
            </Button>
        </form>
    );
}
