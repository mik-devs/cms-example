import { Head } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/JobController';
import type { JobPosting } from '@/types';
import JobForm from '@/pages/admin/jobs/components/job-form';

export default function EditJob({ job }: { job: JobPosting }) {
    return (
        <>
            <Head title={`Edit ${job.title}`} />
            <JobForm
                title="Edit Job"
                backHref={index.url()}
                initialValues={job}
                onSubmit={(form) => form.put(update.url({ job: job.id }))}
                submitLabel="Save Changes"
            />
        </>
    );
}
