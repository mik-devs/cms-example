import { Head } from '@inertiajs/react';
import AnnualReportController from '@/actions/App/Http/Controllers/Admin/AnnualReportController';
import AnnualReportForm from '@/pages/admin/annual-reports/components/annual-report-form';

export default function CreateAnnualReport() {
    return (
        <>
            <Head title="Create Annual Report" />
            <AnnualReportForm
                title="Create Annual Report"
                backHref={AnnualReportController.index.url()}
                onSubmit={(form) =>
                    form.post(AnnualReportController.store.url())
                }
                submitLabel="Create Annual Report"
            />
        </>
    );
}
