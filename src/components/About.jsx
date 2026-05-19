import React from 'react';
import { Target, Shield, Zap, Trophy, Users, Activity } from 'lucide-react';
import Link from 'next/link';

export default function About() {
    return (
        <section className="bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 overflow-hidden relative">

            {/* Background Decorative Blur  */}
            <div className="absolute -top-40 -right-40 w-150 h-150 bg-lime-500/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-150 h-150 bg-lime-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="mx-auto max-w-7xl relative z-10">

                {/* ── Section Header ── */}
                <div className="text-center mb-20">
                    <p className="text-[10px] text-lime-400 font-black uppercase tracking-[0.3em] mb-2">
                        — Who We Are
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white italic leading-tight">
                        Elevating The <span className="text-zinc-500">Game Standard</span>
                    </h2>
                    <p className="text-zinc-500 text-xs font-semibold max-w-md mx-auto mt-2 uppercase tracking-wider">
                        We are building the ultimate ecosystem for athletes, teams, and sports arenas.
                    </p>
                </div>

                {/* ── Core Mission Intro (Two Column Layout) ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
                    {/* Left Column: Bold Text Block */}
                    <div className="lg:col-span-5 space-y-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                            <Activity className="w-3 h-3 text-lime-400" /> Founded in 2026
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight italic">
                            Your Ultimate <span className="text-lime-400">Arena Booking</span> Partner.
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            SportNest started with a single vision: to eliminate the friction between passion and play. We believe that finding and booking a premium sports facility should be as fast and precise as a perfect top-corner strike.
                        </p>
                    </div>

                    {/* Right Column: Mission Card Box */}
                    <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 relative hover:border-zinc-700 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 mb-6">
                            <Target className="w-6 h-6" />
                        </div>
                        <h4 className="text-white font-black text-sm uppercase tracking-wider mb-2">Our Core Mission</h4>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                            To empower local sports communities by providing a seamless, real-time digital booking infrastructure. We bridge the gap between premium arenas and dedicated athletes, making premium turf, court, and gym spaces accessible to everyone with zero friction.
                        </p>
                    </div>
                </div>

                {/* ── Core Values (Three Column Grid) ── */}
                <div className="border-t border-zinc-900/80 pt-16">
                    <div className="text-center sm:text-left mb-10">
                        <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-1">Our Core Values</h4>
                        <p className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider">The principles that drive every slot reservation.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Value 1 */}
                        <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl hover:bg-zinc-900/60 transition-colors">
                            <div className="w-9 h-9 rounded-xl bg-zinc-800/80 flex items-center justify-center text-zinc-400 mb-4">
                                <Zap className="w-4 h-4 text-lime-400" />
                            </div>
                            <h5 className="text-white font-black text-xs uppercase tracking-wider mb-2">Instant Precision</h5>
                            <p className="text-zinc-500 text-xs leading-relaxed">
                                No waiting, no ghost availability. What you see is exactly what you get. Instant confirmations in seconds.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl hover:bg-zinc-900/60 transition-colors">
                            <div className="w-9 h-9 rounded-xl bg-zinc-800/80 flex items-center justify-center text-zinc-400 mb-4">
                                <Shield className="w-4 h-4 text-lime-400" />
                            </div>
                            <h5 className="text-white font-black text-xs uppercase tracking-wider mb-2">Verified Venues</h5>
                            <p className="text-zinc-500 text-xs leading-relaxed">
                                Every pitch, arena, and fitness hub listed on SportNest undergoes strict quality and security checks.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl hover:bg-zinc-900/60 transition-colors">
                            <div className="w-9 h-9 rounded-xl bg-zinc-800/80 flex items-center justify-center text-zinc-400 mb-4">
                                <Trophy className="w-4 h-4 text-lime-400" />
                            </div>
                            <h5 className="text-white font-black text-xs uppercase tracking-wider mb-2">Athlete First</h5>
                            <p className="text-zinc-500 text-xs leading-relaxed">
                                Optimized scheduling parameters designed entirely to fit into your busy, competitive lifestyle.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Stats / Trust Footer Banner ── */}
                <div className="mt-20 p-6 sm:p-10 bg-linear-to-r from-zinc-900 to-zinc-900/40 border border-zinc-800/60 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4 text-center sm:text-left">
                        <div className="w-12 h-12 bg-lime-500/10 border border-lime-500/20 rounded-2xl hidden sm:flex items-center justify-center text-lime-400">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-white font-black text-sm uppercase tracking-wide">Ready to claim your slot?</h4>
                            <p className="text-zinc-500 text-xs font-medium mt-0.5">Join thousands of players already ruling the fields.</p>
                        </div>
                    </div>
                    <Link
                        href="/facilities"
                        className="inline-flex items-center justify-center h-10 px-6 rounded-xl bg-lime-500 hover:bg-lime-400 text-black font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(163,230,53,0.1)] active:scale-[0.98]"
                    >
                        Explore All Arenas
                    </Link>
                </div>
            </div>
        </section>
    );
}