import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/JobController';
import JobForm from '@/pages/admin/jobs/components/job-form';

export default function CreateJob() {
    return (
        <>
            <Head title="Create Job" />
            <JobForm
                title="Create Job"
                backHref={index.url()}
                onSubmit={(form) => form.post(store.url())}
                submitLabel="Create Job"
            />
        </>
    );
}
