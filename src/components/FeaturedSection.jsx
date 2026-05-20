"use client";
import { useEffect, useState } from "react";
import FacilityCard from "./FacilityCard";

export default function FeaturedSection() {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/facilities`, { cache: 'no-store' })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setFacilities(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center py-20 bg-[#080808]">
                <span className="loading loading-spinner loading-lg text-lime-500"></span>
            </div>
        );
    }

    return (
        <section className="py-24 bg-[#080808] relative overflow-hidden">

            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-125 h-125 bg-lime-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">


                <div className="text-center mb-16 select-none">
                    <p className="text-lime-400 text-xs font-black uppercase tracking-[0.25em]">Our Best Spots</p>
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase mt-3 tracking-tight">
                        Featured Facilities
                    </h2>
                    <div className="w-20 h-1 bg-lime-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(163,230,53,0.5)]" />
                </div>

                {facilities.length === 0 ? (
                    <div className="text-center text-zinc-500 text-sm py-16 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl">
                        No facilities found.
                    </div>
                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {facilities.slice(0, 4).map((facility) => (
                            <FacilityCard key={facility._id} facility={facility} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}