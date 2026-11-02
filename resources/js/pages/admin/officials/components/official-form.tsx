import { useEffect, useState, type FormEvent } from 'react';
import { useForm, type InertiaForm } from '@inertiajs/react';
import type { Official } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface OfficialFormData {
    name: string;
    position: string;
    facebook_url: string;
    instagram_url: string;
    photo: File | null;
    order: number;
}

export default function OfficialForm({
    initialValues,
    onSubmit,
    submitLabel,
}: {
    initialValues?: Official;
    onSubmit: (form: InertiaForm<OfficialFormData>) => void;
    submitLabel: string;
}) {
    const form = useForm<OfficialFormData>({
        name: initialValues?.name ?? '',
        position: initialValues?.position ?? '',
        facebook_url: initialValues?.facebook_url ?? '',
        instagram_url: initialValues?.instagram_url ?? '',
        photo: null,
        order: initialValues?.order ?? 0,
    });
    const [photoPreview, setPhotoPreview] = useState<string | null>(
        initialValues?.photo_url ?? null,
    );

    useEffect(() => {
        if (!form.data.photo) {
            setPhotoPreview(initialValues?.photo_url ?? null);
            return;
        }

        const previewUrl = URL.createObjectURL(form.data.photo);
        setPhotoPreview(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
    }, [form.data.photo, initialValues?.photo_url]);

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={form.data.name}
                    onChange={(event) =>
                        form.setData('name', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.name)}
                />
                <InputError message={form.errors.name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Input
                    id="position"
                    value={form.data.position}
                    onChange={(event) =>
                        form.setData('position', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.position)}
                />
                <InputError message={form.errors.position} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="facebook_url">Facebook URL</Label>
                <Input
                    id="facebook_url"
                    type="url"
                    placeholder="https://facebook.com/..."
                    value={form.data.facebook_url}
                    onChange={(event) =>
                        form.setData('facebook_url', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.facebook_url)}
                />
                <InputError message={form.errors.facebook_url} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="instagram_url">Instagram URL</Label>
                <Input
                    id="instagram_url"
                    type="url"
                    placeholder="https://instagram.com/..."
                    value={form.data.instagram_url}
                    onChange={(event) =>
                        form.setData('instagram_url', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.instagram_url)}
                />
                <InputError message={form.errors.instagram_url} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="photo">Photo</Label>
                {photoPreview && (
                    <img
                        src={photoPreview}
                        alt="Official photo preview"
                        className="size-32 rounded-lg object-cover"
                    />
                )}
                <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                        form.setData('photo', event.target.files?.[0] ?? null)
                    }
                    aria-invalid={Boolean(form.errors.photo)}
                />
                <InputError message={form.errors.photo} />
            </div>
            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="order">Order</Label>
                <Input
                    id="order"
                    type="number"
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
            <Button type="submit" disabled={form.processing}>
                {form.processing ? 'Saving...' : submitLabel}
            </Button>
        </form>
    );
}
