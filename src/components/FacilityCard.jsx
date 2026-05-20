"use client";
import { Dumbbell, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FacilityCard({ facility }) {
    return (
        <div className="card bg-zinc-900 border border-zinc-800 shadow-xl hover:border-lime-500/50 transition-all duration-300 overflow-hidden group">
            <figure className="relative h-48 w-full overflow-hidden">
                <Image
                    src={facility.image || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
                    alt={facility.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </figure>

            <div className="card-body p-5">
                <h2 className="card-title text-white font-bold text-lg flex items-center gap-2 line-clamp-1">
                    <Dumbbell className="w-5 h-5 text-lime-400 shrink-0" />
                    {facility.name}
                </h2>
                <p className="text-zinc-400 text-sm line-clamp-2 min-h-10">{facility.description}</p>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-800/60">
                    <span className="text-xl font-black text-lime-400">
                        ${facility.pricePerHour}
                        <span className="text-xs font-normal text-zinc-500">/hr</span>
                    </span>
                    <div className="card-actions">
                        <Link href={`/facilities/${facility._id}`} className="btn bg-lime-500 hover:bg-lime-400 text-black font-bold uppercase text-xs tracking-wider rounded-xl gap-2 transition-colors">
                            Book Now
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}