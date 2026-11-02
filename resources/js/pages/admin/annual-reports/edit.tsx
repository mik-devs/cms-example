import { Head } from '@inertiajs/react';
import AnnualReportController from '@/actions/App/Http/Controllers/Admin/AnnualReportController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
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
            <AdminFormPage
                title="Edit Annual Report"
                description={`Update “${annualReport.title}”.`}
                backHref={AnnualReportController.index.url()}
                backLabel="Annual Reports"
            >
                <AnnualReportForm
                    initialValues={annualReport}
                    onSubmit={(form) =>
                        form.put(
                            AnnualReportController.update.url(annualReport.id),
                        )
                    }
                    submitLabel="Save Changes"
                />
            </AdminFormPage>
        </>
    );
}
