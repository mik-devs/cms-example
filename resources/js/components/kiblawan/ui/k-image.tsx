import { ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type ImageState = 'primary' | 'fallback' | 'empty';

export interface KImageProps extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    'src'
> {
    src: string | null | undefined;
    fallbackSrc?: string;
}

export function KImage({
    src,
    fallbackSrc = '/images/image.png',
    alt,
    className,
    onError,
    ...rest
}: KImageProps) {
    const [state, setState] = useState<ImageState>(
        src ? 'primary' : 'fallback',
    );

    useEffect(() => {
        setState(src ? 'primary' : 'fallback');
    }, [src]);

    const currentSrc =
        state === 'primary' ? src : state === 'fallback' ? fallbackSrc : null;

    const handleError = (
        event: React.SyntheticEvent<HTMLImageElement, Event>,
    ): void => {
        setState((current) => (current === 'primary' ? 'fallback' : 'empty'));
        onError?.(event);
    };

    if (!currentSrc) {
        return (
            <div
                className={cn(
                    'flex items-center justify-center bg-line-soft',
                    className,
                )}
            >
                <ImageIcon className="size-6 text-ink-muted" />
            </div>
        );
    }

    return (
        <img
            {...rest}
            src={currentSrc}
            alt={alt ?? ''}
            className={className}
            onError={handleError}
        />
    );
}
