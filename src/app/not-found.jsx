import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { IoFootball } from 'react-icons/io5';

const NotFound = () => {
    return (
        <div className="min-h-screen w-full bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden select-none px-4">
            <div className="absolute w-87.5 h-87.5 bg-red-500/5 rounded-full blur-[130px] pointer-events-none top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-62.5 h-62.5 bg-lime-500/5 rounded-full blur-[100px] pointer-events-none bottom-1/4 left-1/3"></div>
            <div className="flex flex-col items-center text-center max-w-md relative z-10 space-y-6">
                <div className="relative flex items-center justify-center">
                    <h1 className="text-[120px] sm:text-[150px] font-black tracking-tighter text-zinc-900 leading-none italic select-none">
                        404
                    </h1>
                    <div className="absolute animate-bounce duration-1000 bottom-6">
                        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-full shadow-[0_0_30px_rgba(163,230,53,0.1)] text-lime-400">
                            <IoFootball className="w-8 h-8 stroke-[1.5] animate-[spin_8s_linear_infinite]" />
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] text-red-400 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> Out of Bounds
                    </p>
                    <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white italic">
                        PAGE NOT <span className="text-zinc-500">FOUND</span>
                    </h2>
                    <p className="text-xs text-zinc-400 font-medium max-w-xs mx-auto leading-relaxed">
                        {"The arena you are looking for doesn't exist or has been relocated to another league."}
                    </p>
                </div>
                <div className="pt-4 w-full sm:w-auto">
                    <Link
                        href="/"
                        className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2 bg-linear-to-r from-lime-400 to-lime-500 hover:from-lime-300 hover:to-lime-400 text-black font-black text-xs uppercase tracking-widest italic rounded-xl h-12 px-8 transition-all duration-200 active:scale-95 shadow-[0_0_30px_rgba(163,230,53,0.25)] group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Explore Arenas</span>
                    </Link>
                </div>
            </div>
            <div className="absolute bottom-8 text-[9px] font-mono tracking-widest text-zinc-700 uppercase">
                SportNest Referees • All Rights Reserved
            </div>
        </div>
    );
};

export default NotFound;