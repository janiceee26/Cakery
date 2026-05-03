import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}
                >
                    Update Password
                </h3>
                <p className="text-sm mt-1" style={{ color: '#b06080' }}>
                    Use a long, random password to keep your account secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-4">
                <div>
                    <label className="cakery-label" htmlFor="current_password">Current Password</label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="cakery-input"
                        autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} className="mt-1.5" />
                </div>

                <div>
                    <label className="cakery-label" htmlFor="password">New Password</label>
                    <input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="cakery-input"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div>
                    <label className="cakery-label" htmlFor="password_confirmation">Confirm Password</label>
                    <input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="cakery-input"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} className="mt-1.5" />
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button type="submit" className="btn-primary" disabled={processing}>
                        {processing ? 'Saving…' : 'Update Password'}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-200"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out duration-200"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm font-medium" style={{ color: '#15803d' }}>Saved!</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}