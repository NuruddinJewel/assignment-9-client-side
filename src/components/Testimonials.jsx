import React from 'react';
import Image from 'next/image';
import { Star, Quote, Award } from 'lucide-react';

// ── Testimonials Data  ──────────────────────────────────
const TESTIMONIALS_DATA = [
    {
        id: 1,
        name: "David Miller",
        role: "Captain, Avengers FC",
        arena: "Elite Football Turf",
        comment: "SportNest completely changed how we book pitches. No more endless phone calls. The turf quality was top-notch and the slots were perfectly managed!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Clara Zhang",
        role: "Badminton Enthusiast",
        arena: "Smash Zone Indoor Court",
        comment: "Booking the premium indoor court was seamless. The lighting, mats, and air ventilation were flawless. Will definitely use SportNest every weekend.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Kai Lawrence",
        role: "Basketball Coach",
        arena: "Apex Basketball Court",
        comment: "Finding a premium court with uncrowded slots used to be tough. Thanks to SportNest, I can book my team's preferred training timing instantly!",
        rating: 4,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Lee Min-ho",
        role: "Tennis Player",
        arena: "Grand Slam Clay Court",
        comment: "Outstanding user experience. The live slot availability system saves so much time. Highly recommend this to all sports coordinators.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Michael Vance",
        role: "Fitness Trainer",
        arena: "Iron Gym & Fitness",
        comment: "We manage heavy workout sessions and need precise slot distributions. This web app makes scheduling an absolute breeze for our camp.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Sara Jenkins",
        role: "Volleyball Spiker",
        arena: "Thunder Spike Indoor Arena",
        comment: "The booking calendar is incredibly intuitive. We managed to secure a prime-time slot for our weekend tournament without any hassle. Exceptional service!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
    }

];

export default function Testimonials() {
    return (
        <section className="bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 overflow-hidden relative">

            {/* Background Decorative Blur Effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-125 h-125 bg-lime-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="mx-auto max-w-7xl relative z-10">

                {/* ── Section Header ── */}
                <div className="text-center mb-16">
                    <p className="text-[10px] text-lime-400 font-black uppercase tracking-[0.3em] mb-2">
                        — Players Voice
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white italic leading-tight">
                        What Our <span className="text-zinc-500">Athletes Say</span>
                    </h2>
                    <p className="text-zinc-500 text-xs font-semibold max-w-md mx-auto mt-2 uppercase tracking-wider">
                        Real experiences from teams and players who dominate our arenas.
                    </p>
                </div>

                {/* ── Testimonials Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TESTIMONIALS_DATA.map((item) => (
                        <div
                            key={item.id}
                            className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-700 hover:shadow-[0_0_40px_rgba(163,230,53,0.03)] transition-all duration-300"
                        >
                            {/* Decorative Quote Icon on Top Right */}
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-zinc-800/60 group-hover:text-lime-500/10 transition-colors" />

                            <div>
                                {/* Rating Stars */}
                                <div className="flex items-center gap-1 mb-5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3.5 h-3.5 ${i < item.rating
                                                ? "fill-lime-400 text-lime-400"
                                                : "text-zinc-700"
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Comment */}
                                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed italic mb-6">
                                    {`"${item.comment}"`}
                                </p>
                            </div>

                            {/* User Profile Info footer */}
                            <div className="flex items-center gap-3.5 border-t border-zinc-800/60 pt-4 mt-2">
                                {/* Next.js Image Component wrapper with absolute configuration */}
                                <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="44px"
                                        className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-white font-black text-xs uppercase tracking-wider truncate">
                                        {item.name}
                                    </h4>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide truncate mt-0.5">
                                        {item.role}
                                    </p>

                                    {/* Booked Venue Tag */}
                                    <span className="inline-flex items-center gap-1 text-[9px] font-black text-lime-400 bg-lime-400/5 border border-lime-400/10 px-2 py-0.5 rounded-md mt-1.5 uppercase tracking-widest">
                                        <Award className="w-2.5 h-2.5" /> {item.arena}
                                    </span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* ── Stats Footer ── */}
                <div className="mt-16 pt-8 border-t border-zinc-900/60 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                    <div>
                        <p className="text-2xl font-black text-white italic leading-none">98%</p>
                        <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mt-1">Satisfaction Rate</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-lime-400 italic leading-none">10k+</p>
                        <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mt-1">Slots Booked</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-white italic leading-none">50+</p>
                        <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mt-1">Verified Arenas</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-zinc-400 italic leading-none">4.9</p>
                        <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mt-1">Average Rating</p>
                    </div>
                </div>

            </div>
        </section>
    );
}