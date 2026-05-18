"use client";

import React, { useState } from "react";
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
    ChevronDown,
    Menu,
    X,
} from "lucide-react";

// better-auth 
// import { authClient } from "@/lib/auth-client";

const PUBLIC_LINKS = [
    { href: "/", label: "Home", icon: Home },
    { href: "/facilities", label: "All Facilities", icon: Dumbbell },
];

const PRIVATE_LINKS = [
    { href: "/bookings", label: "My Bookings", icon: CalendarDays },
    { href: "/add-facility", label: "Add Facility", icon: PlusCircle },
    { href: "/manage", label: "Manage My Facilities", icon: LayoutDashboard },
];

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    // ── Auth state (Fake state setting to true for testing, change to false or sync with authClient) ──
    const isPending = false;
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Testing purpose context toggle
    const user = { name: "Ghost", email: "ghost@sportnest.com", image: "" };

    const handleLogout = () => {
        console.log("logout");
        setIsLoggedIn(false);
    };

    // Real better-auth :
    // const { data: session, isPending } = authClient.useSession();
    // const user = session?.user;
    // const isLoggedIn = !!user;
    // const handleLogout = () => authClient.signOut();

    const isActive = (path) => pathname === path;

    const NavLink = ({ href, label, icon: Icon, onClick }) => (
        <Link
            href={href}
            onClick={onClick}
            className={`
                relative flex items-center gap-1.5 px-3 py-2 rounded-lg
                text-xs font-bold uppercase tracking-widest
                transition-all duration-200 group overflow-hidden
                ${isActive(href)
                    ? "text-lime-400 bg-lime-400/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }
            `}
        >
            <Icon className="w-3.5 h-3.5 stroke-[2.2] group-hover:scale-110 transition-transform duration-200" />
            {label}

            {/* Smart Tracking Underline on Click & Hover */}
            <span className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-lime-400 transition-all duration-200 origin-center
                ${isActive(href)
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                }`}
            />
        </Link>
    );

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
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
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
                            <NavLink key={link.href} {...link} />
                        ))}
                        {isLoggedIn && PRIVATE_LINKS.map((link) => (
                            <NavLink key={link.href} {...link} />
                        ))}
                    </nav>

                    {/* ── Right Side ── */}
                    <div className="flex items-center gap-3 shrink-0">

                        {isPending ? (
                            <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
                        ) : isLoggedIn ? (
                            /* ── daisyUI Profile Dropdown ── */
                            <div className="dropdown dropdown-end z-50">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-colors outline-none group select-none"
                                >
                                    <div className="avatar placeholder">
                                        <div className="w-8 h-8 rounded-full ring-2 ring-lime-500/30 bg-zinc-800 text-white font-bold text-sm">
                                            {user?.image ? (
                                                <img src={user.image} alt={user.name} />
                                            ) : (
                                                <span>{user?.name?.[0] || "U"}</span>
                                            )}
                                        </div>
                                    </div>
                                    <span className="hidden lg:block text-sm font-bold text-zinc-300 group-hover:text-white max-w-[90px] truncate">
                                        {user?.name?.split(" ")[0]}
                                    </span>
                                    <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-transform group-hover:translate-y-0.5" />
                                </div>

                                {/* Dropdown Menu Content */}
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-2 shadow-2xl bg-zinc-900 border border-zinc-800 rounded-xl w-60 text-zinc-200 mt-2 gap-1"
                                >
                                    {/* User Details Header */}
                                    <li className="px-3 py-2 pointer-events-none select-none border-b border-zinc-800/80 mb-1">
                                        <p className="text-xs font-bold text-zinc-500 p-0">Signed in as</p>
                                        <p className="text-sm font-black text-lime-400 truncate p-0 mt-0.5">{user?.email}</p>
                                    </li>

                                    <li>
                                        <Link href="/bookings" className="flex items-center gap-2 py-2.5 font-semibold text-sm hover:text-white active:bg-lime-400/10">
                                            <CalendarDays className="w-4 h-4 text-lime-400" /> My Bookings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/add-facility" className="flex items-center gap-2 py-2.5 font-semibold text-sm hover:text-white active:bg-lime-400/10">
                                            <PlusCircle className="w-4 h-4 text-lime-400" /> Add Facility
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/manage" className="flex items-center gap-2 py-2.5 font-semibold text-sm hover:text-white active:bg-lime-400/10">
                                            <LayoutDashboard className="w-4 h-4 text-lime-400" /> Manage My Facilities
                                        </Link>
                                    </li>

                                    {/* Logout Button */}
                                    <li className="border-t border-zinc-800/80 mt-1 pt-1">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 py-2.5 font-bold text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 active:bg-red-500/20"
                                        >
                                            <LogOut className="w-4 h-4" /> Log Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            /* ── Tailwind Pure Login Button ── */
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-400 text-black font-black text-xs uppercase tracking-widest rounded-xl h-9 px-5 transition-all duration-200 active:scale-95 shadow-[0_0_18px_rgba(163,230,53,0.3)]"
                            >
                                Login
                                <LogIn className="w-4 h-4 stroke-[2.5]" />
                            </Link>
                        )}

                        {/* Mobile Toggle Button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all outline-none"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Mobile Drawer Menu ── */}
            <div className={`md:hidden border-t border-zinc-800/60 bg-[#080808] overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-screen" : "max-h-0"}`}>
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
                                >
                                    <Icon className="w-4 h-4 stroke-[2.2]" />
                                    {label}
                                </Link>
                            ))}
                            <div className="h-px bg-zinc-800 my-2" />
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMobileOpen(false);
                                }}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-all w-full text-left"
                            >
                                <LogOut className="w-4 h-4 stroke-[2.2]" />
                                Log Out
                            </button>
                        </>
                    )}

                    {!isLoggedIn && !isPending && (
                        <>
                            <div className="h-px bg-zinc-800 my-2" />
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-lime-500 text-black font-black uppercase tracking-wider text-sm active:scale-95 transition-all"
                                style={{ boxShadow: "0 0 16px rgba(163,230,53,0.25)" }}
                            >
                                <LogIn className="w-4 h-4 stroke-[2.5]" />
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}