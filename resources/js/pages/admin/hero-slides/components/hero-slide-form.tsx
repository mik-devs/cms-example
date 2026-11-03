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
    subtitle: string;
    title_emphasis: string;
    cta_text: string;
    cta_link: string;
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
        subtitle: initialValues?.subtitle ?? '',
        title_emphasis: initialValues?.title_emphasis ?? '',
        cta_text: initialValues?.cta_text ?? '',
        cta_link: initialValues?.cta_link ?? '',
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
                <Label htmlFor="kicker">
                    Kicker <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="kicker"
                    required
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
                <Label htmlFor="title">
                    Title <span className="text-red-500">*</span>
                </Label>
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
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                    id="subtitle"
                    maxLength={255}
                    value={form.data.subtitle}
                    onChange={(event) =>
                        form.setData('subtitle', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.subtitle)}
                />
                <InputError message={form.errors.subtitle} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="title_emphasis">Title Emphasis</Label>
                <Input
                    id="title_emphasis"
                    maxLength={255}
                    placeholder="e.g. Municipality"
                    value={form.data.title_emphasis}
                    onChange={(event) =>
                        form.setData('title_emphasis', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.title_emphasis)}
                />
                <InputError message={form.errors.title_emphasis} />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="cta_text">CTA Text</Label>
                    <Input
                        id="cta_text"
                        maxLength={255}
                        placeholder="e.g. Explore Services"
                        value={form.data.cta_text}
                        onChange={(event) =>
                            form.setData('cta_text', event.target.value)
                        }
                        aria-invalid={Boolean(form.errors.cta_text)}
                    />
                    <InputError message={form.errors.cta_text} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="cta_link">CTA Link</Label>
                    <Input
                        id="cta_link"
                        maxLength={255}
                        placeholder="e.g. /services"
                        value={form.data.cta_link}
                        onChange={(event) =>
                            form.setData('cta_link', event.target.value)
                        }
                        aria-invalid={Boolean(form.errors.cta_link)}
                    />
                    <InputError message={form.errors.cta_link} />
                </div>
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
                        alt="Hero slide image preview"
                        className="mt-2 max-h-64 w-fit rounded-md border object-contain"
                    />
                )}
            </div>
            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="order">
                    Order <span className="text-red-500">*</span>
                </Label>
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
