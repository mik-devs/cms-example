import { Head } from '@inertiajs/react';
import AnnualReportController from '@/actions/App/Http/Controllers/Admin/AnnualReportController';
import ResourceTable, {
    type ResourceTableColumn,
} from '@/pages/admin/components/resource-table';
import type { AnnualReport } from '@/types';

interface PaginatedAnnualReports {
    data: AnnualReport[];
    links: { url: string | null; label: string; active: boolean }[];
}

export default function AnnualReportsIndex({
    annualReports,
}: {
    annualReports: PaginatedAnnualReports;
}) {
    const columns: ResourceTableColumn<AnnualReport>[] = [
        { label: 'Title', render: (report) => report.title },
        { label: 'Category', render: (report) => report.category ?? '—' },
        { label: 'Year', render: (report) => report.year },
        {
            label: 'Date Posted',
            render: (report) => report.date_posted.slice(0, 10),
        },
        {
            label: 'Document',
            render: (report) =>
                report.pdf_url ? (
                    <a
                        href={report.pdf_url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                    >
                        View PDF
                    </a>
                ) : (
                    'No document'
                ),
        },
    ];

    return (
        <>
            <Head title="Annual Reports" />
            <ResourceTable
                title="Annual Reports"
                description="Manage published municipal annual reports."
                items={annualReports.data}
                links={annualReports.links}
                columns={columns}
                createHref={AnnualReportController.create.url()}
                createLabel="Upload Report"
                editHref={(report) =>
                    AnnualReportController.edit.url(report.id)
                }
                deleteHref={(report) =>
                    AnnualReportController.destroy.url(report.id)
                }
                emptyMessage="No annual reports have been added yet."
            />
        </>
    );
}
