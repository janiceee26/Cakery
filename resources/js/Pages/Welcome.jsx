import { Head, Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { ArrowRight, CakeSlice, Sparkles } from "lucide-react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to Cakery" />

            <div
                className="min-h-screen flex flex-col"
                style={{
                    background: "var(--cream)",
                    color: "var(--text-dark)",
                }}
            >
                {/* ── Soft radial glow blobs ── */}
                <div
                    className="pointer-events-none fixed inset-0 z-0"
                    aria-hidden="true"
                >
                    <div
                        className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[680px] h-[480px] rounded-full opacity-40"
                        style={{
                            background:
                                "radial-gradient(ellipse, #ffc2d9 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-25"
                        style={{
                            background:
                                "radial-gradient(ellipse, #ff9dbf 0%, transparent 70%)",
                        }}
                    />
                    <div className="absolute inset-0 dots-bg opacity-30" />
                </div>

                {/* ── Navbar ── */}
                <nav className="relative z-10 w-full">
                    <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2 fade-up">
                            <ApplicationLogo className="w-8 h-8" />
                            <span
                                className="text-lg font-bold text-pink-600"
                                style={{
                                    fontFamily: "Playfair Display, serif",
                                }}
                            >
                                Cakery
                            </span>
                        </div>

                        <div className="flex items-center gap-2 fade-up fade-up-1">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="btn-primary text-sm"
                                >
                                    Dashboard <ArrowRight className="w-4 h-4" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="btn-secondary text-sm"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="btn-primary text-sm"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* ── Hero — fully centered ── */}
                <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
                    <div className="flex flex-col items-center text-center max-w-2xl w-full">
                        {/* Logo mark */}
                        <div className="fade-up mb-6">
                            <div
                                className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-lg mx-auto"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #ffd6e7 0%, #ffb8d2 100%)",
                                }}
                            >
                                <ApplicationLogo className="w-14 h-14" />
                            </div>
                        </div>
                        {/* Headline */}
                        <h1
                            className="fade-up fade-up-2 text-5xl sm:text-6xl font-bold leading-tight mb-5"
                            style={{
                                fontFamily: "Playfair Display, serif",
                                color: "var(--text-dark)",
                            }}
                        >
                            Cakes made with
                            <br />
                            <span style={{ color: "var(--pink-500)" }}>
                                love &amp; flour
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p
                            className="fade-up fade-up-3 text-base sm:text-lg leading-relaxed mb-10 max-w-md"
                            style={{ color: "#b06080" }}
                        >
                            Custom cakes baked from scratch for every
                            celebration — birthdays, weddings, or just because
                            you deserve something sweet.
                        </p>

                        {/* CTAs */}
                        <div className="fade-up fade-up-4 flex flex-col sm:flex-row gap-3 justify-center">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="btn-primary"
                                >
                                    Go to Dashboard{" "}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("register")}
                                        className="btn-primary"
                                    >
                                        Order a Cake{" "}
                                        <CakeSlice className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href={route("login")}
                                        className="btn-secondary"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </main>

                <footer className="relative z-10 py-6 text-center">
                    <p style={{ color: "#d4a5b5" }}>
                        © {new Date().getFullYear()} Cakery — Baked with 🩷 by
                        Janice Agnote
                    </p>
                </footer>
            </div>
        </>
    );
}
