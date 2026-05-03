import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    CakeSlice, Clock, ChefHat, PackageCheck, CheckCircle2,
    Users, ShoppingBag, Plus, Pencil, Trash2, X, Upload
} from 'lucide-react';
import { useState } from 'react';

const statusConfig = {
    pending:   { label: 'Pending',   className: 'badge-pending',   icon: Clock         },
    baking:    { label: 'Baking',    className: 'badge-baking',    icon: ChefHat        },
    ready:     { label: 'Ready',     className: 'badge-ready',     icon: PackageCheck   },
    completed: { label: 'Completed', className: 'badge-completed', icon: CheckCircle2   },
};

const STATUSES = ['pending', 'baking', 'ready', 'completed'];

// ── Status update dropdown ──────────────────────────────────────────────────
function StatusSelect({ order }) {
    const [loading, setLoading] = useState(false);

    const change = (e) => {
        setLoading(true);
        router.patch(
            route('admin.orders.updateStatus', order.id),
            { status: e.target.value },
            { preserveScroll: true, onFinish: () => setLoading(false) }
        );
    };

    return (
        <select
            value={order.status}
            onChange={change}
            disabled={loading}
            className="cakery-input py-1.5 pr-8 text-xs font-semibold"
            style={{ minWidth: 130, cursor: 'pointer', paddingTop: '0.35rem', paddingBottom: '0.35rem' }}
        >
            {STATUSES.map((s) => (
                <option key={s} value={s}>{statusConfig[s].label}</option>
            ))}
        </select>
    );
}

// ── Cake CRUD Modal ──────────────────────────────────────────────────────────
function CakeModal({ cake, onClose }) {
    const isEdit = !!cake;
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: cake?.name ?? '',
        description: cake?.description ?? '',
        price: cake?.price ?? '',
        image_url: cake?.image_url ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            router.put(route('admin.cakes.update', cake.id), data, {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        } else {
            router.post(route('admin.cakes.store'), data, {
                preserveScroll: true,
                onSuccess: () => { reset(); onClose(); },
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(59,26,46,0.35)', backdropFilter: 'blur(4px)' }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="cakery-card w-full max-w-md p-6 fade-up" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                        {isEdit ? 'Edit Cake' : 'Add New Cake'}
                    </h3>
                    <button onClick={onClose} className="p-1.5 rounded-xl" style={{ background: 'var(--pink-50)', color: '#b06080' }}>
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="cakery-label">Cake Name</label>
                        <input type="text" className="cakery-input mt-1" value={data.name}
                            onChange={(e) => setData('name', e.target.value)} required />
                        {errors.name && <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.name}</p>}
                    </div>
                    <div>
                        <label className="cakery-label">Description</label>
                        <textarea rows={3} className="cakery-input mt-1" value={data.description}
                            onChange={(e) => setData('description', e.target.value)} required
                            style={{ resize: 'vertical' }} />
                        {errors.description && <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.description}</p>}
                    </div>
                    <div>
                        <label className="cakery-label">Price (₱)</label>
                        <input type="number" step="0.01" min="0" className="cakery-input mt-1" value={data.price}
                            onChange={(e) => setData('price', e.target.value)} required />
                        {errors.price && <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.price}</p>}
                    </div>
                    <div>
                        <label className="cakery-label">Image URL (optional)</label>
                        <input type="url" className="cakery-input mt-1" value={data.image_url}
                            onChange={(e) => setData('image_url', e.target.value)}
                            placeholder="https://..." />
                        {errors.image_url && <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.image_url}</p>}
                    </div>
                    <button type="submit" className="btn-primary w-full" disabled={processing}>
                        {processing ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Cake'}
                    </button>
                </form>
            </div>
        </div>
    );
}

