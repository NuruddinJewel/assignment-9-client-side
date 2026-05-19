"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    MapPin, Clock, Users, BadgeDollarSign,
    ArrowRight, Search, SlidersHorizontal, X
} from "lucide-react";

// ── Sport type → color ───────────────────────────────────────────────────────
const TYPE_COLORS = {
    Football: { badge: "bg-lime-400/10 text-lime-400 border-lime-400/20", dot: "bg-lime-400" },
    Basketball: { badge: "bg-amber-400/10 text-amber-400 border-amber-400/20", dot: "bg-amber-400" },
    Badminton: { badge: "bg-cyan-400/10 text-cyan-400 border-cyan-400/20", dot: "bg-cyan-400" },
    Swimming: { badge: "bg-blue-400/10 text-blue-400 border-blue-400/20", dot: "bg-blue-400" },
    Tennis: { badge: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20", dot: "bg-yellow-400" },
    Cricket: { badge: "bg-orange-400/10 text-orange-400 border-orange-400/20", dot: "bg-orange-400" },
    Gymnasium: { badge: "bg-purple-400/10 text-purple-400 border-purple-400/20", dot: "bg-purple-400" },
};
const DEFAULT_COLOR = { badge: "bg-zinc-400/10 text-zinc-400 border-zinc-400/20", dot: "bg-zinc-400" };

// ── Facility Card ────────────────────────────────────────────────────────────
function FacilityCard({ facility }) {
    const color = TYPE_COLORS[facility.type] || DEFAULT_COLOR;

    // If image link is broken
    const [imgSrc, setImgSrc] = useState(facility.image || "https://placehold.co/400x200/18181b/a3e635?text=SportNest");

    return (
        <div className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            {/* Image Box */}
            <div className="relative h-44 overflow-hidden bg-zinc-800 w-full">
                <Image
                    src={imgSrc}
                    alt={facility.name}
                    fill // width/height (fill)
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    onError={() => {
                        setImgSrc("https://placehold.co/400x200/18181b/a3e635?text=SportNest");
                    }}
                />
                <span className={`absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${color.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
                    {facility.type}
                </span>
                <span className={`absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-zinc-700 text-white text-[11px] font-black`}>
                    <BadgeDollarSign className="w-3 h-3 text-lime-400" />
                    ${facility.pricePerHour}/hr
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-4 gap-3">
                <h3 className="text-white font-black text-sm uppercase tracking-wide leading-tight line-clamp-2 group-hover:text-lime-400 transition-colors">
                    {facility.name}
                </h3>
                <div className="flex items-start gap-2 text-zinc-500 text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-zinc-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{facility.location}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                    <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-zinc-600" />
                        {facility.capacity} players
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-600" />
                        {facility.availableSlots?.length || 0} slots
                    </span>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 flex-1">
                    {facility.description}
                </p>
                {facility.availableSlots?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {facility.availableSlots.slice(0, 2).map((slot, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700/60 text-[9px] text-zinc-400 font-bold tracking-wide">
                                {slot}
                            </span>
                        ))}
                        {facility.availableSlots.length > 2 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700/60 text-[9px] text-zinc-500 font-bold">
                                +{facility.availableSlots.length - 2} more
                            </span>
                        )}
                    </div>
                )}
                <Link
                    href={`/facilities/${facility._id}`}
                    className="mt-1 w-full inline-flex items-center justify-center gap-2 h-9 rounded-xl bg-lime-500 hover:bg-lime-400 active:scale-95 text-black font-black text-xs uppercase tracking-widest transition-all duration-200 group/btn shadow-[0_0_20px_rgba(163,230,53,0.15)]"
                >
                    Book Now
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div className="flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden animate-pulse">
            <div className="h-44 bg-zinc-800" />
            <div className="p-4 flex flex-col gap-3">
                <div className="h-4 bg-zinc-800 rounded w-3/4" />
                <div className="h-3 bg-zinc-800 rounded w-1/2" />
                <div className="h-3 bg-zinc-800 rounded w-full" />
                <div className="h-3 bg-zinc-800 rounded w-5/6" />
                <div className="h-9 bg-zinc-800 rounded-xl mt-1" />
            </div>
        </div>
    );
}

// ── All Facilities Page ───────────────────────────────────────────────────────
const ALL_TYPES = ["All", "Football", "Basketball", "Badminton", "Swimming", "Tennis", "Cricket", "Gymnasium"];

export default function FacilitiesPage() {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [activeType, setActiveType] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        fetch(`${apiUrl}/facilities`, { cache: 'no-store' })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch facilities");
                return res.json();
            })
            .then((data) => { setFacilities(data); setLoading(false); })
            .catch((err) => { setError(err.message); setLoading(false); });
    }, []);

    // ── Filter + Search + Sort ───────────────────────────────────────────────
    const filtered = useMemo(() => {
        let result = [...facilities];

        if (activeType !== "All") {
            result = result.filter((f) => f.type === activeType);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (f) =>
                    f.name.toLowerCase().includes(q) ||
                    f.location.toLowerCase().includes(q) ||
                    f.type.toLowerCase().includes(q)
            );
        }

        if (sortBy === "price-asc") result.sort((a, b) => a.pricePerHour - b.pricePerHour);
        if (sortBy === "price-desc") result.sort((a, b) => b.pricePerHour - a.pricePerHour);

        return result;
    }, [facilities, activeType, search, sortBy]);

    const clearFilters = () => {
        setSearch("");
        setActiveType("All");
        setSortBy("default");
    };

    const hasFilters = search || activeType !== "All" || sortBy !== "default";

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Page Header */}
            <div className="border-b border-zinc-900 bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <p className="text-[10px] text-lime-400 font-black uppercase tracking-[0.3em] mb-2">
                        — All Arenas
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white italic leading-none">
                            Browse <br className="sm:hidden" />
                            <span className="text-zinc-500">Facilities</span>
                        </h1>
                        {!loading && (
                            <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">
                                {filtered.length} of {facilities.length} venues
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {/* Search + Sort Controls */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search by name, location, type..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm font-medium placeholder-zinc-600 focus:outline-none focus:border-lime-500/50 transition-colors"
                        />
                        {search && (
                            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="relative">
                        <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="h-11 pl-10 pr-8 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-semibold focus:outline-none focus:border-lime-500/50 transition-colors appearance-none cursor-pointer"
                        >
                            <option value="default">Default Order</option>
                            <option value="price-asc">Price: Low → High</option>
                            <option value="price-desc">Price: High → Low</option>
                        </select>
                    </div>

                    {hasFilters && (
                        <button onClick={clearFilters} className="h-11 px-4 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2">
                            <X className="w-3.5 h-3.5" /> Clear
                        </button>
                    )}
                </div>

                {/* Filter  */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {ALL_TYPES.map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${activeType === type
                                ? "bg-lime-400/10 border-lime-400/40 text-lime-400"
                                : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* Error Box */}
                {error && (
                    <div className="text-center py-20 text-red-400 text-sm font-bold bg-red-500/5 border border-red-500/10 rounded-2xl">
                        ⚠️ {error} — Make sure your backend server is running on port 5000 and setup your environment variables.
                    </div>
                )}

                {/* Grid */}
                {!error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {loading
                            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                            : filtered.length > 0
                                ? filtered.map((facility) => (
                                    <FacilityCard key={facility._id} facility={facility} />
                                ))
                                : (
                                    <div className="col-span-full text-center py-20">
                                        <p className="text-zinc-600 text-4xl mb-4">🏟️</p>
                                        <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest">No facilities found</p>
                                        <button onClick={clearFilters} className="mt-4 text-xs text-lime-400 font-black uppercase tracking-widest hover:text-lime-300 transition-colors">
                                            Clear Filters
                                        </button>
                                    </div>
                                )
                        }
                    </div>
                )}
            </div>
        </div>
    );
}