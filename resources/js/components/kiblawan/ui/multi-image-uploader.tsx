import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type ExistingImage = string | { id?: number; url?: string; image_url?: string };

type MultiImageUploaderProps = {
    value?: File[];
    onChange: (files: File[]) => void;
    existingImages?: ExistingImage[];
    onRemoveExisting?: (image: ExistingImage) => void;
    label?: string;
    error?: string;
    className?: string;
};

function resolveExistingUrl(image: ExistingImage): string {
    if (typeof image === 'string') {
        return image;
    }

    return image.url ?? image.image_url ?? '';
}

export function MultiImageUploader({
    value = [],
    onChange,
    existingImages = [],
    onRemoveExisting,
    label,
    error,
    className,
}: MultiImageUploaderProps) {
    const [previews, setPreviews] = useState<string[]>([]);

    useEffect(() => {
        const urls = value.map((file) => URL.createObjectURL(file));
        setPreviews(urls);

        return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }, [value]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            onChange([...value, ...acceptedFiles]);
        },
        [onChange, value],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
    });

    function removeNew(index: number): void {
        onChange(value.filter((_, fileIndex) => fileIndex !== index));
    }

    const hasImages =
        existingImages.length > 0 || value.length > 0;

    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <p className="text-sm font-medium text-foreground">{label}</p>
            )}
            <div
                {...getRootProps()}
                className={cn(
                    'flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-line-soft bg-cream/50 p-4 text-center transition-colors hover:border-maroon',
                    isDragActive && 'border-maroon bg-cream',
                    error && 'border-red-500',
                )}
            >
                <input {...getInputProps()} />
                <Upload className="mb-2 size-6 text-ink-muted" />
                <p className="text-sm font-medium text-ink-muted">
                    Drag & drop gallery images here, or click to browse
                </p>
                <p className="text-xs text-ink-muted/70">
                    PNG, JPG, GIF up to 5MB
                </p>
            </div>

            {hasImages && (
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {existingImages.map((image, index) => {
                        const url = resolveExistingUrl(image);

                        return (
                            <div
                                key={`existing-${index}`}
                                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-line-soft"
                            >
                                <img
                                    src={url}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                                {onRemoveExisting && (
                                    <button
                                        type="button"
                                        onClick={() => onRemoveExisting(image)}
                                        className="absolute top-2 right-2 rounded-full bg-red-600 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                                        aria-label="Remove image"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                                <span className="absolute right-2 bottom-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                                    Existing
                                </span>
                            </div>
                        );
                    })}

                    {value.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-line-soft"
                        >
                            <img
                                src={previews[index]}
                                alt={file.name}
                                className="h-full w-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeNew(index)}
                                className="absolute top-2 right-2 rounded-full bg-red-600 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                                aria-label="Remove image"
                            >
                                <X className="h-4 w-4" />
                            </button>
                            <span className="absolute right-2 bottom-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                                New
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
