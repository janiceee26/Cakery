import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CakeSlice, Clock, ChefHat, PackageCheck, CheckCircle2, Trash2, ShoppingBag, Calendar } from 'lucide-react';
import { useState } from 'react';

const statusConfig = {
    pending:   { label: 'Pending',   className: 'badge-pending',   icon: Clock,         canCancel: true  },
    baking:    { label: 'Baking',    className: 'badge-baking',    icon: ChefHat,        canCancel: false },
    ready:     { label: 'Ready',     className: 'badge-ready',     icon: PackageCheck,   canCancel: false },
    completed: { label: 'Completed', className: 'badge-completed', icon: CheckCircle2,   canCancel: false },
};

function CancelModal({ order, onClose }) {
    const [processing, setProcessing] = useState(false);

    const confirm = () => {
        setProcessing(true);
        router.delete(route('orders.destroy', order.id), {
            onFinish: () => { setProcessing(false); onClose(); },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(59,26,46,0.35)', backdropFilter: 'blur(4px)' }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="cakery-card w-full max-w-sm p-6 fade-up">
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                    Cancel this order?
                </h3>
                <p className="text-sm mb-6" style={{ color: '#b06080' }}>
                    Order #{order.id} will be permanently cancelled. This can't be undone.
                </p>
                <div className="flex gap-3 justify-end">
                    <button onClick={onClose} className="btn-secondary">Keep it</button>
                    <button onClick={confirm} className="btn-danger" disabled={processing}>
                        {processing ? 'Cancelling…' : 'Yes, Cancel'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function MyOrders({ orders = [], flash = {} }) {
    const [cancelOrder, setCancelOrder] = useState(null);

    const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                            My Orders
                        </h2>
                        <p className="text-sm mt-0.5" style={{ color: '#b06080' }}>
                            Track and manage your cake orders.
                        </p>
                    </div>
                    <Link href={route('cakes.index')} className="btn-primary">
                        New Order <CakeSlice className="w-4 h-4" />
                    </Link>
                </div>
            }
        >
            <Head title="My Orders" />

            <div className="py-10">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-5">

                    {flash?.success && (
                        <div className="px-4 py-3 rounded-2xl text-sm font-medium fade-up"
                            style={{ background: '#f0fdf4', color: '#15803d', border: '1.5px solid #bbf7d0' }}>
                            🎉 {flash.success}
                        </div>
                    )}

                    {orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 rounded-3xl fade-up"
                            style={{ background: 'var(--pink-50)', border: '1.5px dashed #ffc2d9' }}>
                            <ShoppingBag className="w-14 h-14 mb-4" style={{ color: '#ffc2d9' }} />
                            <p className="font-bold text-lg" style={{ color: '#b06080', fontFamily: 'Playfair Display, serif' }}>No orders yet</p>
                            <p className="text-sm mt-1 mb-6" style={{ color: '#d4a5b5' }}>Browse our menu and place your first order!</p>
                            <Link href={route('cakes.index')} className="btn-primary">
                                Browse Menu <CakeSlice className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        orders.map((order, i) => {
                            const cfg = statusConfig[order.status] || statusConfig.pending;
                            const StatusIcon = cfg.icon;
                            return (
                                <div key={order.id}
                                    className={`cakery-card p-5 fade-up`}
                                    style={{ animationDelay: `${i * 0.05}s` }}
                                >
                                    {/* Order header */}
                                    <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                                style={{ background: 'var(--pink-50)', border: '1.5px solid #ffc2d9' }}>
                                                <CakeSlice className="w-5 h-5" style={{ color: 'var(--pink-400)' }} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm" style={{ color: 'var(--text-dark)' }}>Order #{order.id}</p>
                                                <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: '#b06080' }}>
                                                    <Calendar className="w-3 h-3" />
                                                    Pickup: {formatDate(order.pickup_date)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`badge ${cfg.className}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {cfg.label}
                                            </span>
                                            {cfg.canCancel && (
                                                <button
                                                    onClick={() => setCancelOrder(order)}
                                                    className="p-1.5 rounded-xl transition"
                                                    title="Cancel order"
                                                    style={{ background: '#fff0f0', color: '#dc2626', border: '1.5px solid #fca5a5' }}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Cakes in this order */}
                                    {order.cakes && order.cakes.length > 0 && (
                                        <div className="space-y-2">
                                            {order.cakes.map((cake) => (
                                                <div key={cake.id}
                                                    className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl"
                                                    style={{ background: 'var(--pink-50)', border: '1px solid #ffe0ec' }}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {cake.image_url ? (
                                                            <img src={cake.image_url} alt={cake.name}
                                                                className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                                                                style={{ border: '1px solid #ffc2d9' }} />
                                                        ) : (
                                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                                                style={{ background: '#ffc2d9' }}>
                                                                <CakeSlice className="w-4 h-4 text-white" />
                                                            </div>
                                                        )}
                                                        <span className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>{cake.name}</span>
                                                    </div>
                                                    <div className="text-right flex-shrink-0">
                                                        <p className="text-xs font-semibold" style={{ color: '#b06080' }}>
                                                            ×{cake.pivot?.quantity ?? 1}
                                                        </p>
                                                        <p className="text-xs font-bold" style={{ color: 'var(--pink-500)' }}>
                                                            ₱{(cake.price * (cake.pivot?.quantity ?? 1)).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {cancelOrder && (
                <CancelModal order={cancelOrder} onClose={() => setCancelOrder(null)} />
            )}
        </AuthenticatedLayout>
    );
}