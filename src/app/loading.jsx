import React from 'react';
import { Loader2, Trophy } from 'lucide-react';

const Loading = () => {
    return (
        <div className="min-h-screen w-full bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden select-none">
            <div className="absolute w-75 h-75 bg-lime-500/10 rounded-full blur-[120px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="flex flex-col items-center gap-6 relative z-10">
                <div className="relative flex items-center justify-center">
                    <Loader2 className="w-16 h-16 text-lime-400 animate-spin stroke-[1.5]" />
                    <div className="absolute bg-zinc-900 border border-zinc-800 p-2.5 rounded-full shadow-[0_0_20px_rgba(163,230,53,0.15)] animate-pulse">
                        <Trophy className="w-5 h-5 text-lime-400" />
                    </div>
                </div>
                <div className="text-center space-y-1.5">
                    <h2 className="text-sm font-black uppercase tracking-[0.25em] text-white italic">
                        Sport<span className="text-lime-400">Nest</span>
                    </h2>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center justify-center gap-1">
                        Preparing your arena
                        <span className="loading loading-dots loading-xs text-zinc-600 inline-block align-middle mt-0.5"></span>
                    </p>
                </div>
            </div>
            <div className="absolute bottom-8 text-[9px] font-medium tracking-widest text-zinc-700 uppercase">
                ⚡ Maximum Performance Mode
            </div>
        </div>
    );
};

export default Loading;