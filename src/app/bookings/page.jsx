"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, BadgeDollarSign, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookingsPage() {
    // Better Auth Session
    const { data: session, isPending } = authClient.useSession();

    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(true);

    // User Booking Data
    useEffect(() => {
        if (session?.user?.email) {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

            fetch(`${apiUrl}/bookings?email=${session.user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setBookings(data);
                    setLoadingBookings(false);
                })
                .catch((err) => {
                    console.error("Error fetching bookings:", err);
                    toast.error("Failed to load your reservations!");
                    setLoadingBookings(false);
                });
        }
    }, [session?.user?.email]);

    // Booking Handle Function
    const handleCancelBooking = async (id) => {
        if (confirm("Are you sure you want to cancel this booking slot?")) {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            try {
                const res = await fetch(`${apiUrl}/bookings/${id}`, {
                    method: "DELETE"
                });

                if (res.ok) {
                    setBookings(bookings.filter(b => b._id !== id));
                    toast.success("Reservation canceled successfully!");
                } else {
                    toast.error("Could not cancel booking. Try again.");
                }
            } catch (err) {
                console.error("Error canceling booking:", err);
                toast.error("Server error occurred while canceling.");
            }
        }
    };

    // Session Load
    if (isPending) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-lime-500"></span>
            </div>
        );
    }

    //  Protected User 
    if (!session?.user) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center shadow-2xl">
                    <div className="w-16 h-16 bg-lime-500/10 border border-lime-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-lime-400 text-2xl">
                        🔒
                    </div>
                    <h2 className="text-xl font-black text-white uppercase tracking-wider mb-2">Login Required</h2>
                    <p className="text-zinc-500 text-xs leading-relaxed mb-6">
                        Please sign in to view your reserved sports facilities and active slots.
                    </p>
                    <Link
                        href="/login"
                        className="w-full inline-flex h-11 items-center justify-center rounded-xl bg-lime-500 hover:bg-lime-400 text-black font-black text-xs uppercase tracking-widest transition-all"
                    >
                        Login to Account
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 pb-20">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="dark"
            />

            {/* Page Header */}
            <div className="border-b border-zinc-900 bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <p className="text-[10px] text-lime-400 font-black uppercase tracking-[0.3em] mb-2">
                            — Dashboard
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white italic">
                            My <span className="text-zinc-500">Bookings</span>
                        </h1>
                    </div>

                    {/* User Info Tag */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 self-start sm:self-center">
                        <ShieldCheck className="w-4 h-4 text-lime-400" />
                        <span className="text-xs font-bold text-zinc-400">{session.user.email}</span>
                    </div>
                </div>
            </div>

            {/* Main Content Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

                {/* Bookings Loader / List */}
                {loadingBookings ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-24 w-full bg-zinc-900 border border-zinc-800 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : bookings.length === 0 ? (

                    // Book A Facility
                    <div className="text-center py-20 bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-6">
                        <p className="text-zinc-600 text-4xl mb-3">🎫</p>
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">No Bookings Found</h3>
                        <p className="text-zinc-500 text-xs max-w-xs mx-auto mb-6">{"You haven't reserved any stadiums or slots yet."}</p>
                        <Link href="/facilities" className="inline-flex h-9 px-4 items-center gap-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-black font-black text-xs uppercase tracking-widest transition-all">
                            Book A Facility <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                ) : (

                    /* Booking Cards Lists */
                    <div className="grid grid-cols-1 gap-4">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-zinc-700 transition-all duration-300"
                            >
                                {/* Left: Info Block */}
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-800 shrink-0">
                                        <Image
                                            src={booking.facilityImage || booking.image || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
                                            alt="arena"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-black text-sm uppercase tracking-wide group-hover:text-lime-400 transition-colors">
                                            {booking.facilityName || booking.title || booking.name}
                                        </h3>
                                        <p className="text-zinc-500 text-xs font-semibold flex items-center gap-1 mt-1">
                                            <Calendar className="w-3 h-3 text-zinc-600" /> {booking.bookingDate || booking.date}
                                        </p>
                                    </div>
                                </div>

                                {/* Middle: Slot & Price details */}
                                <div className="grid grid-cols-2 sm:flex items-center gap-6 md:gap-10 border-t border-zinc-800/60 md:border-t-0 pt-4 md:pt-0">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> Selected Slot
                                        </span>
                                        <span className="text-xs font-bold text-zinc-300 bg-zinc-950 px-2.5 py-1 rounded-md border border-zinc-800 mt-1">
                                            {booking.slot}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest flex items-center gap-1">
                                            <BadgeDollarSign className="w-3 h-3" /> Price Paid
                                        </span>
                                        <span className="text-sm font-black text-lime-400 px-1 mt-1">
                                            ${booking.pricePerHour || booking.price}
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Cancel Action */}
                                <div className="flex justify-end border-t border-zinc-800/60 md:border-t-0 pt-3 md:pt-0">
                                    <button
                                        onClick={() => handleCancelBooking(booking._id)}
                                        className="h-9 px-3 rounded-xl border border-zinc-800 hover:border-red-500/30 hover:bg-red-500/10 text-zinc-500 hover:text-red-400 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 active:scale-95"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Cancel Slot
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>

                )}
            </div>
        </div>
    );
}