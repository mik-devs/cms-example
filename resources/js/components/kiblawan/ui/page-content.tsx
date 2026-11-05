import { cn } from '@/lib/utils';

export function PageContent({
    html,
    className,
}: {
    html: string;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'mx-auto max-w-4xl text-base leading-8 text-ink-muted',
                '[&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:font-bold [&_h2]:text-primary md:[&_h2]:text-4xl',
                '[&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:leading-snug [&_h3]:font-bold [&_h3]:text-primary',
                '[&_p]:mt-4 [&_p]:leading-8',
                '[&_p:first-child]:mt-0 [&_p:first-child]:text-lg [&_p:first-child]:leading-8 [&_p:first-child]:font-semibold [&_p:first-child]:text-primary',
                '[&_strong]:font-semibold [&_strong]:text-primary',
                '[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6',
                '[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6',
                '[&_li]:leading-7',
                '[&_a]:font-semibold [&_a]:text-primary [&_a]:underline',
                '[&_img]:mt-6 [&_img]:w-full [&_img]:rounded-[24px] [&_img]:object-cover [&_img]:shadow-k-card',
                '[&_figure]:mt-8 [&_figure]:space-y-3',
                '[&_figure_img]:mt-0',
                '[&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-ink-muted',
                '[&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:border-gold [&_blockquote]:pl-5 [&_blockquote]:italic',
                '[&_hr]:my-10 [&_hr]:border-line',
                '[&_table]:mt-6 [&_table]:w-full [&_table]:border-collapse',
                '[&_th]:border [&_th]:border-line [&_th]:bg-(--color-bg-light) [&_th]:px-3 [&_th]:py-2 [&_th]:text-left',
                '[&_td]:border [&_td]:border-line [&_td]:px-3 [&_td]:py-2',
                className,
            )}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
