import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}
                >
                    Profile Information
                </h3>
                <p className="text-sm mt-1" style={{ color: '#b06080' }}>
                    Update your name and email address.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="cakery-label" htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="cakery-input"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                    />
                    <InputError className="mt-1.5" message={errors.name} />
                </div>

                <div>
                    <label className="cakery-label" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="cakery-input"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-1.5" message={errors.email} />
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button type="submit" className="btn-primary" disabled={processing}>
                        {processing ? 'Saving…' : 'Save Changes'}
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