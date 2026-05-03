import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ' +
                (active
                    ? 'bg-pink-100 text-pink-700'
                    : 'text-rose-400 hover:bg-pink-50 hover:text-pink-600') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}