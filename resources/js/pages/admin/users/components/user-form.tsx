import { useForm, type InertiaForm } from '@inertiajs/react';
import { Check, Eye, EyeOff, X } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import InputError from '@/components/input-error';
import { FormWrapper } from '@/components/kiblawan/ui/form-wrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface RoleOption {
    id: number;
    name: string;
}

export interface UserItem {
    id: number;
    name: string;
    email: string;
    roles?: { id: number; name: string }[];
}

export interface UserFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
}

interface UserFormProps {
    initialValues?: UserItem;
    roles: RoleOption[];
    onSubmit: (form: InertiaForm<UserFormData>) => void;
    submitLabel: string;
    title?: string;
    backHref?: string;
    isEditing?: boolean;
}

interface PasswordStrength {
    score: number;
    label: string;
    textColor: string;
    barColor: string;
}

function getPasswordStrength(password: string): PasswordStrength {
    if (!password) {
        return {
            score: 0,
            label: '',
            textColor: '',
            barColor: 'bg-line-soft',
        };
    }

    if (password.length < 8) {
        return {
            score: 1,
            label: 'Too short',
            textColor: 'text-red-500',
            barColor: 'bg-red-500',
        };
    }

    let score = 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    switch (score) {
        case 1:
            return {
                score: 1,
                label: 'Weak',
                textColor: 'text-red-500',
                barColor: 'bg-red-500',
            };
        case 2:
            return {
                score: 2,
                label: 'Fair',
                textColor: 'text-amber-500',
                barColor: 'bg-amber-500',
            };
        case 3:
            return {
                score: 3,
                label: 'Good',
                textColor: 'text-blue-500',
                barColor: 'bg-blue-500',
            };
        case 4:
            return {
                score: 4,
                label: 'Strong',
                textColor: 'text-emerald-600',
                barColor: 'bg-emerald-500',
            };
        default:
            return {
                score: 0,
                label: 'Too short',
                textColor: 'text-red-500',
                barColor: 'bg-red-500',
            };
    }
}

