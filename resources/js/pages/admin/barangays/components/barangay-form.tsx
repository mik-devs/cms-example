import { useForm, type InertiaForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { Barangay } from '@/types';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormWrapper } from '@/components/kiblawan/ui/form-wrapper';

export interface BarangayFormData {
    name: string;
    slug: string;
    population: string;
    captain: string;
    contact: string;
    latitude: string;
    longitude: string;
    order: number;
}

interface BarangayFormProps {
    initialValues?: Barangay;
    onSubmit: (form: InertiaForm<BarangayFormData>) => void;
    submitLabel: string;
    title?: string;
    backHref?: string;
}

export default function BarangayForm({
    initialValues,
    onSubmit,
    submitLabel,
    title = submitLabel,
    backHref,
}: BarangayFormProps) {
    const form = useForm<BarangayFormData>({
        name: initialValues?.name ?? '',
        slug: initialValues?.slug ?? '',
        population: initialValues?.population?.toString() ?? '',
        captain: initialValues?.captain ?? '',
        contact: initialValues?.contact ?? '',
        latitude: initialValues?.latitude ?? '',
        longitude: initialValues?.longitude ?? '',
        order: initialValues?.order ?? 0,
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        onSubmit(form);
    }

    return (
        <FormWrapper
            title={title}
            backHref={backHref}
            onSubmit={handleSubmit}
            processing={form.processing}
            submitLabel={submitLabel}
        >
            <div className="space-y-6 lg:col-span-2">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
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
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        placeholder="Generated from the name when blank"
                        value={form.data.slug}
                        onChange={(event) =>
                            form.setData('slug', event.target.value)
                        }
                        aria-invalid={Boolean(form.errors.slug)}
                    />
                    <InputError message={form.errors.slug} />
                </div>
                <div className="grid gap-2 sm:max-w-xs">
                    <Label htmlFor="population">Population</Label>
                    <Input
                        id="population"
                        type="number"
                        step={1}
                        value={form.data.population}
                        onChange={(event) =>
                            form.setData('population', event.target.value)
                        }
                        aria-invalid={Boolean(form.errors.population)}
                    />
                    <InputError message={form.errors.population} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="captain">Captain</Label>
                    <Input
                        id="captain"
                        value={form.data.captain}
                        onChange={(event) =>
                            form.setData('captain', event.target.value)
                        }
                        aria-invalid={Boolean(form.errors.captain)}
                    />
                    <InputError message={form.errors.captain} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="contact">Contact</Label>
                    <Input
                        id="contact"
                        value={form.data.contact}
                        onChange={(event) =>
                            form.setData('contact', event.target.value)
                        }
                        aria-invalid={Boolean(form.errors.contact)}
                    />
                    <InputError message={form.errors.contact} />
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
                            value={form.data.longitude}
                            onChange={(event) =>
                                form.setData('longitude', event.target.value)
                            }
                            aria-invalid={Boolean(form.errors.longitude)}
                        />
                        <InputError message={form.errors.longitude} />
                    </div>
                </fieldset>
            </div>

            <div className="space-y-6 bg-cream/50 p-6 rounded-[16px] border border-line-soft h-fit lg:col-span-1">
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
            </div>
        </FormWrapper>
    );
}