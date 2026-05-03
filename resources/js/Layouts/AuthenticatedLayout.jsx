import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    LayoutDashboard,
    CakeSlice,
    ShoppingBag,
    ClipboardList,
    Menu,
    X,
} from "lucide-react";

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const isAdmin = user.role === "admin";
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        {
            href: route("dashboard"),
            label: "Dashboard",
            routeName: "dashboard",
            icon: LayoutDashboard,
        },
        {
            href: route("cakes.index"),
            label: "Cakes",
            routeName: "cakes.index",
            icon: CakeSlice,
        },
        {
            href: route("orders.index"),
            label: "My Orders",
            routeName: "orders.index",
            icon: ShoppingBag,
        },
        ...(isAdmin
            ? [
                  {
                      href: route("admin.orders.index"),
                      label: "Admin Orders",
                      routeName: "admin.orders.index",
                      icon: ClipboardList,
                  },
              ]
            : []),
    ];

    const NavItem = ({ link, mobile = false }) => {
        const isActive = route().current(link.routeName);
        if (mobile) {
            return (
                <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                        background: isActive ? "var(--pink-50)" : "transparent",
                        color: isActive ? "var(--pink-500)" : "#9d4060",
                        fontFamily: "DM Sans, sans-serif",
                    }}
                >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                </Link>
            );
        }
        return (
            <Link
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all"
                style={{
                    background: isActive ? "var(--pink-50)" : "transparent",
                    color: isActive ? "var(--pink-500)" : "#9d4060",
                    border: isActive
                        ? "1.5px solid #ffc2d9"
                        : "1.5px solid transparent",
                    fontFamily: "DM Sans, sans-serif",
                }}
            >
                <link.icon className="w-3.5 h-3.5" />
                {link.label}
            </Link>
        );
    };

    return (
        <div className="min-h-screen" style={{ background: "var(--cream)" }}>
            <nav
                style={{
                    background: "white",
                    borderBottom: "1.5px solid #ffe0ec",
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between gap-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 flex-shrink-0"
                        >
                            <ApplicationLogo className="h-8 w-auto" />
                            <span
                                className="text-lg font-bold hidden sm:block"
                                style={{
                                    color: "var(--pink-600)",
                                    fontFamily: "Playfair Display, serif",
                                }}
                            >
                                Cakery
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-1 flex-1">
                            {navLinks.map((link) => (
                                <NavItem key={link.routeName} link={link} />
                            ))}
                        </div>

                        <div className="hidden md:flex items-center gap-3">
                            {isAdmin && (
                                <span
                                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #ffd6e7, #ffb8d2)",
                                        color: "var(--pink-600)",
                                    }}
                                >
                                    Admin
                                </span>
                            )}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-full transition"
                                        style={{
                                            background: "var(--pink-50)",
                                            border: "1.5px solid #ffc2d9",
                                            color: "var(--pink-600)",
                                            fontFamily: "DM Sans, sans-serif",
                                            fontSize: "0.85rem",
                                            fontWeight: 600,
                                        }}
                                    >
                                        <span
                                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #f9437a 0%, #e0205d 100%)",
                                            }}
                                        >
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                        <span className="max-w-[120px] truncate">
                                            {user.name}
                                        </span>
                                        <svg
                                            className="w-3.5 h-3.5 opacity-50"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        <button
                            className="md:hidden p-2 rounded-xl transition"
                            style={{
                                color: "var(--pink-400)",
                                background: "var(--pink-50)",
                            }}
                            onClick={() => setMobileOpen((v) => !v)}
                        >
                            {mobileOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div
                        className="md:hidden border-t px-4 py-3 space-y-1"
                        style={{ borderColor: "#ffe0ec", background: "white" }}
                    >
                        {navLinks.map((link) => (
                            <NavItem key={link.routeName} link={link} mobile />
                        ))}
                        <div
                            className="border-t mt-3 pt-3 space-y-1"
                            style={{ borderColor: "#ffe0ec" }}
                        >
                            <div className="px-4 py-1.5">
                                <p
                                    className="text-sm font-semibold"
                                    style={{ color: "var(--text-dark)" }}
                                >
                                    {user.name}
                                </p>
                                <p
                                    className="text-xs"
                                    style={{ color: "#b06080" }}
                                >
                                    {user.email}
                                </p>
                            </div>
                            <Link
                                href={route("profile.edit")}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold"
                                style={{
                                    color: "#9d4060",
                                    fontFamily: "DM Sans, sans-serif",
                                }}
                            >
                                Profile
                            </Link>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold w-full text-left"
                                style={{
                                    color: "var(--pink-500)",
                                    fontFamily: "DM Sans, sans-serif",
                                }}
                            >
                                Log Out
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {header && (
                <header
                    style={{
                        background: "white",
                        borderBottom: "1.5px solid #ffe0ec",
                    }}
                >
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
