import { useForm, type InertiaForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { JobPosting } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export interface JobFormData {
    title: string;
    description: string;
    department: string;
    deadline: string;
    status: 'open' | 'closed';
}

export default function JobForm({
    initialValues,
    onSubmit,
    submitLabel,
}: {
    initialValues?: JobPosting;
    onSubmit: (form: InertiaForm<JobFormData>) => void;
    submitLabel: string;
}) {
    const form = useForm<JobFormData>({
        title: initialValues?.title ?? '',
        description: initialValues?.description ?? '',
        department: initialValues?.department ?? '',
        deadline: initialValues?.deadline?.slice(0, 10) ?? '',
        status: initialValues?.status ?? 'open',
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
                <Label htmlFor="department">
                    Department <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="department"
                    required
                    value={form.data.department}
                    onChange={(event) =>
                        form.setData('department', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.department)}
                />
                <InputError message={form.errors.department} />
            </div>
            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                    id="deadline"
                    type="date"
                    value={form.data.deadline}
                    onChange={(event) =>
                        form.setData('deadline', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.deadline)}
                />
                <InputError message={form.errors.deadline} />
            </div>
            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="status">
                    Status <span className="text-red-500">*</span>
                </Label>
                <Select
                    value={form.data.status}
                    onValueChange={(value) => {
                        if (value === 'open' || value === 'closed') {
                            form.setData('status', value);
                        }
                    }}
                >
                    <SelectTrigger
                        id="status"
                        aria-invalid={Boolean(form.errors.status)}
                    >
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                </Select>
                <InputError message={form.errors.status} />
            </div>
            <Button type="submit" disabled={form.processing}>
                {form.processing ? 'Saving...' : submitLabel}
            </Button>
        </form>
    );
}
