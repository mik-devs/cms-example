import { Head } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/JobController';
import type { JobPosting } from '@/types';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import JobForm from '@/pages/admin/jobs/components/job-form';

export default function EditJob({ job }: { job: JobPosting }) {
    return (
        <>
            <Head title={`Edit ${job.title}`} />
            <AdminFormPage
                title="Edit Job"
                description={`Update “${job.title}”.`}
                backHref={index.url()}
                backLabel="Jobs"
            >
                <JobForm
                    initialValues={job}
                    onSubmit={(form) => form.put(update.url({ job: job.id }))}
                    submitLabel="Save Changes"
                />
            </AdminFormPage>
        </>
    );
}
