import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => setConfirmingUserDeletion(true);

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#dc2626' }}
                >
                    Delete Account
                </h3>
                <p className="text-sm mt-1" style={{ color: '#b06080' }}>
                    Once deleted, all your data will be permanently removed. This cannot be undone.
                </p>
            </header>

            <button
                type="button"
                className="btn-danger"
                onClick={confirmUserDeletion}
            >
                <Trash2 className="w-4 h-4" />
                Delete Account
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-7">
                    <h3
                        className="text-xl font-bold mb-2"
                        style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}
                    >
                        Delete your account?
                    </h3>
                    <p className="text-sm mb-6" style={{ color: '#b06080' }}>
                        All your data will be permanently deleted. Please enter your password to confirm.
                    </p>

                    <div>
                        <label className="cakery-label" htmlFor="delete-password">Password</label>
                        <input
                            id="delete-password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="cakery-input"
                            placeholder="Enter your password"
                        />
                        <InputError message={errors.password} className="mt-1.5" />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <button type="submit" className="btn-danger" disabled={processing}>
                            {processing ? 'Deleting…' : 'Yes, Delete Account'}
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}