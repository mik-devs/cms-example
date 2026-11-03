import { useEffect, useState, type FormEvent } from 'react';
import { router, useForm, type InertiaForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import type { TourismSpot } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface TourismFormData {
    name: string;
    slug: string;
    description: string;
    category: string;
    latitude: string;
    longitude: string;
    image: File | null;
    images: File[];
    order: number;
    is_active: boolean;
}

export default function TourismForm({
    initialValues,
    onSubmit,
    submitLabel,
}: {
    initialValues?: TourismSpot;
    onSubmit: (form: InertiaForm<TourismFormData>) => void;
    submitLabel: string;
}) {
    const form = useForm<TourismFormData>({
        name: initialValues?.name ?? '',
        slug: initialValues?.slug ?? '',
        description: initialValues?.description ?? '',
        category: initialValues?.category ?? '',
        latitude: initialValues?.latitude ?? '',
        longitude: initialValues?.longitude ?? '',
        image: null,
        images: [],
        order: initialValues?.order ?? 0,
        is_active: initialValues?.is_active ?? true,
    });
    const [imagePreview, setImagePreview] = useState<string | null>(
        initialValues?.image_url ?? null,
    );
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
    const existingGalleryImages = initialValues?.images ?? [];

    useEffect(() => {
        if (!form.data.image) {
            setImagePreview(initialValues?.image_url ?? null);

            return;
        }

        const previewUrl = URL.createObjectURL(form.data.image);
        setImagePreview(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
    }, [form.data.image, initialValues?.image_url]);

    useEffect(() => {
        const previewUrls = form.data.images.map((image) =>
            URL.createObjectURL(image),
        );
        setGalleryPreviews(previewUrls);

        return () => previewUrls.forEach((url) => URL.revokeObjectURL(url));
    }, [form.data.images]);

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="name">
                    Name <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="name"
                    required
                    maxLength={255}
                    value={form.data.name}
                    onChange={(event) =>
                        form.setData('name', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.name)}
                />
                <InputError message={form.errors.name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="slug">
                    Slug <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="slug"
                    required
                    maxLength={255}
                    placeholder="e.g. lawayan-falls"
                    value={form.data.slug}
                    onChange={(event) =>
                        form.setData('slug', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.slug)}
                />
                <InputError message={form.errors.slug} />
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
                <Label htmlFor="category">
                    Category <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="category"
                    required
                    maxLength={255}
                    value={form.data.category}
                    onChange={(event) =>
                        form.setData('category', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.category)}
                />
                <InputError message={form.errors.category} />
            </div>
            <fieldset className="grid gap-4 sm:grid-cols-2">
                <legend className="mb-2 text-sm font-medium">
                    Coordinates
                </legend>
                <div className="grid gap-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                        id="latitude"
                        type="number"
                        step="any"
                        placeholder="e.g. 6.5348513"
                        value={form.data.latitude}
                        onChange={(event) =>
                            form.setData('latitude', event.target.value)
                        }
                        aria-invalid={Boolean(form.errors.latitude)}
                    />
                    <InputError message={form.errors.latitude} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                        id="longitude"
                        type="number"
                        step="any"
                        placeholder="e.g. 125.2345303"
                        value={form.data.longitude}
                        onChange={(event) =>
                            form.setData('longitude', event.target.value)
                        }
                        aria-invalid={Boolean(form.errors.longitude)}
                    />
                    <InputError message={form.errors.longitude} />
                </div>
            </fieldset>
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
                        alt="Tourism spot image preview"
                        className="mt-2 max-h-64 w-fit rounded-md border object-contain"
                    />
                )}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="images">Gallery Images</Label>
                <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) =>
                        form.setData(
                            'images',
                            Array.from(event.currentTarget.files ?? []),
                        )
                    }
                    aria-invalid={Boolean(form.errors.images)}
                />
                <p className="text-xs text-muted-foreground">
                    Upload multiple photos to display in the public gallery.
                </p>
                <InputError message={form.errors.images} />
                {(existingGalleryImages.length > 0 ||
                    galleryPreviews.length > 0) && (
                    <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {existingGalleryImages.map((image) => (
                            <div
                                key={image.id}
                                className="group relative aspect-[4/3] overflow-hidden rounded-xl border"
                            >
                                <img
                                    src={image.image_url}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (
                                            confirm(
                                                'Are you sure you want to delete this image?',
                                            )
                                        ) {
                                            router.delete(
                                                `/admin/tourism-images/${image.id}`,
                                            );
                                        }
                                    }}
                                    className="absolute top-2 right-2 rounded-full bg-red-600 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                                    title="Delete image"
                                    aria-label="Delete image"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        {galleryPreviews.map((previewUrl) => (
                            <div
                                key={previewUrl}
                                className="relative aspect-[4/3] overflow-hidden rounded-xl border"
                            >
                                <img
                                    src={previewUrl}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                                <span className="absolute right-2 bottom-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                                    New
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="order">
                    Order <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="order"
                    type="number"
                    min={0}
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
