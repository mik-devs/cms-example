import { useForm, type InertiaForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { Office } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface OfficeFormData {
    name: string;
    head: string;
    contact_number: string;
    email: string;
    location: string;
    order: number;
    is_active: boolean;
}

export default function OfficeForm({
    initialValues,
    onSubmit,
    submitLabel,
}: {
    initialValues?: Office;
    onSubmit: (form: InertiaForm<OfficeFormData>) => void;
    submitLabel: string;
}) {
    const form = useForm<OfficeFormData>({
        name: initialValues?.name ?? '',
        head: initialValues?.head ?? '',
        contact_number: initialValues?.contact_number ?? '',
        email: initialValues?.email ?? '',
        location: initialValues?.location ?? '',
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
                <Label htmlFor="name">
                    Office Name <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="name"
                    required
                    value={form.data.name}
                    onChange={(event) =>
                        form.setData('name', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.name)}
                />
                <InputError message={form.errors.name} />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="head">Head of Office</Label>
                    <Input
                        id="head"
                        value={form.data.head}
                        onChange={(event) =>
                            form.setData('head', event.target.value)
                        }
                        aria-invalid={Boolean(form.errors.head)}
                    />
                    <InputError message={form.errors.head} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="contact_number">Contact Number</Label>
                    <Input
                        id="contact_number"
                        value={form.data.contact_number}
                        onChange={(event) =>
                            form.setData('contact_number', event.target.value)
                        }
                        aria-invalid={Boolean(form.errors.contact_number)}
                    />
                    <InputError message={form.errors.contact_number} />
                </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={form.data.email}
                        onChange={(event) =>
                            form.setData('email', event.target.value)
                        }
                        aria-invalid={Boolean(form.errors.email)}
                    />
                    <InputError message={form.errors.email} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        value={form.data.location}
                        onChange={(event) =>
                            form.setData('location', event.target.value)
                        }
                        aria-invalid={Boolean(form.errors.location)}
                    />
                    <InputError message={form.errors.location} />
                </div>
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

            <Button type="submit" disabled={form.processing}>
                {form.processing ? 'Saving...' : submitLabel}
            </Button>
        </form>
    );
}