export default function UserForm({
    initialValues,
    roles,
    onSubmit,
    submitLabel,
    title = submitLabel,
    backHref,
    isEditing = false,
}: UserFormProps) {
    const currentRole = initialValues?.roles?.[0]?.name ?? '';

    const form = useForm<UserFormData>({
        name: initialValues?.name ?? '',
        email: initialValues?.email ?? '',
        password: '',
        password_confirmation: '',
        role: currentRole,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const strength = useMemo(
        () => getPasswordStrength(form.data.password),
        [form.data.password],
    );

    const passwordsMatch =
        form.data.password_confirmation &&
        form.data.password === form.data.password_confirmation;

    const passwordsMismatch =
        form.data.password_confirmation &&
        form.data.password !== form.data.password_confirmation;

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        onSubmit(form);
    }

    return (
        <FormWrapper
            title={title}
            backHref={backHref}
            onSubmit={handleSubmit}
            processing={form.processing}
            submitLabel={submitLabel}
        >
            {/* LEFT COLUMN: Account Information (span 2 columns) */}
            <div className="space-y-6 lg:col-span-2">
                <h3 className="mb-4 border-b border-line-soft pb-2 text-lg font-bold text-maroon">
                    Account Information
                </h3>

                <div className="grid gap-2">
                    <Label
                        htmlFor="name"
                        className="text-sm font-semibold text-forest"
                    >
                        Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="name"
                        required
                        maxLength={255}
                        placeholder="e.g. Jhorn Estilloso"
                        value={form.data.name}
                        onChange={(event) =>
                            form.setData('name', event.target.value)
                        }
                        className="w-full rounded-[12px] border border-line-soft bg-white p-3 text-ink outline-none transition-all focus:border-gold focus:ring-1 focus:ring-gold"
                        aria-invalid={Boolean(form.errors.name)}
                    />
                    <InputError message={form.errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label
                        htmlFor="email"
                        className="text-sm font-semibold text-forest"
                    >
                        Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        autoComplete="off"
                        maxLength={255}
                        placeholder="e.g. staff@kiblawan.gov.ph"
                        value={form.data.email}
                        onChange={(event) =>
                            form.setData('email', event.target.value)
                        }
                        className="w-full rounded-[12px] border border-line-soft bg-white p-3 text-ink outline-none transition-all focus:border-gold focus:ring-1 focus:ring-gold"
                        aria-invalid={Boolean(form.errors.email)}
                    />
                    <InputError message={form.errors.email} />
                </div>

                {/* Password Field with Eye Toggle */}
                <div className="grid gap-2">
                    <Label
                        htmlFor="password"
                        className="text-sm font-semibold text-forest"
                    >
                        Password{' '}
                        {isEditing ? (
                            <span className="text-xs font-normal text-ink-muted">
                                (Optional)
                            </span>
                        ) : (
                            <span className="text-red-500">*</span>
                        )}
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required={!isEditing}
                            autoComplete="new-password"
                            placeholder={
                                isEditing
                                    ? '••••••••'
                                    : 'Enter strong password (min 8 chars)'
                            }
                            value={form.data.password}
                            onChange={(event) =>
                                form.setData('password', event.target.value)
                            }
                            className="w-full rounded-[12px] border border-line-soft bg-white p-3 pr-10 text-ink outline-none transition-all focus:border-gold focus:ring-1 focus:ring-gold"
                            aria-invalid={Boolean(form.errors.password)}
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted transition-colors hover:text-forest focus:outline-none"
                            aria-label={
                                showPassword ? 'Hide password' : 'Show password'
                            }
                        >
                            {showPassword ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </button>
                    </div>

                    {/* Real-time Password Strength Meter */}
                    {form.data.password && (
                        <div className="mt-1 space-y-1.5 rounded-lg border border-line-soft bg-cream/30 p-2.5">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-ink-muted">
                                    Password strength:
                                </span>
                                <span
                                    className={`font-semibold ${strength.textColor}`}
                                >
                                    {strength.label}
                                </span>
                            </div>
                            <div className="grid h-1.5 w-full grid-cols-4 gap-1.5">
                                {[1, 2, 3, 4].map((step) => (
                                    <div
                                        key={step}
                                        className={`h-full rounded-full transition-all duration-300 ${
                                            strength.score >= step
                                                ? strength.barColor
                                                : 'bg-line-soft'
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="text-[11px] text-ink-muted">
                                Use 8+ characters with mixed uppercase, lowercase, numbers, and symbols.
                            </p>
                        </div>
                    )}

                    {isEditing && (
                        <p className="text-xs text-ink-muted">
                            Leave blank to keep the current password.
                        </p>
                    )}
                    <InputError message={form.errors.password} />
                </div>

                {/* Confirm Password Field with Eye Toggle */}
                <div className="grid gap-2">
                    <Label
                        htmlFor="password_confirmation"
                        className="text-sm font-semibold text-forest"
                    >
                        Confirm Password{' '}
                        {!isEditing || form.data.password ? (
                            <span className="text-red-500">*</span>
                        ) : null}
                    </Label>
                    <div className="relative">
                        <Input
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            required={!isEditing || Boolean(form.data.password)}
                            autoComplete="new-password"
                            placeholder={
                                isEditing ? '••••••••' : 'Re-enter password'
                            }
                            value={form.data.password_confirmation}
                            onChange={(event) =>
                                form.setData(
                                    'password_confirmation',
                                    event.target.value,
                                )
                            }
                            className="w-full rounded-[12px] border border-line-soft bg-white p-3 pr-10 text-ink outline-none transition-all focus:border-gold focus:ring-1 focus:ring-gold"
                            aria-invalid={Boolean(
                                form.errors.password_confirmation ||
                                    passwordsMismatch,
                            )}
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted transition-colors hover:text-forest focus:outline-none"
                            aria-label={
                                showConfirmPassword
                                    ? 'Hide confirm password'
                                    : 'Show confirm password'
                            }
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </button>
                    </div>

                    {/* Real-time match feedback */}
                    {passwordsMatch && (
                        <p className="flex items-center gap-1 text-xs text-emerald-600">
                            <Check className="size-3.5" /> Passwords match
                        </p>
                    )}
                    {passwordsMismatch && (
                        <p className="flex items-center gap-1 text-xs text-red-500">
                            <X className="size-3.5" /> Passwords do not match
                        </p>
                    )}

                    <InputError message={form.errors.password_confirmation} />
                </div>
            </div>

            {/* RIGHT COLUMN: Access Control (span 1 column) */}
            <div className="space-y-6 lg:col-span-1">
                <h3 className="mb-4 border-b border-line-soft pb-2 text-lg font-bold text-maroon">
                    Access Control
                </h3>

                <div className="rounded-[16px] border border-line-soft bg-cream/50 p-6 space-y-4">
                    <div className="grid gap-2">
                        <Label
                            htmlFor="role"
                            className="text-sm font-semibold text-forest"
                        >
                            Assigned Role <span className="text-red-500">*</span>
                        </Label>
                        <select
                            id="role"
                            required
                            value={form.data.role}
                            onChange={(event) =>
                                form.setData('role', event.target.value)
                            }
                            aria-invalid={Boolean(form.errors.role)}
                            className="w-full cursor-pointer rounded-[12px] border border-line-soft bg-white p-3 text-sm text-ink outline-none transition-all focus:border-gold focus:ring-1 focus:ring-gold"
                        >
                            <option value="" disabled>
                                Select a role...
                            </option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.name}>
                                    {role.name
                                        .replaceAll('_', ' ')
                                        .replace(/\b\w/g, (char) =>
                                            char.toUpperCase(),
                                        )}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-ink-muted">
                            This determines which modules the user can access.
                        </p>
                        <InputError message={form.errors.role} />
                    </div>
                </div>
            </div>
        </FormWrapper>
    );
}
