import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/EmergencyContactController';
import EmergencyContactForm from '@/pages/admin/emergency-contacts/components/emergency-contact-form';

export default function CreateEmergencyContact() {
    return (
        <>
            <Head title="Create Emergency Contact" />
            <EmergencyContactForm
                title="Create Emergency Contact"
                backHref={index.url()}
                onSubmit={(form) => form.post(store.url())}
                submitLabel="Create Emergency Contact"
            />
        </>
    );
}