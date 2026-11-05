import { Head } from '@inertiajs/react';
import AnnualReportController from '@/actions/App/Http/Controllers/Admin/AnnualReportController';
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
            <AnnualReportForm
                title="Edit Annual Report"
                backHref={AnnualReportController.index.url()}
                initialValues={annualReport}
                onSubmit={(form) =>
                    form.put(
                        AnnualReportController.update.url(annualReport.id),
                    )
                }
                submitLabel="Save Changes"
            />
        </>
    );
}
