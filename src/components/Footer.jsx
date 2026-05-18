"use client";

import React from "react";
import Link from "next/link";

import {
    Trophy,
    Mail,
    Phone,
    MapPin,
    ArrowUpRight,
    ShieldCheck,
    Coins,
} from "lucide-react";

import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
        { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
        { icon: FaXTwitter, href: "https://twitter.com", label: "Twitter" },
        { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
    ];

    const contactInfo = [
        { icon: Phone, text: "+88018xxxxxxxxx", href: "tel:+88018xxxxxxxxx" },
        { icon: Mail, text: "support@sportnest.com", href: "mailto:xyz@sportnest.com" },
        { icon: MapPin, text: "Chattogram, Bangladesh", href: "#" },
    ];

    const quickLinks = [
        { name: "About Arena", href: "/about" },
        { name: "All Facilities", href: "/facilities" },
        { name: "Membership Pricing", href: "/pricing" },
        { name: "Rules & Regulations", href: "/rules" },
    ];

    return (
        <footer className="relative bg-[#050505] border-t border-zinc-900 pt-16 pb-8 text-zinc-400 overflow-hidden select-none">

            {/* Top Mesh Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-linear-to-r from-transparent via-lime-500/20 to-transparent" />
            <div className="absolute top-0 left-1/4 w-75 h-37.5 bg-lime-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-zinc-900">

                    {/* ── COL 1: Brand ── */}
                    <div className="md:col-span-5 flex flex-col items-start gap-4">
                        <Link href="/" className="flex items-center gap-2.5 group select-none">
                            <div
                                className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-lime-500 text-black overflow-hidden"
                                style={{ boxShadow: "0 0 20px rgba(163,230,53,0.3)" }}
                            >
                                <Trophy className="w-5 h-5 stroke-[2.5] relative z-10 group-hover:scale-110 transition-transform duration-300" />
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

                        <p className="text-sm text-zinc-500 max-w-sm mt-2 leading-relaxed">
                            Premium sports hub platform for reserving football turfs, basketball courts, and multi-sport training arenas — seamlessly.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2.5 mt-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-lime-400 hover:border-lime-500/30 hover:bg-lime-500/5 transition-all duration-300 active:scale-90"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── COL 2: Quick Links ── */}
                    <div className="md:col-span-3 flex flex-col gap-4">
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] italic flex items-center gap-1.5">
                            <Coins className="w-3.5 h-3.5 text-lime-400" /> Explore Platform
                        </h3>
                        <ul className="flex flex-col gap-2.5 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-white transition-colors duration-200 flex items-center gap-1 group font-medium"
                                    >
                                        <span>{link.name}</span>
                                        <ArrowUpRight className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-lime-400 transition-all duration-200 -translate-y-0.5" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── COL 3: Contact ── */}
                    <div className="md:col-span-4 flex flex-col gap-4">
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] italic flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-lime-400" /> Ground Support
                        </h3>
                        <ul className="flex flex-col gap-3.5 text-sm">
                            {contactInfo.map((info) => {
                                const Icon = info.icon;
                                return (
                                    <li key={info.text}>
                                        <a
                                            href={info.href}
                                            className={`flex items-start gap-3 text-zinc-400 transition-colors ${info.href !== "#" ? "hover:text-white" : "pointer-events-none"
                                                }`}
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/60 flex items-center justify-center shrink-0 text-lime-400">
                                                <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                                            </div>
                                            <span className="font-medium pt-0.5 leading-relaxed">{info.text}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                </div>

                {/* ── Bottom Bar ── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-semibold uppercase tracking-wider text-zinc-600">
                    <p className="text-center sm:text-left">
                        © {currentYear} <span className="text-zinc-500 font-bold">SportNest Inc.</span> All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}