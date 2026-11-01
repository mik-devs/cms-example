import { Head, Link } from '@inertiajs/react';
import AnnualReportController from '@/actions/App/Http/Controllers/Admin/AnnualReportController';
import Heading from '@/components/heading';
import AnnualReportForm from '@/pages/admin/annual-reports/components/annual-report-form';
import type { AnnualReport } from '@/types';

export default function EditAnnualReport({
    annualReport,
}: {
    annualReport: AnnualReport;
}) {
    return (
        <>
            <Head title={`Edit ${annualReport.title}`} />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Edit Annual Report"
                        description={`Update “${annualReport.title}”.`}
                    />
                    <Link
                        href={AnnualReportController.index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Annual Reports
                    </Link>
                </div>
                <AnnualReportForm
                    initialValues={annualReport}
                    onSubmit={(form) =>
                        form.put(AnnualReportController.update.url(annualReport.id))
                    }
                    submitLabel="Save Changes"
                />
            </div>
        </>
    );
}
