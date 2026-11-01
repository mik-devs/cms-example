import { Head, Link } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/JobController';
import type { JobPosting } from '@/types';
import Heading from '@/components/heading';
import JobForm from '@/pages/admin/jobs/components/job-form';

export default function EditJob({ job }: { job: JobPosting }) {
    return (
        <>
            <Head title={`Edit ${job.title}`} />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Edit Job"
                        description={`Update “${job.title}”.`}
                    />
                    <Link
                        href={index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Jobs
                    </Link>
                </div>
                <JobForm
                    initialValues={job}
                    onSubmit={(form) => form.put(update.url({ job: job.id }))}
                    submitLabel="Save Changes"
                />
            </div>
        </>
    );
}
