import { Head } from '@inertiajs/react';
import UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import UserForm, { type RoleOption } from '@/pages/admin/users/components/user-form';

export default function CreateUser({ roles }: { roles: RoleOption[] }) {
    return (
        <>
            <Head title="Create Staff User" />
            <UserForm
                title="Create Staff User"
                backHref={UserController.index.url()}
                roles={roles}
                onSubmit={(form) => form.post(UserController.store.url())}
                submitLabel="Create User"
            />
        </>
    );
}

