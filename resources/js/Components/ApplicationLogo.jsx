export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <svg
            className={className}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {/* Cake plate */}
            <ellipse cx="32" cy="50" rx="26" ry="5" fill="#ffc2d9" opacity="0.5" />
            {/* Bottom tier */}
            <rect x="8" y="36" width="48" height="16" rx="6" fill="#ff9dbf" />
            {/* Middle tier */}
            <rect x="14" y="22" width="36" height="16" rx="5" fill="#ffb8d2" />
            {/* Top tier */}
            <rect x="20" y="11" width="24" height="13" rx="4" fill="#ffd6e7" />
            {/* Frosting drips bottom */}
            <path d="M8 40 Q14 44 20 40 Q26 44 32 40 Q38 44 44 40 Q50 44 56 40" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Frosting drips middle */}
            <path d="M14 26 Q20 30 26 26 Q32 30 38 26 Q44 30 50 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Candles */}
            <rect x="27" y="4" width="4" height="8" rx="2" fill="#f9437a" />
            <rect x="36" y="5" width="3" height="7" rx="1.5" fill="#e0205d" />
            <rect x="19" y="5" width="3" height="7" rx="1.5" fill="#f472b6" />
            {/* Flames */}
            <ellipse cx="29" cy="4" rx="2" ry="3" fill="#fbbf24" opacity="0.9" />
            <ellipse cx="37.5" cy="5" rx="1.5" ry="2.2" fill="#fbbf24" opacity="0.9" />
            <ellipse cx="20.5" cy="5" rx="1.5" ry="2.2" fill="#fbbf24" opacity="0.9" />
            {/* Dots decoration */}
            <circle cx="16" cy="44" r="1.5" fill="white" opacity="0.7" />
            <circle cx="24" cy="44" r="1.5" fill="white" opacity="0.7" />
            <circle cx="32" cy="44" r="1.5" fill="white" opacity="0.7" />
            <circle cx="40" cy="44" r="1.5" fill="white" opacity="0.7" />
            <circle cx="48" cy="44" r="1.5" fill="white" opacity="0.7" />
        </svg>
    );
}