import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';

type Props = {
    status?: string;
};

export default function Login({ status }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store().url, {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-forest-deep">
            <Head title="Admin Login" />

            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/kib.png"
                    alt="Kiblawan Background"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-forest-deep/80 backdrop-blur-sm"></div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md p-4">
                <div className="rounded-[24px] border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
                    {/* Branding */}
                    <div className="mb-8 text-center">
                        <img
                            src="/images/image.png"
                            alt="Kiblawan Logo"
                            className="mx-auto mb-6 h-20 w-20 drop-shadow-lg"
                        />
                        <h1 className="mb-2 font-display text-3xl font-bold text-white">
                            Admin Portal
                        </h1>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/20 p-3 text-center text-sm font-medium text-green-100">
                            {status}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={submit} className="flex flex-col gap-5">
                        {Object.keys(errors).length > 0 && (
                            <div
                                role="alert"
                                className="mb-4 rounded-lg border border-red-500/30 bg-red-500/20 p-3 text-sm font-medium text-red-200"
                            >
                                {errors.email ||
                                    errors.password ||
                                    'Invalid credentials. Please try again.'}
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-white/90">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                required
                                autoFocus
                                autoComplete="email"
                                placeholder="admin@kiblawan.gov.ph"
                                className="border-white/20 bg-white/5 text-white transition-all placeholder:text-white/40 focus:border-gold focus:ring-gold"
                            />
                            <InputError
                                message={errors.email}
                                className="text-red-400"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-white/90">
                                Password
                            </Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                required
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="border-white/20 bg-white/5 text-white transition-all placeholder:text-white/40 focus:border-gold focus:ring-gold"
                            />
                            <InputError
                                message={errors.password}
                                className="text-red-400"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="text-forest-dark mt-4 w-full bg-gold py-6 text-lg font-bold shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all duration-300 hover:bg-gold-soft hover:shadow-[0_0_30px_rgba(201,162,39,0.5)]"
                        >
                            {processing ? <Spinner className="mr-2" /> : null}
                            Log In
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

Login.layout = (page: React.ReactNode) => page;
