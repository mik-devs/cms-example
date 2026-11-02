import { Head } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/EmergencyContactController';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import EmergencyContactForm from '@/pages/admin/emergency-contacts/components/emergency-contact-form';
import type { EmergencyContact } from '@/types';

export default function EditEmergencyContact({
    emergencyContact,
}: {
    emergencyContact: EmergencyContact;
}) {
    return (
        <>
            <Head title={`Edit ${emergencyContact.name}`} />
            <AdminFormPage
                title="Edit Emergency Contact"
                description={`Update ${emergencyContact.name}.`}
                backHref={index.url()}
                backLabel="Emergency Contacts"
            >
                <EmergencyContactForm
                    initialValues={emergencyContact}
                    onSubmit={(form) =>
                        form.put(
                            update.url({
                                emergency_contact: emergencyContact.id,
                            }),
                        )
                    }
                    submitLabel="Save Changes"
                />
            </AdminFormPage>
        </>
    );
}
