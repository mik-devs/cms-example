import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import PageController from '@/actions/App/Http/Controllers/Admin/PageController';
import PageBanner from '@/components/kiblawan/admin/page-banner';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { Page } from '@/types';

export default function PagesIndex({ pages }: { pages: Page[] }) {
    return (
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 p-6 md:p-8">
            <Head title="About Pages" />
            <PageBanner
                title="About Pages"
                subtitle="Edit the content shown on the History, Demographic, Socio-Economic, and Geography pages."
            />

            <div className="overflow-hidden rounded-[20px] border border-line bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pages.length > 0 ? (
                            pages.map((page) => (
                                <TableRow key={page.id}>
                                    <TableCell className="font-medium text-primary">
                                        {page.title}
                                    </TableCell>
                                    <TableCell>
                                        <span className="rounded-full bg-cream px-2.5 py-1 text-xs font-semibold text-primary">
                                            /{page.slug}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-ink-muted">
                                        {new Date(
                                            page.updated_at,
                                        ).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Link
                                                href={PageController.edit.url(
                                                    page.slug,
                                                )}
                                            >
                                                <Pencil className="size-4" />
                                                Edit
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    No pages have been added yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
