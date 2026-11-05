import { useState, type FormEvent } from 'react';
import { useForm, type InertiaForm } from '@inertiajs/react';
import type { OfficialVideo } from '@/types';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormWrapper } from '@/components/kiblawan/ui/form-wrapper';
import { VideoUploader } from '@/components/kiblawan/ui/video-uploader';

export interface OfficialVideoFormData {
    title: string;
    video_file: File | null;
    order: number;
    is_active: boolean;
}

interface OfficialVideoFormProps {
    initialValues?: OfficialVideo;
    onSubmit: (form: InertiaForm<OfficialVideoFormData>) => void;
    submitLabel: string;
    title?: string;
    backHref?: string;
}

export default function OfficialVideoForm({
    initialValues,
    onSubmit,
    submitLabel,
    title = submitLabel,
    backHref,
}: OfficialVideoFormProps) {
    const form = useForm<OfficialVideoFormData>({
        title: initialValues?.title ?? '',
        video_file: null,
        order: initialValues?.order ?? 0,
        is_active: initialValues?.is_active ?? true,
    });
    const [videoCleared, setVideoCleared] = useState(false);

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
                    <Label htmlFor="title">
                        Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="title"
                        required
                        maxLength={255}
                        placeholder="e.g. Kiblawan Hymn"
                        value={form.data.title}
                        onChange={(event) =>
                            form.setData('title', event.target.value)
                        }
                        aria-invalid={Boolean(form.errors.title)}
                    />
                    <InputError message={form.errors.title} />
                </div>

                <div className="grid gap-2">
                    <VideoUploader
                        label="Video File (.mp4)"
                        value={
                            videoCleared
                                ? null
                                : (form.data.video_file ??
                                  initialValues?.video_url ??
                                  null)
                        }
                        onChange={(file) => {
                            form.setData('video_file', file);
                            if (file === null) {
                                setVideoCleared(true);
                            } else {
                                setVideoCleared(false);
                            }
                        }}
                        error={form.errors.video_file}
                    />
                </div>
            </div>

            <div className="h-fit space-y-6 rounded-[16px] border border-line-soft bg-cream/50 p-6 lg:col-span-1">
                <div className="grid gap-2 sm:max-w-xs">
                    <Label htmlFor="order">
                        Order <span className="text-red-500">*</span>
                    </Label>
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
            </div>
        </FormWrapper>
    );
}

