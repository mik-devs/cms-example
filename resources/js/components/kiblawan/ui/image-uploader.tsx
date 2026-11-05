import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type ImageUploaderProps = {
    value?: File | string | null;
    onChange: (file: File | null) => void;
    label?: string;
    error?: string;
    className?: string;
};

export function ImageUploader({
    value,
    onChange,
    label,
    error,
    className,
}: ImageUploaderProps) {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!value) {
            setPreview(null);
            return;
        }

        if (typeof value === 'string') {
            setPreview(value);
            return;
        }

        const objectUrl = URL.createObjectURL(value);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [value]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                onChange(acceptedFiles[0]);
            }
        },
        [onChange],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false,
    });

    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <p className="text-sm font-medium text-foreground">{label}</p>
            )}
            <div
                {...getRootProps()}
                className={cn(
                    'relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-line-soft bg-cream/50 p-4 text-center transition-colors hover:border-maroon',
                    isDragActive && 'border-maroon bg-cream',
                    error && 'border-red-500',
                )}
            >
                <input {...getInputProps()} />
                {preview ? (
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-h-40 rounded-md object-contain"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute -top-2 -right-2 rounded-full bg-white shadow"
                            onClick={(event) => {
                                event.stopPropagation();
                                onChange(null);
                            }}
                        >
                            <X className="size-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-ink-muted">
                            Drag & drop an image here, or click to browse
                        </p>
                        <p className="text-xs text-ink-muted/70">
                            PNG, JPG, GIF up to 5MB
                        </p>
                    </div>
                )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
