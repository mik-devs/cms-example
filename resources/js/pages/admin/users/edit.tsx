import { Head } from '@inertiajs/react';
import UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import UserForm, {
    type RoleOption,
    type UserItem,
} from '@/pages/admin/users/components/user-form';

export default function EditUser({
    user,
    roles,
}: {
    user: UserItem;
    roles: RoleOption[];
}) {
    return (
        <>
            <Head title={`Edit User ${user.name}`} />
            <UserForm
                title={`Edit User: ${user.name}`}
                backHref={UserController.index.url()}
                initialValues={user}
                roles={roles}
                isEditing
                onSubmit={(form) =>
                    form.put(UserController.update.url(user.id))
                }
                submitLabel="Save Changes"
            />
        </>
    );
}

