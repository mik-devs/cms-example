import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import PageController from '@/actions/App/Http/Controllers/Admin/PageController';
import InputError from '@/components/input-error';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Page } from '@/types';

export default function EditPage({ page }: { page: Page }) {
    const form = useForm({
        title: page.title,
        content: page.content,
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        form.put(PageController.update.url(page.slug));
    }

    return (
        <>
            <Head title={`Edit ${page.title}`} />
            <AdminFormPage
                title="Edit About Page"
                description={`Update the content for ${page.title}.`}
                backHref={PageController.index.url()}
                backLabel="About Pages"
            >
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
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <Label htmlFor="content">
                                Content <span className="text-red-500">*</span>
                            </Label>
                            <span className="text-xs text-ink-muted">
                                Basic HTML is supported and sanitized on save.
                            </span>
                        </div>
                        <textarea
                            id="content"
                            required
                            value={form.data.content}
                            onChange={(event) =>
                                form.setData('content', event.target.value)
                            }
                            aria-invalid={Boolean(form.errors.content)}
                            className="min-h-[32rem] w-full rounded-md border border-input bg-transparent px-3 py-2 font-mono text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive"
                        />
                        <InputError message={form.errors.content} />
                    </div>

                    <Button type="submit" disabled={form.processing}>
                        {form.processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </form>
            </AdminFormPage>
        </>
    );
}
