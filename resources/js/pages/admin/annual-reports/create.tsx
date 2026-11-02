import { Head } from '@inertiajs/react';
import AnnualReportController from '@/actions/App/Http/Controllers/Admin/AnnualReportController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import AnnualReportForm from '@/pages/admin/annual-reports/components/annual-report-form';

export default function CreateAnnualReport() {
    return (
        <>
            <Head title="Create Annual Report" />
            <AdminFormPage
                title="Create Annual Report"
                description="Add an annual report to the public records."
                backHref={AnnualReportController.index.url()}
                backLabel="Annual Reports"
            >
                <AnnualReportForm
                    onSubmit={(form) =>
                        form.post(AnnualReportController.store.url())
                    }
                    submitLabel="Create Annual Report"
                />
            </AdminFormPage>
        </>
    );
}
