import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import NewsController from '@/actions/App/Http/Controllers/Admin/NewsController';
import Heading from '@/components/heading';
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
                    <span className="text-sm text-muted-foreground">No image</span>
                )}
            </TableCell>
            <TableCell className="min-w-48 font-medium">{item.title}</TableCell>
            <TableCell className="capitalize">{item.category}</TableCell>
            <TableCell>
                <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                    {item.status}
                </Badge>
            </TableCell>
            <TableCell>
                {item.published_at
                    ? new Date(item.published_at).toLocaleDateString()
                    : '—'}
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <Link
                            href={NewsController.edit.url(item.id)}
                            aria-label={`Edit ${item.title}`}
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
                                aria-label={`Delete ${item.title}`}
                            >
                                <Trash2 />
                            </Button>
                        </DialogTrigger>
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
                </div>
            </TableCell>
        </TableRow>
    );
}

export default function NewsIndex({ news }: { news: PaginatedNews }) {
    return (
        <>
            <Head title="News" />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="News"
                        description="Manage news articles and announcements."
                    />
                    <Button asChild>
                        <Link href={NewsController.create.url()}>
                            <Plus />
                            Create News
                        </Link>
                    </Button>
                </div>

                <div className="rounded-lg border">
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
