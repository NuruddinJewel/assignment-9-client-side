"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Trophy,
    Home,
    Dumbbell,
    CalendarDays,
    PlusCircle,
    LayoutDashboard,
    LogOut,
    LogIn,
    UserPlus,
    ChevronDown,
    Menu,
    X,
} from "lucide-react";
import Image from "next/image";

// better-auth 
import { authClient } from "@/lib/auth-client";

// ─────────────────────────────────────────────────────────────────────────────
//  NavLink defined OUTSIDE Navbar 
// ─────────────────────────────────────────────────────────────────────────────
function NavLink({ href, label, icon: Icon, active, onClick }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`
                relative flex items-center gap-1.5 px-3 py-2 rounded-lg
                text-xs font-bold uppercase tracking-widest
                transition-all duration-200 group overflow-hidden
                ${active
                    ? "text-lime-400 bg-lime-400/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }
            `}
        >
            <Icon className="w-3.5 h-3.5 stroke-[2.2] group-hover:scale-110 transition-transform duration-200" />
            {label}
            <span
                className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-lime-400 transition-all duration-200 origin-center
                    ${active
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                    }`}
            />
        </Link>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
const PUBLIC_LINKS = [
    { href: "/", label: "Home", icon: Home },
    { href: "/facilities", label: "All Facilities", icon: Dumbbell },
];

const PRIVATE_LINKS = [
    { href: "/dashboard/my-bookings", label: "My Bookings", icon: CalendarDays },
    { href: "/dashboard/add-facility", label: "Add Facility", icon: PlusCircle },
    { href: "/dashboard/manage-facilities", label: "Manage My Facilities", icon: LayoutDashboard },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Real better-auth:
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const isLoggedIn = !!user;
    const handleLogout = async () => { await authClient.signOut(); setDropdownOpen(false); };

    //  Dropdown close on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isActive = (path) => pathname === path;

    //  Avatar initials helper
    const initials = user?.name
        ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
        : "U";

    return (
        <header
            className="sticky top-0 z-50 w-full border-b border-zinc-800/70 bg-[#080808]/90 backdrop-blur-xl"
            style={{ boxShadow: "0 1px 0 rgba(163,230,53,0.07), 0 4px 32px rgba(0,0,0,0.5)" }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">

                    {/* ── Logo ── */}
                    <Link href="/" className="flex items-center gap-2.5 group shrink-0 select-none">
                        <div
                            className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-lime-500 text-black overflow-hidden"
                            style={{ boxShadow: "0 0 20px rgba(163,230,53,0.4)" }}
                        >
                            <Trophy className="w-5 h-5 stroke-[2.5] relative z-10 group-hover:scale-110 transition-transform duration-300" />
                            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-black text-lg tracking-tight text-white uppercase">
                                Sport<span className="text-lime-400">Nest</span>
                            </span>
                            <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-500 font-semibold">
                                Facility Booking
                            </span>
                        </div>
                    </Link>

                    {/* ── Desktop Nav ── */}
                    <nav className="hidden md:flex items-center gap-1">
                        {PUBLIC_LINKS.map((link) => (
                            <NavLink key={link.href} {...link} active={isActive(link.href)} />
                        ))}
                        {isLoggedIn && PRIVATE_LINKS.map((link) => (
                            <NavLink key={link.href} {...link} active={isActive(link.href)} />
                        ))}
                    </nav>

                    {/* ── Right Side ── */}
                    <div className="flex items-center gap-3 shrink-0">

                        {isPending ? (
                            <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
                        ) : isLoggedIn ? (

                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen((prev) => !prev)}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-colors outline-none group select-none"
                                    aria-expanded={dropdownOpen}
                                    aria-haspopup="true"
                                >
                                    <div className="w-8 h-8 rounded-full ring-2 ring-lime-500/30 bg-zinc-800 overflow-hidden flex items-center justify-center shrink-0 relative">
                                        {user?.image ? (
                                            <Image
                                                src={user.image}
                                                alt={user?.name || "User Avatar"}
                                                fill
                                                sizes="32px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <span className="text-white font-bold text-xs">{initials}</span>
                                        )}
                                    </div>
                                    <span className="hidden lg:block text-sm font-bold text-zinc-300 group-hover:text-white max-w-22.5 truncate">
                                        {user?.name?.split(" ")[0]}
                                    </span>
                                    <ChevronDown
                                        className={`w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {/* Dropdown Panel */}
                                {dropdownOpen && (
                                    <ul className="absolute right-0 top-full mt-2 w-60 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-2 flex flex-col gap-1 z-50">
                                        <li className="px-3 py-2 border-b border-zinc-800/80 mb-1 select-none pointer-events-none">
                                            <p className="text-xs font-bold text-zinc-500">Signed in as</p>
                                            <p className="text-sm font-black text-lime-400 truncate mt-0.5">{user?.email}</p>
                                        </li>

                                        {PRIVATE_LINKS.map((link) => {
                                            const Icon = link.icon;
                                            return (
                                                <li key={link.href}>
                                                    <Link
                                                        href={link.href}
                                                        onClick={() => setDropdownOpen(false)}
                                                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg font-semibold text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                                                    >
                                                        <Icon className="w-4 h-4 text-lime-400 shrink-0" />
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            );
                                        })}

                                        <li className="border-t border-zinc-800/80 mt-1 pt-1">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg font-bold text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                                            >
                                                <LogOut className="w-4 h-4 shrink-0" />
                                                Log Out
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>

                        ) : (
                            // ── Desktop Auth Buttons (Login and Register) ──
                            <div className="hidden sm:flex items-center gap-2">
                                <Link
                                    href="/register"
                                    className="inline-flex items-center justify-center gap-1.5 border border-zinc-800 hover:border-zinc-700 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-xl h-9 px-4 transition-all duration-200 active:scale-95"
                                >
                                    <UserPlus className="w-3.5 h-3.5 text-lime-400 stroke-[2.2]" />
                                    Register
                                </Link>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center gap-1.5 bg-lime-500 hover:bg-lime-400 text-black font-black text-xs uppercase tracking-widest rounded-xl h-9 px-4 transition-all duration-200 active:scale-95 shadow-[0_0_18px_rgba(163,230,53,0.3)]"
                                >
                                    Login
                                    <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
                                </Link>
                            </div>
                        )}

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileOpen((prev) => !prev)}
                            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all outline-none"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Mobile Drawer ── */}
            <div
                className={`md:hidden border-t border-zinc-800/60 bg-[#080808] overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 py-4 flex flex-col gap-1">
                    {PUBLIC_LINKS.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all
                                ${isActive(href) ? "text-lime-400 bg-lime-400/10" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                        >
                            <Icon className="w-4 h-4 stroke-[2.2]" />
                            {label}
                        </Link>
                    ))}

                    {isLoggedIn && (
                        <>
                            <div className="h-px bg-zinc-800 my-2" />
                            <p className="px-4 text-[9px] text-zinc-600 uppercase tracking-[0.2em] font-bold mb-1">My Account</p>
                            {PRIVATE_LINKS.map(({ href, label, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all
                                        ${isActive(href) ? "text-lime-400 bg-lime-400/10" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                                // 
                                >
                                    <Icon className="w-4 h-4 stroke-[2.2]" />
                                    {label}
                                </Link>
                            ))}
                            <div className="h-px bg-zinc-800 my-2" />
                            <button
                                onClick={() => { handleLogout(); setMobileOpen(false); }}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-all w-full text-left"
                            >
                                <LogOut className="w-4 h-4 stroke-[2.2]" />
                                Log Out
                            </button>
                        </>
                    )}

                    {/* ── Mobile Auth UI (Register + Login buttons ) ── */}
                    {!isLoggedIn && !isPending && (
                        <>
                            <div className="h-px bg-zinc-800 my-2" />
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/register"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-800 bg-white/5 text-white font-bold uppercase tracking-wider text-sm active:scale-95 transition-all"
                                >
                                    <UserPlus className="w-4 h-4 text-lime-400 stroke-[2.2]" />
                                    Register
                                </Link>
                                <Link
                                    href="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-lime-500 text-black font-black uppercase tracking-wider text-sm active:scale-95 transition-all shadow-[0_0_16px_rgba(163,230,53,0.25)]"
                                >
                                    <LogIn className="w-4 h-4 stroke-[2.5]" />
                                    Login
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}