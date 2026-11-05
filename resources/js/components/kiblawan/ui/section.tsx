import { cn } from '@/lib/utils';

export function Section({
    className,
    children,
    id,
    as: Tag = 'section',
    style,
}: {
    className?: string;
    children: React.ReactNode;
    id?: string;
    as?: 'section' | 'div' | 'article';
    style?: React.CSSProperties;
}) {
    return (
        <Tag
            id={id}
            className={cn(
                'relative py-20 max-[991px]:py-12 max-[575px]:py-12',
                className,
            )}
            style={style}
        >
            {children}
        </Tag>
    );
}
