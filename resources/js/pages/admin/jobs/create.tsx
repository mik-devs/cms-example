import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/JobController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import JobForm from '@/pages/admin/jobs/components/job-form';

export default function CreateJob() {
    return (
        <>
            <Head title="Create Job" />
            <AdminFormPage
                title="Create Job"
                description="Add a municipal job posting."
                backHref={index.url()}
                backLabel="Jobs"
            >
                <JobForm
                    onSubmit={(form) => form.post(store.url())}
                    submitLabel="Create Job"
                />
            </AdminFormPage>
        </>
    );
}
