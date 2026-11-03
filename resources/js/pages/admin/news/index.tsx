import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import NewsController from '@/actions/App/Http/Controllers/Admin/NewsController';
import PageBanner from '@/components/kiblawan/admin/page-banner';
import { Badge } from '@/components/ui/badge';
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
import type { News } from '@/types';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedNews {
    data: News[];
    links: PaginationLink[];
}

function NewsTableRow({ item }: { item: News }) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    return (
        <TableRow>
            <TableCell>
                {item.image_url ? (
                    <img
                        src={item.image_url}
                        alt=""
                        className="size-14 rounded-md object-cover"
                    />
                ) : (
                    <span className="text-sm text-muted-foreground">
                        No image
                    </span>
                )}
            </TableCell>
            <TableCell className="min-w-48 font-medium">{item.title}</TableCell>
            <TableCell className="capitalize">{item.category}</TableCell>
            <TableCell>
                <Badge
                    className={
                        item.status === 'published'
                            ? 'border-transparent bg-green text-white'
                            : 'border-transparent bg-gold text-ink'
                    }
                >
                    {item.status}
                </Badge>
            </TableCell>
            <TableCell>
                {item.published_at
                    ? new Date(item.published_at).toLocaleDateString()
                    : '—'}
            </TableCell>
            <TableCell>
                <Dialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                aria-label={`Actions for ${item.title}`}
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
                                    href={NewsController.edit.url(item.id)}
                                    aria-label={`Edit ${item.title}`}
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
                        <DialogTitle>Delete this news item?</DialogTitle>
                        <DialogDescription>
                            “{item.title}” and its uploaded image will be
                            permanently deleted.
                        </DialogDescription>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                                variant="destructive"
                                onClick={() =>
                                    router.delete(
                                        NewsController.destroy.url(item.id),
                                        {
                                            onSuccess: () =>
                                                setIsDeleteDialogOpen(false),
                                        },
                                    )
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

export default function NewsIndex({ news }: { news: PaginatedNews }) {
    return (
        <>
            <Head title="News" />
            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 p-6 md:p-8">
                <PageBanner
                    title="News"
                    subtitle="Manage news articles and announcements."
                    actionLabel="Create News"
                    actionHref={NewsController.create.url()}
                />

                <div className="overflow-hidden rounded-[20px] border border-line bg-white shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {news.data.length > 0 ? (
                                news.data.map((item) => (
                                    <NewsTableRow key={item.id} item={item} />
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No news items found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <nav
                    aria-label="News pagination"
                    className="flex flex-wrap justify-center gap-2"
                >
                    {news.links.map((link, index) => {
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
        </>
    );
}
