"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Trophy, Zap, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SPORTS_DATA = [
    {
        id: "football",
        title: "Elite Football Turfs",
        tagline: "Unleash Your Inner Champion On Professional Grass",
        description:
            "FIFA-grade pro turf fields equipped with advanced floodlighting systems for premium night tournaments.",
        image: "https://i.ibb.co.com/pjvzgpnW/football.jpg",
        accentColor: "from-lime-400 to-emerald-500",
        glowColor: "rgba(163,230,53,0.12)",
    },
    {
        id: "basketball",
        title: "Championship Courts",
        tagline: "Dominate The Hardwood Arena",
        description:
            "FIBA standard indoor maple-wood courts with high-elasticity hoops designed for pro-tier performance.",
        image: "https://i.ibb.co.com/twNWMjpJ/basketball.png",
        accentColor: "from-amber-400 to-orange-500",
        glowColor: "rgba(245,158,11,0.12)",
    },
    {
        id: "badminton",
        title: "Pro Badminton Courts",
        tagline: "Smash Harder With Precision Mats",
        description:
            "Premium BWF-approved multi-layer mats offering maximum joint protection and ultimate shock absorption.",
        image: "https://i.ibb.co.com/ZzL7NnmH/badminton.jpg",
        accentColor: "from-cyan-400 to-blue-500",
        glowColor: "rgba(34,211,238,0.12)",
    },
    {
        id: "swimming",
        title: "Olympic Swimming Lanes",
        tagline: "Dive Into Pure Aquatic Speed",
        description:
            "Temperature-controlled 50-meter professional lap lanes featuring advanced crystal-clear filtration.",
        image: "https://i.ibb.co.com/FbjGnTh7/swimming.jpg",
        accentColor: "from-blue-400 to-indigo-600",
        glowColor: "rgba(96,165,250,0.12)",
    },
    {
        id: "tennis",
        title: "Grand Slam Tennis Courts",
        tagline: "Ace Every Match On Premium Acrylic Surface",
        description:
            "All-weather multi-layered cushion acrylic courts providing flawless ball bounce and professional grip.",
        image: "https://i.ibb.co.com/7t4MTHr1/tennis.jpg",
        accentColor: "from-yellow-400 to-lime-500",
        glowColor: "rgba(234,179,8,0.12)",
    },
];

// ── Slide transition config ──────────────────────────────────────────────────
//  bg image: slow, cinematic (1.4 s ease-in-out)
//  text:     snappy but NOT jarring (0.55 s)
// ─────────────────────────────────────────────────────────────────────────────
const BG_VARIANTS = {
    enter: { opacity: 0, scale: 1.06 },
    center: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
        opacity: 0,
        scale: 0.97,
        transition: { duration: 0.9, ease: [0.4, 0, 1, 1] },
    },
};

const TEXT_VARIANTS = {
    enter: { opacity: 0, y: 22 },
    center: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
        opacity: 0,
        y: -14,
        transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
    },
};

