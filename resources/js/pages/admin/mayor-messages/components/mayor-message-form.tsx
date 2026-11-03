import { useEffect, useState, type FormEvent } from 'react';
import { useForm, type InertiaForm } from '@inertiajs/react';
import type { MayorMessage } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface MayorMessageFormData {
    title: string;
    content: string;
    image: File | null;
    type: MayorMessage['type'];
    published_at: string;
}

export default function MayorMessageForm({
    initialValues,
    onSubmit,
    submitLabel,
}: {
    initialValues?: MayorMessage;
    onSubmit: (form: InertiaForm<MayorMessageFormData>) => void;
    submitLabel: string;
}) {
    const form = useForm<MayorMessageFormData>({
        title: initialValues?.title ?? '',
        content: initialValues?.content ?? '',
        image: null,
        type: initialValues?.type ?? 'photo_release',
        published_at: initialValues?.published_at?.slice(0, 16) ?? '',
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
                <Label htmlFor="content">
                    Content <span className="text-red-500">*</span>
                </Label>
                <textarea
                    id="content"
                    required
                    value={form.data.content}
                    onChange={(event) =>
                        form.setData('content', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.content)}
                    className="min-h-48 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive"
                />
                <InputError message={form.errors.content} />
            </div>
            <div className="grid gap-2 sm:max-w-md">
                <Label htmlFor="type">
                    Type <span className="text-red-500">*</span>
                </Label>
                <select
                    id="type"
                    value={form.data.type}
                    onChange={(event) => {
                        const type = event.target.value;
                        const types: MayorMessage['type'][] = [
                            'photo_release',
                            'speech',
                            'achievement',
                            'gallery',
                        ];

                        const selectedType = types.find(
                            (candidate) => candidate === type,
                        );

                        if (selectedType) {
                            form.setData('type', selectedType);
                        }
                    }}
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                    <option value="photo_release">Photo Release</option>
                    <option value="speech">Speech</option>
                    <option value="achievement">Achievement</option>
                    <option value="gallery">Gallery</option>
                </select>
                <InputError message={form.errors.type} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="image">
                    Image
                    {!initialValues && <span className="text-red-500"> *</span>}
                </Label>
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Message image preview"
                        className="max-h-64 w-fit rounded-lg object-cover"
                    />
                )}
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    required={!initialValues}
                    onChange={(event) =>
                        form.setData('image', event.target.files?.[0] ?? null)
                    }
                    aria-invalid={Boolean(form.errors.image)}
                />
                <InputError message={form.errors.image} />
            </div>
            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="published_at">Published At</Label>
                <Input
                    id="published_at"
                    type="datetime-local"
                    value={form.data.published_at}
                    onChange={(event) =>
                        form.setData('published_at', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.published_at)}
                />
                <InputError message={form.errors.published_at} />
            </div>
            <Button type="submit" disabled={form.processing}>
                {form.processing ? 'Saving...' : submitLabel}
            </Button>
        </form>
    );
}
