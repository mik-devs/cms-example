import { Link, router } from '@inertiajs/react';
import { useState, type ReactNode } from 'react';
import { Image as ImageIcon, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import PageBanner from '@/components/kiblawan/admin/page-banner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface ResourceItem {
    id: number;
    title?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface ResourceTableColumn<T> {
    label: string;
    render: (item: T) => ReactNode;
}

interface ResourceTableProps<T extends ResourceItem> {
    title: string;
    description: string;
    items: T[];
    links: PaginationLink[];
    columns: ResourceTableColumn<T>[];
    createHref: string;
    editHref: (item: T) => string;
    deleteHref: (item: T) => string;
    getItemLabel?: (item: T) => string;
    emptyMessage: string;
}

function ResourceTableRow<T extends ResourceItem>({
    item,
    columns,
    editHref,
    deleteHref,
    getItemLabel,
}: Pick<
    ResourceTableProps<T>,
    'columns' | 'editHref' | 'deleteHref' | 'getItemLabel'
> & {
    item: T;
}) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const itemLabel = getItemLabel?.(item) ?? item.title ?? String(item.id);

    return (
        <TableRow className="border-b border-line-soft transition-colors hover:bg-cream/30 group">
            {columns.map((column) => (
                <TableCell key={column.label} className="px-4 py-3">
                    {column.render(item)}
                </TableCell>
            ))}
            <TableCell className="px-4 py-3">
                <Dialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                aria-label={`Actions for ${itemLabel}`}
                            >
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4 text-ink-muted" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer gap-2"
                            >
                                <Link
                                    href={editHref(item)}
                                    aria-label={`Edit ${itemLabel}`}
                                >
                                    <Pencil className="h-4 w-4" />
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DialogTrigger asChild>
                                <DropdownMenuItem className="cursor-pointer gap-2 text-red-600 focus:text-red-600">
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogTitle>Delete this item?</DialogTitle>
                        <DialogDescription>
                            “{itemLabel}” will be permanently deleted.
                        </DialogDescription>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                                variant="destructive"
                                onClick={() =>
                                    router.delete(deleteHref(item), {
                                        onSuccess: () =>
                                            setIsDeleteDialogOpen(false),
                                    })
                                }
                            >
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    );
}

export default function ResourceTable<T extends ResourceItem>({
    title,
    description,
    items,
    links,
    columns,
    createHref,
    editHref,
    deleteHref,
    getItemLabel,
    emptyMessage,
}: ResourceTableProps<T>) {
    return (
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 p-6 md:p-8">
            <PageBanner
                title={title}
                subtitle={description}
                actionLabel={`Create ${title.slice(0, -1)}`}
                actionHref={createHref}
            />

            <div className="overflow-hidden rounded-[20px] border border-line bg-white shadow-sm">
                <Table>
                    <TableHeader className="bg-cream/80">
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead
                                    key={column.label}
                                    className="border-b border-line-soft px-4 py-3 text-xs font-bold tracking-wider text-forest uppercase"
                                >
                                    {column.label}
                                </TableHead>
                            ))}
                            <TableHead className="border-b border-line-soft px-4 py-3 text-xs font-bold tracking-wider text-forest uppercase">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <ResourceTableRow
                                    key={item.id}
                                    item={item}
                                    columns={columns}
                                    editHref={editHref}
                                    deleteHref={deleteHref}
                                    getItemLabel={getItemLabel}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + 1}
                                    className="h-48 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <div className="flex size-16 items-center justify-center rounded-full bg-cream/60 text-ink-muted">
                                            <ImageIcon className="size-8" />
                                        </div>
                                        <p className="text-sm font-medium text-ink-muted">
                                            {emptyMessage}
                                        </p>
                                        <Button asChild>
                                            <Link href={createHref}>
                                                Create your first{' '}
                                                {title.slice(0, -1)}
                                            </Link>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <nav
                aria-label={`${title} pagination`}
                className="flex flex-wrap justify-center gap-2"
            >
                {links.map((link, index) => {
                    const label = link.label
                        .replace('&laquo;', '←')
                        .replace('&raquo;', '→');

                    return link.url ? (
                        <Link
                            key={`${link.label}-${index}`}
                            href={link.url}
                            aria-current={link.active ? 'page' : undefined}
                            className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                                link.active
                                    ? 'bg-maroon text-white border-maroon'
                                    : 'hover:bg-cream/50'
                            }`}
                        >
                            {label}
                        </Link>
                    ) : (
                        <span
                            key={`${link.label}-${index}`}
                            aria-disabled="true"
                            className="rounded-md border px-3 py-2 text-sm text-muted-foreground"
                        >
                            {label}
                        </span>
                    );
                })}
            </nav>
        </div>
    );
}
