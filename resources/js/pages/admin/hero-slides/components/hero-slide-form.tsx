import { useEffect, useState, type FormEvent } from 'react';
import { useForm, type InertiaForm } from '@inertiajs/react';
import type { HeroSlide } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface HeroSlideFormData {
    kicker: string;
    title: string;
    image: File | null;
    order: number;
    is_active: boolean;
}

export default function HeroSlideForm({
    initialValues,
    onSubmit,
    submitLabel,
}: {
    initialValues?: HeroSlide;
    onSubmit: (form: InertiaForm<HeroSlideFormData>) => void;
    submitLabel: string;
}) {
    const form = useForm<HeroSlideFormData>({
        kicker: initialValues?.kicker ?? '',
        title: initialValues?.title ?? '',
        image: null,
        order: initialValues?.order ?? 0,
        is_active: initialValues?.is_active ?? true,
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
                <Label htmlFor="kicker">Kicker</Label>
                <Input
                    id="kicker"
                    maxLength={255}
                    value={form.data.kicker}
                    onChange={(event) =>
                        form.setData('kicker', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.kicker)}
                />
                <InputError message={form.errors.kicker} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    required
                    maxLength={255}
                    value={form.data.title}
                    onChange={(event) =>
                        form.setData('title', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.title)}
                />
                <InputError message={form.errors.title} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="image">
                    Image {initialValues ? '(optional)' : ''}
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
                        alt="Hero slide image preview"
                        className="mt-2 max-h-64 w-fit rounded-md border object-contain"
                    />
                )}
            </div>
            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="order">Order</Label>
                <Input
                    id="order"
                    type="number"
                    step={1}
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
            <Button type="submit" disabled={form.processing}>
                {form.processing ? 'Saving...' : submitLabel}
            </Button>
        </form>
    );
}
