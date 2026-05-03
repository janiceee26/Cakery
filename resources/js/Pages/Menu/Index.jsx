import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CakeSlice, ShoppingCart, X, Calendar, Plus, Minus, Sparkles } from 'lucide-react';
import { useState } from 'react';

function OrderModal({ cake, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        cake_id: cake.id,
        quantity: 1,
        pickup_date: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('orders.store'), {
            onSuccess: () => { reset(); onClose(); },
        });
    };

    const today = new Date();
    today.setDate(today.getDate() + 1);
    const minDate = today.toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(59,26,46,0.35)', backdropFilter: 'blur(4px)' }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="cakery-card w-full max-w-md p-6 fade-up" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                            Order: {cake.name}
                        </h3>
                        <p className="text-sm mt-0.5 font-semibold" style={{ color: 'var(--pink-500)' }}>
                            ₱{Number(cake.price).toFixed(2)} each
                        </p>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-xl transition" style={{ color: '#b06080', background: 'var(--pink-50)' }}>
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {cake.image_url && (
                    <img src={cake.image_url} alt={cake.name}
                        className="w-full h-40 object-cover rounded-2xl mb-5"
                        style={{ border: '1.5px solid #ffe0ec' }} />
                )}

                <form onSubmit={submit} className="space-y-4">
                    {/* Quantity */}
                    <div>
                        <label className="cakery-label">Quantity</label>
                        <div className="flex items-center gap-3 mt-1">
                            <button type="button"
                                onClick={() => setData('quantity', Math.max(1, data.quantity - 1))}
                                className="w-9 h-9 rounded-xl flex items-center justify-center transition"
                                style={{ background: 'var(--pink-50)', border: '1.5px solid #ffc2d9', color: 'var(--pink-500)' }}>
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-xl font-bold w-8 text-center" style={{ color: 'var(--text-dark)', fontFamily: 'Playfair Display, serif' }}>
                                {data.quantity}
                            </span>
                            <button type="button"
                                onClick={() => setData('quantity', data.quantity + 1)}
                                className="w-9 h-9 rounded-xl flex items-center justify-center transition"
                                style={{ background: 'var(--pink-50)', border: '1.5px solid #ffc2d9', color: 'var(--pink-500)' }}>
                                <Plus className="w-4 h-4" />
                            </button>
                            <span className="text-sm ml-2 font-semibold" style={{ color: '#b06080' }}>
                                Total: ₱{(cake.price * data.quantity).toFixed(2)}
                            </span>
                        </div>
                        {errors.quantity && <p className="text-xs mt-1.5" style={{ color: '#dc2626' }}>{errors.quantity}</p>}
                    </div>

                    {/* Pickup Date */}
                    <div>
                        <label className="cakery-label" htmlFor="pickup_date">
                            <Calendar className="w-3.5 h-3.5 inline mr-1" />
                            Pickup Date
                        </label>
                        <input
                            id="pickup_date"
                            type="date"
                            min={minDate}
                            value={data.pickup_date}
                            onChange={(e) => setData('pickup_date', e.target.value)}
                            className="cakery-input mt-1"
                            required
                        />
                        {errors.pickup_date && <p className="text-xs mt-1.5" style={{ color: '#dc2626' }}>{errors.pickup_date}</p>}
                    </div>

                    <button type="submit" className="btn-primary w-full" disabled={processing}>
                        {processing ? 'Placing Order…' : 'Place Order'}
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}

