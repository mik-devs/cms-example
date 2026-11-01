import { Link, router } from '@inertiajs/react';
import { useState, type ReactNode } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
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
        <TableRow>
            {columns.map((column) => (
                <TableCell key={column.label}>{column.render(item)}</TableCell>
            ))}
            <TableCell>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <Link
                            href={editHref(item)}
                            aria-label={`Edit ${itemLabel}`}
                        >
                            <Pencil />
                        </Link>
                    </Button>
                    <Dialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button
                                variant="destructive"
                                size="icon"
                                aria-label={`Delete ${itemLabel}`}
                            >
                                <Trash2 />
                            </Button>
                        </DialogTrigger>
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
                </div>
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
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Heading title={title} description={description} />
                <Button asChild>
                    <Link href={createHref}>
                        <Plus />
                        Create {title.slice(0, -1)}
                    </Link>
                </Button>
            </div>

            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column.label}>
                                    {column.label}
                                </TableHead>
                            ))}
                            <TableHead>Actions</TableHead>
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
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    {emptyMessage}
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
                            className={`rounded-md border px-3 py-2 text-sm ${
                                link.active
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-accent'
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
