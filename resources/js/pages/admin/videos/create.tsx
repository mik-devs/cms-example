import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/OfficialVideoController';
import OfficialVideoForm from '@/pages/admin/videos/components/official-video-form';

export default function CreateOfficialVideo() {
    return (
        <>
            <Head title="Create Official Video" />
            <OfficialVideoForm
                title="Create Official Video"
                backHref={index.url()}
                onSubmit={(form) => form.post(store.url())}
                submitLabel="Create Official Video"
            />
        </>
    );
}