export default function Banner() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeSport = SPORTS_DATA[activeIndex];

    // Auto-rotate every 8 s
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % SPORTS_DATA.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-162.5 md:h-180 bg-zinc-950 overflow-hidden flex items-center border-b border-zinc-900">

            {/* ── BACKGROUND IMAGE SLIDER ─────────────────────────────────── */}
            <div className="absolute inset-0 z-0">
                {/* dot-grid texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] bg-size-[24px_24px] opacity-25 z-10" />

                <AnimatePresence initial={false} mode="sync">
                    <motion.div
                        key={activeSport.id}
                        variants={BG_VARIANTS}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0"
                    >
                        {/* brightness and opacity*/}
                        <Image
                            src={activeSport.image}
                            alt={activeSport.title}
                            fill
                            priority={activeIndex === 0}
                            sizes="100vw"
                            className="object-cover"
                            style={{
                                opacity: 0.75,
                                filter: "contrast(1.1) brightness(1.35) saturate(1.1)",
                            }}
                            onError={(e) => {
                                e.currentTarget.style.opacity = "0";
                            }}
                        />

                        {/* sport-tinted glow */}
                        <div
                            className="absolute inset-0 pointer-events-none transition-colors duration-1000"
                            style={{ backgroundColor: activeSport.glowColor }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* vignette overlays — keep text readable */}
                <div className="absolute inset-0 z-20 bg-linear-to-r from-zinc-950 via-zinc-950/75 to-transparent" />
                <div className="absolute inset-0 z-20 bg-linear-to-t from-zinc-950/90 via-transparent to-zinc-950/40" />
            </div>

            {/* ── HERO CONTENT ─────────────────────────────────────────────── */}
            <div className="relative z-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                {/* LEFT — Text */}
                <div className="lg:col-span-7 flex flex-col items-start text-left">

                    {/* Live badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800/80 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 italic shadow-xl"
                    >
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500" />
                        </span>
                        Arena Live Booking System
                    </motion.div>


                    <div className="min-h-50 sm:min-h-57.5">
                        <AnimatePresence initial={false} mode="wait">
                            <motion.div
                                key={activeSport.id}
                                variants={TEXT_VARIANTS}
                                initial="enter"
                                animate="center"
                                exit="exit"
                            >
                                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white italic leading-none">
                                    Book Your <br />
                                    <span
                                        className={`bg-linear-to-r ${activeSport.accentColor} bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]`}
                                    >
                                        {activeSport.title}
                                    </span>
                                </h1>

                                <p className="text-zinc-200 font-bold uppercase tracking-wider text-xs sm:text-sm mt-4 max-w-xl italic flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-lime-400 shrink-0" />
                                    {activeSport.tagline}
                                </p>

                                <p className="text-zinc-400 text-sm mt-3 max-w-lg leading-relaxed font-medium">
                                    {activeSport.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex flex-wrap gap-4 mt-8 w-full sm:w-auto"
                    >
                        <Link
                            href="/facilities"
                            className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2 bg-linear-to-r from-lime-400 to-lime-500 hover:from-lime-300 hover:to-lime-400 text-black font-black text-xs uppercase tracking-widest italic rounded-xl h-12 px-8 transition-all duration-200 active:scale-95 shadow-[0_0_30px_rgba(163,230,53,0.25)] group">
                            <span>Reserve Court Now</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-black text-xs uppercase tracking-widest italic rounded-xl h-12 px-7 transition-all">
                            <Trophy className="w-4 h-4 text-lime-400" />
                            <span>View Tournaments</span>
                        </button>
                    </motion.div>
                </div>

                {/* RIGHT — Sport Selector */}
                <div className="lg:col-span-5 w-full flex justify-end">
                    <div className="w-full max-w-xs bg-zinc-950/60 p-4 rounded-2xl border border-zinc-900 backdrop-blur-md flex flex-col gap-2 shadow-2xl">
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1 mb-2 flex items-center justify-between">
                            <span>Select Sport Nest</span>
                            <Star className="w-3 h-3 text-lime-400" />
                        </p>

                        {SPORTS_DATA.map((sport, index) => {
                            const isSelected = index === activeIndex;
                            return (
                                <button
                                    key={sport.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 text-left group ${isSelected
                                        ? "bg-zinc-900 border-zinc-700 shadow-[0_0_20px_rgba(255,255,255,0.02)]"
                                        : "bg-transparent border-transparent hover:bg-zinc-900/40 hover:border-zinc-900"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all duration-300 ${isSelected
                                                ? `bg-linear-to-br ${sport.accentColor} text-black font-black scale-105`
                                                : "bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white"
                                                }`}
                                        >
                                            {index + 1}
                                        </div>
                                        <div className="flex flex-col">
                                            <span
                                                className={`text-xs font-black uppercase tracking-wider transition-colors ${isSelected ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                                                    }`}
                                            >
                                                {sport.id}
                                            </span>
                                            <span className="text-[9px] text-zinc-500 font-medium truncate max-w-35">
                                                {sport.title.split(" ")[0]} Arena
                                            </span>
                                        </div>
                                    </div>

                                    {/* Active dot */}
                                    <div
                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isSelected
                                            ? "bg-lime-400 shadow-[0_0_8px_#a3e635] scale-125"
                                            : "bg-transparent scale-0"
                                            }`}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── PROGRESS BAR ─────────────────────────────────────────────── */}
            <div className="absolute bottom-0 left-0 right-0 z-30 flex gap-1 px-4 sm:px-8 pb-4">
                {SPORTS_DATA.map((sport, index) => (
                    <button
                        key={sport.id}
                        onClick={() => setActiveIndex(index)}
                        className="flex-1 h-0.5 rounded-full overflow-hidden bg-zinc-800 cursor-pointer"
                    >
                        {index === activeIndex && (
                            <motion.div
                                key={`progress-${activeIndex}`}
                                className={`h-full bg-linear-to-r ${sport.accentColor}`}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 8, ease: "linear" }}
                            />
                        )}
                        {index < activeIndex && (
                            <div className={`h-full w-full bg-linear-to-r ${sport.accentColor} opacity-40`} />
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
}