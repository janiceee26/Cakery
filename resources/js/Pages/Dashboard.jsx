import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { CakeSlice, ShoppingBag, Clock, CheckCircle2, ChefHat, ArrowRight, PackageCheck } from 'lucide-react';

export default function Dashboard({ auth, orders = [] }) {
    const counts = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        baking: orders.filter(o => o.status === 'baking').length,
        ready: orders.filter(o => o.status === 'ready').length,
        completed: orders.filter(o => o.status === 'completed').length,
    };

    const recentOrders = orders.slice(0, 5);

    const statusConfig = {
        pending:   { label: 'Pending',   className: 'badge-pending',   icon: Clock },
        baking:    { label: 'Baking',    className: 'badge-baking',    icon: ChefHat },
        ready:     { label: 'Ready',     className: 'badge-ready',     icon: PackageCheck },
        completed: { label: 'Completed', className: 'badge-completed', icon: CheckCircle2 },
    };

    const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                            Welcome back, {auth.user.name.split(' ')[0]} 🩷
                        </h2>
                        <p className="text-sm mt-0.5" style={{ color: '#b06080' }}>
                            Here's a summary of your cake orders.
                        </p>
                    </div>
                    <Link href={route('cakes.index')} className="btn-primary">
                        Order a Cake <CakeSlice className="w-4 h-4" />
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 fade-up">
                        {[
                            { label: 'Total Orders',  value: counts.total,     icon: ShoppingBag,  color: '#f9437a', bg: '#fff0f5' },
                            { label: 'Pending',       value: counts.pending,   icon: Clock,        color: '#c2410c', bg: '#fff7ed' },
                            { label: 'Baking',        value: counts.baking,    icon: ChefHat,      color: '#be185d', bg: '#fff0f5' },
                            { label: 'Completed',     value: counts.completed, icon: CheckCircle2, color: '#15803d', bg: '#f0fdf4' },
                        ].map((stat) => (
                            <div key={stat.label} className="cakery-card p-5 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: stat.bg }}>
                                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold" style={{ color: 'var(--text-dark)', fontFamily: 'Playfair Display, serif' }}>
                                        {stat.value}
                                    </p>
                                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#b06080' }}>
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Ready to pick up alert */}
                    {counts.ready > 0 && (
                        <div
                            className="fade-up fade-up-1 flex items-center gap-4 p-4 rounded-2xl"
                            style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0' }}
                        >
                            <PackageCheck className="w-6 h-6 flex-shrink-0" style={{ color: '#15803d' }} />
                            <div className="flex-1">
                                <p className="font-semibold text-sm" style={{ color: '#15803d' }}>
                                    🎉 {counts.ready} order{counts.ready > 1 ? 's are' : ' is'} ready for pickup!
                                </p>
                            </div>
                            <Link href={route('orders.index')} className="text-xs font-bold flex items-center gap-1" style={{ color: '#15803d' }}>
                                View <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    )}

                    {/* Recent Orders */}
                    <div className="cakery-card p-6 fade-up fade-up-2">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                                Recent Orders
                            </h3>
                            {orders.length > 0 && (
                                <Link href={route('orders.index')} className="text-xs font-semibold flex items-center gap-1" style={{ color: 'var(--pink-500)' }}>
                                    View all <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            )}
                        </div>

                        {recentOrders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-14 rounded-2xl" style={{ background: 'var(--pink-50)', border: '1.5px dashed #ffc2d9' }}>
                                <CakeSlice className="w-12 h-12 mb-3" style={{ color: '#ffc2d9' }} />
                                <p className="font-semibold" style={{ color: '#b06080' }}>No orders yet</p>
                                <p className="text-sm mt-1 mb-5" style={{ color: '#d4a5b5' }}>Place your first cake order!</p>
                                <Link href={route('cakes.index')} className="btn-primary text-sm">
                                    Browse Menu <CakeSlice className="w-4 h-4" />
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentOrders.map((order) => {
                                    const cfg = statusConfig[order.status] || statusConfig.pending;
                                    const StatusIcon = cfg.icon;
                                    const firstCake = order.cakes?.[0];
                                    return (
                                        <div
                                            key={order.id}
                                            className="flex items-center justify-between gap-4 p-4 rounded-2xl transition"
                                            style={{ background: 'var(--pink-50)', border: '1.5px solid #ffe0ec' }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                                    style={{ background: 'white', border: '1.5px solid #ffc2d9' }}>
                                                    <CakeSlice className="w-5 h-5" style={{ color: 'var(--pink-400)' }} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>
                                                        {firstCake ? firstCake.name : `Order #${order.id}`}
                                                        {order.cakes?.length > 1 && <span className="text-xs ml-1" style={{ color: '#b06080' }}>+{order.cakes.length - 1} more</span>}
                                                    </p>
                                                    <p className="text-xs" style={{ color: '#b06080' }}>
                                                        Pickup: {formatDate(order.pickup_date)}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`badge ${cfg.className}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {cfg.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 fade-up fade-up-3">
                        <Link href={route('cakes.index')}
                            className="cakery-card p-5 flex items-center gap-4 group"
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #ffd6e7, #ffb8d2)' }}>
                                <CakeSlice className="w-6 h-6" style={{ color: 'var(--pink-600)' }} />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-sm" style={{ color: 'var(--text-dark)', fontFamily: 'Playfair Display, serif' }}>Browse our Menu</p>
                                <p className="text-xs mt-0.5" style={{ color: '#b06080' }}>See all available cakes & place an order</p>
                            </div>
                            <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition" style={{ color: 'var(--pink-500)' }} />
                        </Link>

                        <Link href={route('orders.index')}
                            className="cakery-card p-5 flex items-center gap-4 group"
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)' }}>
                                <ShoppingBag className="w-6 h-6" style={{ color: '#0369a1' }} />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-sm" style={{ color: 'var(--text-dark)', fontFamily: 'Playfair Display, serif' }}>My Orders</p>
                                <p className="text-xs mt-0.5" style={{ color: '#b06080' }}>Track & manage your cake orders</p>
                            </div>
                            <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition" style={{ color: 'var(--pink-500)' }} />
                        </Link>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}