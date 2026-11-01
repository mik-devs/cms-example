import { Head, Link } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/JobController';
import Heading from '@/components/heading';
import JobForm from '@/pages/admin/jobs/components/job-form';

export default function CreateJob() {
    return (
        <>
            <Head title="Create Job" />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Create Job"
                        description="Add a municipal job posting."
                    />
                    <Link
                        href={index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Jobs
                    </Link>
                </div>
                <JobForm
                    onSubmit={(form) => form.post(store.url())}
                    submitLabel="Create Job"
                />
            </div>
        </>
    );
}
