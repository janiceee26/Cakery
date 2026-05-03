import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import { useRef, useState } from 'react';
import { User, Lock, Trash2, Phone, MapPin } from 'lucide-react';

// ── Update Profile Info ──────────────────────────────────────────────────────
function UpdateProfileForm({ userProfile }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        phone_number: userProfile?.phone_number ?? '',
        delivery_address: userProfile?.delivery_address ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section>
            <header className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <User className="w-5 h-5" style={{ color: 'var(--pink-500)' }} />
                    <h3 className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                        Profile Information
                    </h3>
                </div>
                <p className="text-sm" style={{ color: '#b06080' }}>
                    Update your name, contact and delivery details.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="cakery-label" htmlFor="name">Name</label>
                        <input id="name" type="text" className="cakery-input mt-1"
                            value={data.name} onChange={(e) => setData('name', e.target.value)}
                            required autoFocus autoComplete="name" />
                        <InputError className="mt-1.5" message={errors.name} />
                    </div>
                    <div>
                        <label className="cakery-label" htmlFor="email">Email</label>
                        <input id="email" type="email" className="cakery-input mt-1"
                            value={data.email} onChange={(e) => setData('email', e.target.value)}
                            required autoComplete="username" />
                        <InputError className="mt-1.5" message={errors.email} />
                    </div>
                </div>

                <div>
                    <label className="cakery-label" htmlFor="phone_number">
                        <Phone className="w-3.5 h-3.5 inline mr-1" />
                        Phone Number
                    </label>
                    <input id="phone_number" type="tel" className="cakery-input mt-1"
                        value={data.phone_number}
                        onChange={(e) => setData('phone_number', e.target.value)}
                        placeholder="e.g. 09171234567"
                        autoComplete="tel" />
                    <InputError className="mt-1.5" message={errors.phone_number} />
                </div>

                <div>
                    <label className="cakery-label" htmlFor="delivery_address">
                        <MapPin className="w-3.5 h-3.5 inline mr-1" />
                        Delivery Address
                    </label>
                    <textarea id="delivery_address" rows={3} className="cakery-input mt-1"
                        value={data.delivery_address}
                        onChange={(e) => setData('delivery_address', e.target.value)}
                        placeholder="Your full delivery address"
                        style={{ resize: 'vertical' }} />
                    <InputError className="mt-1.5" message={errors.delivery_address} />
                </div>

                <div className="flex items-center gap-4 pt-1">
                    <button type="submit" className="btn-primary" disabled={processing}>
                        {processing ? 'Saving…' : 'Save Changes'}
                    </button>
                    <Transition show={recentlySuccessful} enter="transition ease-in-out duration-200" enterFrom="opacity-0" leave="transition ease-in-out duration-200" leaveTo="opacity-0">
                        <p className="text-sm font-medium" style={{ color: '#15803d' }}>Saved!</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

// ── Update Password ──────────────────────────────────────────────────────────
function UpdatePasswordForm() {
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
            onError: (errs) => {
                if (errs.password) { reset('password', 'password_confirmation'); passwordInput.current.focus(); }
                if (errs.current_password) { reset('current_password'); currentPasswordInput.current.focus(); }
            },
        });
    };

    return (
        <section>
            <header className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-5 h-5" style={{ color: 'var(--pink-500)' }} />
                    <h3 className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                        Update Password
                    </h3>
                </div>
                <p className="text-sm" style={{ color: '#b06080' }}>Use a long, random password to stay secure.</p>
            </header>

            <form onSubmit={updatePassword} className="space-y-4">
                <div>
                    <label className="cakery-label" htmlFor="current_password">Current Password</label>
                    <input id="current_password" ref={currentPasswordInput} type="password" className="cakery-input mt-1"
                        value={data.current_password} onChange={(e) => setData('current_password', e.target.value)}
                        autoComplete="current-password" />
                    <InputError message={errors.current_password} className="mt-1.5" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="cakery-label" htmlFor="password">New Password</label>
                        <input id="password" ref={passwordInput} type="password" className="cakery-input mt-1"
                            value={data.password} onChange={(e) => setData('password', e.target.value)}
                            autoComplete="new-password" />
                        <InputError message={errors.password} className="mt-1.5" />
                    </div>
                    <div>
                        <label className="cakery-label" htmlFor="password_confirmation">Confirm Password</label>
                        <input id="password_confirmation" type="password" className="cakery-input mt-1"
                            value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)}
                            autoComplete="new-password" />
                        <InputError message={errors.password_confirmation} className="mt-1.5" />
                    </div>
                </div>
                <div className="flex items-center gap-4 pt-1">
                    <button type="submit" className="btn-primary" disabled={processing}>
                        {processing ? 'Saving…' : 'Update Password'}
                    </button>
                    <Transition show={recentlySuccessful} enter="transition ease-in-out duration-200" enterFrom="opacity-0" leave="transition ease-in-out duration-200" leaveTo="opacity-0">
                        <p className="text-sm font-medium" style={{ color: '#15803d' }}>Saved!</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

// ── Delete Account ───────────────────────────────────────────────────────────
function DeleteAccountSection() {
    const [confirming, setConfirming] = useState(false);
    const passwordInput = useRef();
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: '' });

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };
    const closeModal = () => { setConfirming(false); clearErrors(); reset(); };

    return (
        <section>
            <header className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <Trash2 className="w-5 h-5" style={{ color: '#dc2626' }} />
                    <h3 className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#dc2626' }}>
                        Delete Account
                    </h3>
                </div>
                <p className="text-sm" style={{ color: '#b06080' }}>
                    Permanently deletes your account and all data. This cannot be undone.
                </p>
            </header>

            <button type="button" className="btn-danger" onClick={() => setConfirming(true)}>
                <Trash2 className="w-4 h-4" /> Delete Account
            </button>

            <Modal show={confirming} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-7">
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                        Delete your account?
                    </h3>
                    <p className="text-sm mb-6" style={{ color: '#b06080' }}>
                        All your data will be permanently deleted. Enter your password to confirm.
                    </p>
                    <div>
                        <label className="cakery-label" htmlFor="del-password">Password</label>
                        <input id="del-password" type="password" ref={passwordInput} value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="cakery-input mt-1" placeholder="Enter your password" />
                        <InputError message={errors.password} className="mt-1.5" />
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
                        <button type="submit" className="btn-danger" disabled={processing}>
                            {processing ? 'Deleting…' : 'Yes, Delete'}
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Edit({ mustVerifyEmail, status, userProfile }) {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #f9437a, #e0205d)' }}>
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                            My Profile
                        </h2>
                        <p className="text-sm mt-0.5" style={{ color: '#b06080' }}>{user.email}</p>
                    </div>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="py-10">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="cakery-card p-6 sm:p-8 fade-up">
                        <UpdateProfileForm userProfile={userProfile} />
                    </div>
                    <div className="cakery-card p-6 sm:p-8 fade-up fade-up-1">
                        <UpdatePasswordForm />
                    </div>
                    <div className="cakery-card p-6 sm:p-8 fade-up fade-up-2">
                        <DeleteAccountSection />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}