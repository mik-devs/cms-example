import { Head } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/OfficialVideoController';
import type { OfficialVideo } from '@/types';
import OfficialVideoForm from '@/pages/admin/videos/components/official-video-form';

export default function EditOfficialVideo({ video }: { video: OfficialVideo }) {
    return (
        <>
            <Head title={`Edit ${video.title}`} />
            <OfficialVideoForm
                title="Edit Official Video"
                backHref={index.url()}
                initialValues={video}
                onSubmit={(form) => {
                    if (form.data.video_file instanceof File) {
                        form.transform((data) => ({
                            ...data,
                            _method: 'put',
                        })).post(update.url({ video: video.id }));
                    } else {
                        form.put(update.url({ video: video.id }));
                    }
                }}
                submitLabel="Save Changes"
            />
        </>
    );
}

