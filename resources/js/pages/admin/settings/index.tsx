import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { update } from '@/actions/App/Http/Controllers/Admin/SettingController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SettingsFormData {
    site_name: string;
    tagline: string;
    address: string;
    phone: string;
    email: string;
    office_hours: string;
    map_embed: string;
}

export default function SettingsIndex({
    settings,
}: {
    settings: Record<string, string | null>;
}) {
    const form = useForm<SettingsFormData>({
        site_name: settings.site_name ?? '',
        tagline: settings.tagline ?? '',
        address: settings.address ?? '',
        phone: settings.phone ?? '',
        email: settings.email ?? '',
        office_hours: settings.office_hours ?? '',
        map_embed: settings.map_embed ?? '',
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        form.put(update.url());
    }

    return (
        <>
            <Head title="Settings" />
            <div className="space-y-6">
                <Heading
                    title="Settings"
                    description="Update the site identity and public contact details."
                />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <section className="space-y-5 rounded-xl border bg-card p-6">
                        <div>
                            <h2 className="text-lg font-semibold">General</h2>
                            <p className="text-sm text-muted-foreground">
                                Site name and tagline shown across public pages.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="site_name">Site Name</Label>
                            <Input
                                id="site_name"
                                required
                                maxLength={255}
                                value={form.data.site_name}
                                onChange={(event) =>
                                    form.setData(
                                        'site_name',
                                        event.target.value,
                                    )
                                }
                                aria-invalid={Boolean(form.errors.site_name)}
                            />
                            <InputError message={form.errors.site_name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="tagline">Tagline</Label>
                            <Input
                                id="tagline"
                                required
                                maxLength={255}
                                value={form.data.tagline}
                                onChange={(event) =>
                                    form.setData('tagline', event.target.value)
                                }
                                aria-invalid={Boolean(form.errors.tagline)}
                            />
                            <InputError message={form.errors.tagline} />
                        </div>
                    </section>

                    <section className="space-y-5 rounded-xl border bg-card p-6">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Contact Info
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                These details are displayed in the public
                                footer.
                            </p>
                        </div>
                        <div className="grid gap-5 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <textarea
                                    id="address"
                                    value={form.data.address}
                                    onChange={(event) =>
                                        form.setData(
                                            'address',
                                            event.target.value,
                                        )
                                    }
                                    aria-invalid={Boolean(form.errors.address)}
                                    className="min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive"
                                />
                                <InputError message={form.errors.address} />
                            </div>
                            <div className="grid content-start gap-5">
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        maxLength={255}
                                        value={form.data.phone}
                                        onChange={(event) =>
                                            form.setData(
                                                'phone',
                                                event.target.value,
                                            )
                                        }
                                        aria-invalid={Boolean(
                                            form.errors.phone,
                                        )}
                                    />
                                    <InputError message={form.errors.phone} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        maxLength={255}
                                        value={form.data.email}
                                        onChange={(event) =>
                                            form.setData(
                                                'email',
                                                event.target.value,
                                            )
                                        }
                                        aria-invalid={Boolean(
                                            form.errors.email,
                                        )}
                                    />
                                    <InputError message={form.errors.email} />
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="office_hours">Office Hours</Label>
                            <Input
                                id="office_hours"
                                maxLength={255}
                                value={form.data.office_hours}
                                onChange={(event) =>
                                    form.setData(
                                        'office_hours',
                                        event.target.value,
                                    )
                                }
                                aria-invalid={Boolean(form.errors.office_hours)}
                            />
                            <InputError message={form.errors.office_hours} />
                        </div>
                    </section>

                    <section className="space-y-5 rounded-xl border bg-card p-6">
                        <div>
                            <h2 className="text-lg font-semibold">Map</h2>
                            <p className="text-sm text-muted-foreground">
                                Use the Google Maps embed source URL.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="map_embed">Map Embed URL</Label>
                            <textarea
                                id="map_embed"
                                value={form.data.map_embed}
                                onChange={(event) =>
                                    form.setData(
                                        'map_embed',
                                        event.target.value,
                                    )
                                }
                                aria-invalid={Boolean(form.errors.map_embed)}
                                className="min-h-28 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive"
                            />
                            <InputError message={form.errors.map_embed} />
                        </div>
                    </section>

                    <Button type="submit" disabled={form.processing}>
                        {form.processing ? 'Saving...' : 'Save Settings'}
                    </Button>
                </form>
            </div>
        </>
    );
}
