import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div
                    className="mb-5 text-sm font-medium px-4 py-3 rounded-xl"
                    style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}
                >
                    {status}
                </div>
            )}

            <div className="mb-6">
                <h2
                    className="text-2xl font-bold"
                    style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}
                >
                    Welcome back 🩷
                </h2>
                <p className="text-sm mt-1" style={{ color: '#b06080' }}>Sign in to your Cakery account</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="cakery-label" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="cakery-input"
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div>
                    <label className="cakery-label" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="cakery-input"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="text-sm" style={{ color: '#9d4060' }}>Remember me</span>
                    </label>
                </div>

                <button type="submit" className="btn-primary w-full mt-2" disabled={processing}>
                    {processing ? 'Signing in…' : 'Log in'}
                </button>

                <p className="text-center text-sm mt-4" style={{ color: '#b06080' }}>
                    Don't have an account?{' '}
                    <Link href={route('register')} className="font-semibold" style={{ color: 'var(--pink-500)' }}>
                        Sign up
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}