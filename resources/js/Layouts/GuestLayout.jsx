import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { Cake, CakeSlice, IceCream } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex" style={{ background: 'var(--cream)' }}>
            <div
                className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #ffc2d9 0%, #ff9dbf 50%, #f9437a 100%)' }}
            >
                <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-20"
                    style={{ background: 'white' }} />
                <div className="absolute bottom-[-60px] right-[-60px] w-56 h-56 rounded-full opacity-15"
                    style={{ background: 'white' }} />
                <div className="absolute top-1/3 right-[-40px] w-36 h-36 rounded-full opacity-20"
                    style={{ background: 'white' }} />

                <div className="relative z-10 flex flex-col items-center gap-6 px-12 text-white text-center">
                    <ApplicationLogo className="w-28 h-28 drop-shadow-lg" />
                    <h1 className="font-display text-5xl font-bold leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Cakery
                    </h1>
                    
                    <p className="text-lg opacity-90 max-w-xs leading-relaxed flex items-center justify-center flex-wrap gap-1.5">
                        Handcrafted cakes made with love, delivered fresh to your door <Cake className="w-5 h-5 inline-block" />
                    </p>

                    <div className="flex gap-4 mt-4 animate-bounce">
                        <CakeSlice className="w-8 h-8" />
                        <Cake className="w-8 h-8" />
                        <IceCream className="w-8 h-8" />
                    </div>
                </div>
            </div>

            <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-6 py-12">
                <div className="lg:hidden flex flex-col items-center mb-8">
                    <ApplicationLogo className="w-16 h-16" />
                    <span className="mt-2 text-2xl font-bold text-pink-600" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Cakery
                    </span>
                </div>

                <div className="w-full max-w-md">
                    <div className="cakery-card p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}