// ── Delete Cake Confirm ──────────────────────────────────────────────────────
function DeleteCakeModal({ cake, onClose }) {
    const [processing, setProcessing] = useState(false);
    const confirm = () => {
        setProcessing(true);
        router.delete(route('admin.cakes.destroy', cake.id), {
            preserveScroll: true,
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
                    Remove "{cake.name}"?
                </h3>
                <p className="text-sm mb-6" style={{ color: '#b06080' }}>
                    This cake will be removed from the menu permanently.
                </p>
                <div className="flex gap-3 justify-end">
                    <button onClick={onClose} className="btn-secondary">Cancel</button>
                    <button onClick={confirm} className="btn-danger" disabled={processing}>
                        {processing ? 'Removing…' : 'Yes, Remove'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminOrdersIndex({ orders = [], cakes = [], flash = {} }) {
    const [activeTab, setActiveTab] = useState('orders');
    const [cakeModal, setCakeModal] = useState(null); // null | 'new' | cake object
    const [deleteCake, setDeleteCake] = useState(null);

    const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const ordersByStatus = STATUSES.reduce((acc, s) => {
        acc[s] = orders.filter(o => o.status === s).length;
        return acc;
    }, {});

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                            Admin Panel
                        </h2>
                        <p className="text-sm mt-0.5" style={{ color: '#b06080' }}>
                            Manage orders and cake menu.
                        </p>
                    </div>
                    {activeTab === 'cakes' && (
                        <button onClick={() => setCakeModal('new')} className="btn-primary">
                            <Plus className="w-4 h-4" /> Add Cake
                        </button>
                    )}
                </div>
            }
        >
            <Head title="Admin — Orders" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">

                    {/* Flash */}
                    {flash?.success && (
                        <div className="px-4 py-3 rounded-2xl text-sm font-medium fade-up"
                            style={{ background: '#f0fdf4', color: '#15803d', border: '1.5px solid #bbf7d0' }}>
                            🎉 {flash.success}
                        </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 fade-up">
                        {[
                            { label: 'Pending',   value: ordersByStatus.pending,   icon: Clock,         color: '#c2410c', bg: '#fff7ed' },
                            { label: 'Baking',    value: ordersByStatus.baking,    icon: ChefHat,        color: '#be185d', bg: '#fff0f5' },
                            { label: 'Ready',     value: ordersByStatus.ready,     icon: PackageCheck,   color: '#15803d', bg: '#f0fdf4' },
                            { label: 'Completed', value: ordersByStatus.completed, icon: CheckCircle2,   color: '#7c3aed', bg: '#f5f3ff' },
                        ].map((s) => (
                            <div key={s.label} className="cakery-card p-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                                    <s.icon className="w-5 h-5" style={{ color: s.color }} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold" style={{ color: 'var(--text-dark)', fontFamily: 'Playfair Display, serif' }}>{s.value}</p>
                                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#b06080' }}>{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 fade-up fade-up-1">
                        {[
                            { key: 'orders', label: 'All Orders', icon: ShoppingBag },
                            { key: 'cakes',  label: 'Manage Menu', icon: CakeSlice },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition"
                                style={{
                                    background: activeTab === tab.key ? 'linear-gradient(135deg, #f9437a, #e0205d)' : 'white',
                                    color: activeTab === tab.key ? 'white' : '#9d4060',
                                    border: '1.5px solid',
                                    borderColor: activeTab === tab.key ? 'transparent' : '#ffc2d9',
                                    fontFamily: 'DM Sans, sans-serif',
                                }}
                            >
                                <tab.icon className="w-3.5 h-3.5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* ── Orders Tab ── */}
                    {activeTab === 'orders' && (
                        <div className="cakery-card overflow-hidden fade-up fade-up-2">
                            {orders.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16"
                                    style={{ background: 'var(--pink-50)' }}>
                                    <ShoppingBag className="w-12 h-12 mb-3" style={{ color: '#ffc2d9' }} />
                                    <p className="font-semibold" style={{ color: '#b06080' }}>No orders yet</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr style={{ background: 'var(--pink-50)', borderBottom: '1.5px solid #ffe0ec' }}>
                                                {['Order', 'Customer', 'Cakes', 'Pickup Date', 'Status'].map(h => (
                                                    <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide" style={{ color: '#9d4060' }}>
                                                        {h}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order, i) => {
                                                const cfg = statusConfig[order.status] || statusConfig.pending;
                                                const StatusIcon = cfg.icon;
                                                return (
                                                    <tr key={order.id}
                                                        style={{ borderBottom: i < orders.length - 1 ? '1px solid #ffe0ec' : 'none' }}
                                                        className="hover:bg-pink-50 transition"
                                                    >
                                                        <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-dark)' }}>#{order.id}</td>
                                                        <td className="px-4 py-3">
                                                            <p className="font-semibold text-xs" style={{ color: 'var(--text-dark)' }}>{order.user?.name}</p>
                                                            <p className="text-xs" style={{ color: '#b06080' }}>{order.user?.email}</p>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex flex-col gap-0.5">
                                                                {order.cakes?.map(c => (
                                                                    <span key={c.id} className="text-xs" style={{ color: '#9d4060' }}>
                                                                        {c.name} ×{c.pivot?.quantity ?? 1}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-xs" style={{ color: '#b06080' }}>
                                                            {formatDate(order.pickup_date)}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <StatusSelect order={order} />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Cakes Tab ── */}
                    {activeTab === 'cakes' && (
                        <div className="fade-up fade-up-2">
                            {cakes.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 rounded-3xl"
                                    style={{ background: 'var(--pink-50)', border: '1.5px dashed #ffc2d9' }}>
                                    <CakeSlice className="w-12 h-12 mb-3" style={{ color: '#ffc2d9' }} />
                                    <p className="font-semibold" style={{ color: '#b06080' }}>No cakes in the menu yet</p>
                                    <button onClick={() => setCakeModal('new')} className="btn-primary mt-4 text-sm">
                                        <Plus className="w-4 h-4" /> Add First Cake
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {cakes.map((cake) => (
                                        <div key={cake.id} className="cakery-card overflow-hidden">
                                            {cake.image_url ? (
                                                <img src={cake.image_url} alt={cake.name}
                                                    className="w-full h-40 object-cover"
                                                    style={{ borderBottom: '1.5px solid #ffe0ec' }} />
                                            ) : (
                                                <div className="w-full h-40 flex items-center justify-center"
                                                    style={{ background: 'linear-gradient(135deg, #ffd6e7, #ffb8d2)', borderBottom: '1.5px solid #ffe0ec' }}>
                                                    <CakeSlice className="w-12 h-12 opacity-40" style={{ color: 'var(--pink-600)' }} />
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className="font-bold text-sm" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                                                        {cake.name}
                                                    </h4>
                                                    <span className="font-bold text-sm flex-shrink-0" style={{ color: 'var(--pink-500)' }}>
                                                        ₱{Number(cake.price).toFixed(2)}
                                                    </span>
                                                </div>
                                                <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: '#b06080' }}>
                                                    {cake.description}
                                                </p>
                                                <div className="flex gap-2 mt-3">
                                                    <button onClick={() => setCakeModal(cake)}
                                                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-semibold transition"
                                                        style={{ background: 'var(--pink-50)', color: 'var(--pink-600)', border: '1.5px solid #ffc2d9' }}>
                                                        <Pencil className="w-3.5 h-3.5" /> Edit
                                                    </button>
                                                    <button onClick={() => setDeleteCake(cake)}
                                                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-semibold transition"
                                                        style={{ background: '#fff0f0', color: '#dc2626', border: '1.5px solid #fca5a5' }}>
                                                        <Trash2 className="w-3.5 h-3.5" /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>

            {/* Modals */}
            {cakeModal && (
                <CakeModal
                    cake={cakeModal === 'new' ? null : cakeModal}
                    onClose={() => setCakeModal(null)}
                />
            )}
            {deleteCake && (
                <DeleteCakeModal cake={deleteCake} onClose={() => setDeleteCake(null)} />
            )}
        </AuthenticatedLayout>
    );
}