function CakeCard({ cake, onOrder, isGuest }) {
    return (
        <div className="cakery-card overflow-hidden flex flex-col">
            {cake.image_url ? (
                <img src={cake.image_url} alt={cake.name}
                    className="w-full h-48 object-cover"
                    style={{ borderBottom: '1.5px solid #ffe0ec' }} />
            ) : (
                <div className="w-full h-48 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #ffd6e7 0%, #ffb8d2 100%)', borderBottom: '1.5px solid #ffe0ec' }}>
                    <CakeSlice className="w-16 h-16 opacity-40" style={{ color: 'var(--pink-600)' }} />
                </div>
            )}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-base leading-snug" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                        {cake.name}
                    </h3>
                    <span className="text-base font-bold flex-shrink-0" style={{ color: 'var(--pink-500)' }}>
                        ₱{Number(cake.price).toFixed(2)}
                    </span>
                </div>
                <p className="text-sm flex-1 leading-relaxed" style={{ color: '#b06080' }}>{cake.description}</p>
                <div className="mt-4">
                    {isGuest ? (
                        <Link href={route('login')} className="btn-secondary w-full text-sm">
                            Log in to Order
                        </Link>
                    ) : (
                        <button onClick={() => onOrder(cake)} className="btn-primary w-full text-sm">
                            Order Now <ShoppingCart className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function MenuIndex({ cakes = [], flash = {} }) {
    const { auth } = usePage().props;
    const isGuest = !auth?.user;
    const [selectedCake, setSelectedCake] = useState(null);

    const Layout = isGuest
        ? ({ children }) => <>{children}</>
        : AuthenticatedLayout;

    const layoutProps = isGuest ? {} : {
        header: (
            <div>
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                    Our Menu
                </h2>
                <p className="text-sm mt-0.5" style={{ color: '#b06080' }}>
                    Choose your perfect cake and place your order.
                </p>
            </div>
        )
    };

    const content = (
        <div className={isGuest ? 'min-h-screen' : ''} style={isGuest ? { background: 'var(--cream)' } : {}}>
            <Head title="Menu" />

            {isGuest && (
                <nav style={{ background: 'white', borderBottom: '1.5px solid #ffe0ec' }}>
                    <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-lg font-bold" style={{ color: 'var(--pink-600)', fontFamily: 'Playfair Display, serif' }}>
                                🎂 Cakery
                            </span>
                        </Link>
                        <div className="flex gap-2">
                            <Link href={route('login')} className="btn-secondary text-sm">Log in</Link>
                            <Link href={route('register')} className="btn-primary text-sm">Sign up</Link>
                        </div>
                    </div>
                </nav>
            )}

            <div className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Flash success */}
                    {flash?.success && (
                        <div className="mb-6 px-4 py-3 rounded-2xl text-sm font-medium fade-up"
                            style={{ background: '#f0fdf4', color: '#15803d', border: '1.5px solid #bbf7d0' }}>
                            🎉 {flash.success}
                        </div>
                    )}

                    {isGuest && (
                        <div className="mb-8 fade-up">
                            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                                Our Cake Menu <Sparkles className="inline w-6 h-6" style={{ color: 'var(--pink-400)' }} />
                            </h1>
                            <p className="mt-2 text-sm" style={{ color: '#b06080' }}>
                                Log in to place your order.
                            </p>
                        </div>
                    )}

                    {cakes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 rounded-3xl fade-up"
                            style={{ background: 'var(--pink-50)', border: '1.5px dashed #ffc2d9' }}>
                            <CakeSlice className="w-16 h-16 mb-4" style={{ color: '#ffc2d9' }} />
                            <p className="font-bold text-lg" style={{ color: '#b06080', fontFamily: 'Playfair Display, serif' }}>No cakes yet</p>
                            <p className="text-sm mt-1" style={{ color: '#d4a5b5' }}>Check back soon — something sweet is coming!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 fade-up">
                            {cakes.map((cake) => (
                                <CakeCard key={cake.id} cake={cake} onOrder={setSelectedCake} isGuest={isGuest} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {selectedCake && (
                <OrderModal cake={selectedCake} onClose={() => setSelectedCake(null)} />
            )}
        </div>
    );

    if (isGuest) return content;

    return (
        <AuthenticatedLayout {...layoutProps}>
            <Head title="Menu" />

            {/* Flash success */}
            {flash?.success && (
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
                    <div className="px-4 py-3 rounded-2xl text-sm font-medium fade-up"
                        style={{ background: '#f0fdf4', color: '#15803d', border: '1.5px solid #bbf7d0' }}>
                        🎉 {flash.success}
                    </div>
                </div>
            )}

            <div className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {cakes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 rounded-3xl fade-up"
                            style={{ background: 'var(--pink-50)', border: '1.5px dashed #ffc2d9' }}>
                            <CakeSlice className="w-16 h-16 mb-4" style={{ color: '#ffc2d9' }} />
                            <p className="font-bold text-lg" style={{ color: '#b06080', fontFamily: 'Playfair Display, serif' }}>No cakes on the menu yet</p>
                            <p className="text-sm mt-1" style={{ color: '#d4a5b5' }}>Check back soon — something sweet is coming!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 fade-up">
                            {cakes.map((cake) => (
                                <CakeCard key={cake.id} cake={cake} onOrder={setSelectedCake} isGuest={false} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {selectedCake && (
                <OrderModal cake={selectedCake} onClose={() => setSelectedCake(null)} />
            )}
        </AuthenticatedLayout>
    );
}