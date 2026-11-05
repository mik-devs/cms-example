import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Film, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type VideoUploaderProps = {
    value?: File | string | null;
    onChange: (file: File | null) => void;
    label?: string;
    error?: string;
    className?: string;
};

export function VideoUploader({
    value,
    onChange,
    label,
    error,
    className,
}: VideoUploaderProps) {
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
        accept: { 'video/mp4': ['.mp4'] },
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
                    'relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-line-soft bg-cream/50 p-4 text-center transition-colors hover:border-maroon',
                    isDragActive && 'border-maroon bg-cream',
                    error && 'border-red-500',
                )}
            >
                <input {...getInputProps()} />
                {preview ? (
                    <div className="relative w-full max-w-md">
                        <video
                            src={preview}
                            controls
                            className="max-h-52 w-full rounded-lg bg-black object-contain"
                            onClick={(event) => event.stopPropagation()}
                        >
                            Your browser does not support the video tag.
                        </video>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute -top-2 -right-2 rounded-full bg-white shadow hover:bg-neutral-100 text-neutral-700"
                            onClick={(event) => {
                                event.stopPropagation();
                                onChange(null);
                            }}
                        >
                            <X className="size-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-2">
                        <Film className="size-8 text-ink-muted/60" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-ink-muted">
                                Drag & drop an MP4 video here, or click to browse
                            </p>
                            <p className="text-xs text-ink-muted/70">
                                MP4 format up to 50MB
                            </p>
                        </div>
                    </div>
                )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}

