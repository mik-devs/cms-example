import { useEffect, useState, type FormEvent } from 'react';
import { useForm, type InertiaForm } from '@inertiajs/react';
import type { News } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export interface NewsFormData {
    title: string;
    excerpt: string;
    content: string;
    category: 'news' | 'announcement';
    status: 'draft' | 'published';
    published_at: string;
    is_featured: boolean;
    image: File | null;
}

interface NewsFormProps {
    initialValues?: News;
    onSubmit: (form: InertiaForm<NewsFormData>) => void;
    submitLabel: string;
}

export default function NewsForm({
    initialValues,
    onSubmit,
    submitLabel,
}: NewsFormProps) {
    const form = useForm<NewsFormData>({
        title: initialValues?.title ?? '',
        excerpt: initialValues?.excerpt ?? '',
        content: initialValues?.content ?? '',
        category: initialValues?.category ?? 'news',
        status: initialValues?.status ?? 'draft',
        published_at: initialValues?.published_at?.slice(0, 10) ?? '',
        is_featured: initialValues?.is_featured ?? false,
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
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={form.data.title}
                    onChange={(event) => form.setData('title', event.target.value)}
                    aria-invalid={Boolean(form.errors.title)}
                />
                <InputError message={form.errors.title} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                    value={form.data.category}
                    onValueChange={(value) => {
                        if (value === 'news' || value === 'announcement') {
                            form.setData('category', value);
                        }
                    }}
                >
                    <SelectTrigger id="category" aria-invalid={Boolean(form.errors.category)}>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="news">News</SelectItem>
                        <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                </Select>
                <InputError message={form.errors.category} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <textarea
                    id="excerpt"
                    value={form.data.excerpt}
                    onChange={(event) => form.setData('excerpt', event.target.value)}
                    aria-invalid={Boolean(form.errors.excerpt)}
                    className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-24 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] aria-invalid:border-destructive"
                />
                <InputError message={form.errors.excerpt} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <textarea
                    id="content"
                    required
                    value={form.data.content}
                    onChange={(event) => form.setData('content', event.target.value)}
                    aria-invalid={Boolean(form.errors.content)}
                    className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-64 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] aria-invalid:border-destructive"
                />
                <InputError message={form.errors.content} />
            </div>

            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="published_at">Published At</Label>
                <Input
                    id="published_at"
                    type="date"
                    value={form.data.published_at}
                    onChange={(event) =>
                        form.setData('published_at', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.published_at)}
                />
                <InputError message={form.errors.published_at} />
            </div>

            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="status">Status</Label>
                <Select
                    value={form.data.status}
                    onValueChange={(value) => {
                        if (value === 'draft' || value === 'published') {
                            form.setData('status', value);
                        }
                    }}
                >
                    <SelectTrigger id="status" aria-invalid={Boolean(form.errors.status)}>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                </Select>
                <InputError message={form.errors.status} />
            </div>

            <div className="grid gap-2">
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="is_featured"
                        checked={form.data.is_featured}
                        onCheckedChange={(checked) =>
                            form.setData('is_featured', checked === true)
                        }
                        aria-invalid={Boolean(form.errors.is_featured)}
                    />
                    <Label htmlFor="is_featured">Featured</Label>
                </div>
                <InputError message={form.errors.is_featured} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="image">Image</Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                        form.setData('image', event.currentTarget.files?.[0] ?? null)
                    }
                    aria-invalid={Boolean(form.errors.image)}
                />
                <InputError message={form.errors.image} />
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="News image preview"
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
