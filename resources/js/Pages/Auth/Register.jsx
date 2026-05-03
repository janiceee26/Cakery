import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mb-6">
                <h2
                    className="text-2xl font-bold"
                    style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}
                >
                    Create an account 🎂
                </h2>
                <p className="text-sm mt-1" style={{ color: '#b06080' }}>Join Cakery and order your first cake!</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="cakery-label" htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={data.name}
                        className="cakery-input"
                        autoComplete="name"
                        autoFocus
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-1.5" />
                </div>

                <div>
                    <label className="cakery-label" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="cakery-input"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
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
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div>
                    <label className="cakery-label" htmlFor="password_confirmation">Confirm Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="cakery-input"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-1.5" />
                </div>

                <button type="submit" className="btn-primary w-full mt-2" disabled={processing}>
                    {processing ? 'Creating account…' : 'Create Account'}
                </button>

                <p className="text-center text-sm mt-4" style={{ color: '#b06080' }}>
                    Already have an account?{' '}
                    <Link href={route('login')} className="font-semibold" style={{ color: 'var(--pink-500)' }}>
                        Sign in
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}