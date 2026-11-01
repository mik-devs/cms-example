import { Head, Link } from '@inertiajs/react';
import AnnualReportController from '@/actions/App/Http/Controllers/Admin/AnnualReportController';
import Heading from '@/components/heading';
import AnnualReportForm from '@/pages/admin/annual-reports/components/annual-report-form';

export default function CreateAnnualReport() {
    return (
        <>
            <Head title="Create Annual Report" />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Create Annual Report"
                        description="Add an annual report to the public records."
                    />
                    <Link
                        href={AnnualReportController.index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Annual Reports
                    </Link>
                </div>
                <AnnualReportForm
                    onSubmit={(form) => form.post(AnnualReportController.store.url())}
                    submitLabel="Create Annual Report"
                />
            </div>
        </>
    );
}
