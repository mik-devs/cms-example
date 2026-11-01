import { Head, Link } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/BarangayController';
import Heading from '@/components/heading';
import BarangayForm from '@/pages/admin/barangays/components/barangay-form';

export default function CreateBarangay() {
    return (
        <>
            <Head title="Create Barangay" />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Create Barangay"
                        description="Add a barangay profile."
                    />
                    <Link
                        href={index.url()}
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Back to Barangays
                    </Link>
                </div>
                <BarangayForm
                    onSubmit={(form) => form.post(store.url())}
                    submitLabel="Create Barangay"
                />
            </div>
        </>
    );
}
