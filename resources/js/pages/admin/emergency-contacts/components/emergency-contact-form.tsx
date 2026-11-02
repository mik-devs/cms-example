import { useForm, type InertiaForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { EmergencyContact } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface EmergencyContactFormData {
    name: string;
    phone: string;
    icon: string;
    description: string;
    order: number;
    is_active: boolean;
}

export default function EmergencyContactForm({
    initialValues,
    onSubmit,
    submitLabel,
}: {
    initialValues?: EmergencyContact;
    onSubmit: (form: InertiaForm<EmergencyContactFormData>) => void;
    submitLabel: string;
}) {
    const form = useForm<EmergencyContactFormData>({
        name: initialValues?.name ?? '',
        phone: initialValues?.phone ?? '',
        icon: initialValues?.icon ?? '',
        description: initialValues?.description ?? '',
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
                <Label htmlFor="name">Name</Label>
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
                <Label htmlFor="phone">Phone</Label>
                <Input
                    id="phone"
                    required
                    maxLength={255}
                    value={form.data.phone}
                    onChange={(event) =>
                        form.setData('phone', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.phone)}
                />
                <InputError message={form.errors.phone} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="icon">Icon</Label>
                <Input
                    id="icon"
                    required
                    maxLength={255}
                    placeholder="e.g. shield, ambulance, flame"
                    value={form.data.icon}
                    onChange={(event) =>
                        form.setData('icon', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.icon)}
                />
                <InputError message={form.errors.icon} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    maxLength={255}
                    value={form.data.description}
                    onChange={(event) =>
                        form.setData('description', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.description)}
                />
                <InputError message={form.errors.description} />
            </div>
            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="order">Order</Label>
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
