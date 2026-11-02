import { Head } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/EmergencyContactController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import EmergencyContactForm from '@/pages/admin/emergency-contacts/components/emergency-contact-form';

export default function CreateEmergencyContact() {
    return (
        <>
            <Head title="Create Emergency Contact" />
            <AdminFormPage
                title="Create Emergency Contact"
                description="Add an emergency contact number to the public site."
                backHref={index.url()}
                backLabel="Emergency Contacts"
            >
                <EmergencyContactForm
                    onSubmit={(form) => form.post(store.url())}
                    submitLabel="Create Emergency Contact"
                />
            </AdminFormPage>
        </>
    );
}
