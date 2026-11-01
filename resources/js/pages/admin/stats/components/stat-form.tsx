import { useForm, type InertiaForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { Stat } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface StatFormData {
    label: string;
    value: number;
    suffix: string;
    order: number;
    is_active: boolean;
}

export default function StatForm({
    initialValues,
    onSubmit,
    submitLabel,
}: {
    initialValues?: Stat;
    onSubmit: (form: InertiaForm<StatFormData>) => void;
    submitLabel: string;
}) {
    const form = useForm<StatFormData>({
        label: initialValues?.label ?? '',
        value: initialValues?.value ?? 0,
        suffix: initialValues?.suffix ?? '',
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
                <Label htmlFor="label">Label</Label>
                <Input
                    id="label"
                    required
                    maxLength={255}
                    value={form.data.label}
                    onChange={(event) =>
                        form.setData('label', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.label)}
                />
                <InputError message={form.errors.label} />
            </div>
            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="value">Value</Label>
                <Input
                    id="value"
                    type="number"
                    step={1}
                    required
                    value={form.data.value}
                    onChange={(event) =>
                        form.setData(
                            'value',
                            event.target.value === ''
                                ? 0
                                : Number(event.target.value),
                        )
                    }
                    aria-invalid={Boolean(form.errors.value)}
                />
                <InputError message={form.errors.value} />
            </div>
            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="suffix">Suffix</Label>
                <Input
                    id="suffix"
                    maxLength={50}
                    value={form.data.suffix}
                    onChange={(event) =>
                        form.setData('suffix', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.suffix)}
                />
                <InputError message={form.errors.suffix} />
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
