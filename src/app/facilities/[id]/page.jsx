"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin, Users, Clock, BadgeDollarSign,
    ArrowLeft, Calendar, CheckCircle2, ChevronRight
} from "lucide-react";

export default function FacilityDetailsPage() {
    const { id } = useParams();
    const router = useRouter();

    const [facility, setFacility] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);

    // Form States
    const [selectedSlot, setSelectedSlot] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        fetch(`${apiUrl}/facilities/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Facility not found");
                return res.json();
            })
            .then((data) => {
                setFacility(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    // Handle Booking Submission
    const handleBooking = async (e) => {
        e.preventDefault();
        if (!selectedSlot || !bookingDate || !userName || !userEmail) {
            alert("Please fill out all fields!");
            return;
        }

        setBookingLoading(true);
        const bookingInfo = {
            facilityId: id,
            facilityName: facility.name,
            facilityImage: facility.image,
            pricePerHour: facility.pricePerHour,
            userName,
            userEmail,
            bookingDate,
            slot: selectedSlot,
            bookedAt: new Date()
        };

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const res = await fetch(`${apiUrl}/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingInfo),
            });

            if (res.ok) {
                setSuccessMessage("Your slot has been booked successfully! 🏟️");
                // Form Reset
                setSelectedSlot("");
                setBookingDate("");
                // Redirect after 3 seconds
                setTimeout(() => router.push('/'), 3000);
            } else {
                alert("Something went wrong. Try again.");
            }
        } catch (error) {
            console.error("Booking error:", error);
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-lime-500"></span>
            </div>
        );
    }

    if (!facility) {
        return (
            <div className="min-h-screen bg-zinc-950 text-center py-20 text-zinc-500">
                Stadium or Arena not found!
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 pb-20">
            {/* Top Banner / Breadcrumb */}
            <div className="border-b border-zinc-900 bg-zinc-900/20 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
                    <Link href="/facilities" className="flex items-center gap-1.5 text-zinc-500 hover:text-lime-400 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to All
                    </Link>
                    <ChevronRight className="w-3 h-3 text-zinc-700" />
                    <span className="text-lime-400 max-w-50 sm:max-w-none truncate">{facility.name}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* ── LEFT COLUMN: FACILITY DETAILS (7 Columns) ── */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {/* Big Image */}
                        <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
                            <Image
                                src={facility.image || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
                                alt={facility.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/20 text-lime-400 text-xs font-black uppercase tracking-widest backdrop-blur-md">
                                {facility.type}
                            </span>
                        </div>

                        {/* Details Card */}
                        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
                            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4 italic">
                                {facility.name}
                            </h1>

                            <div className="flex items-start gap-2 text-zinc-400 text-sm font-semibold mb-6">
                                <MapPin className="w-4 h-4 text-lime-500 shrink-0 mt-0.5" />
                                <span>{facility.location}</span>
                            </div>

                            {/* Info Badges */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-zinc-800 py-5 my-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                                        <Users className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Capacity</p>
                                        <p className="text-sm font-black text-white">{facility.capacity} Players</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Available</p>
                                        <p className="text-sm font-black text-white">{facility.availableSlots?.length || 0} Slots</p>
                                    </div>
                                </div>
                                <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center text-lime-500/20 border border-lime-500/10">
                                        <BadgeDollarSign className="w-4 h-4 text-lime-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Rate</p>
                                        <p className="text-sm font-black text-lime-400">${facility.pricePerHour}<span className="text-[10px] font-normal text-zinc-500">/hr</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h4 className="text-xs font-black text-white uppercase tracking-widest">About This Venue</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">{facility.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN: BOOKING DETAILS FORM (5 Columns) ── */}
                    <div className="lg:col-span-5">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl sticky top-6">
                            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-1">
                                Secure Your Slot
                            </h3>
                            <p className="text-xs text-zinc-500 font-medium mb-6">Fill in the details to complete your arena booking.</p>

                            {successMessage ? (
                                <div className="bg-lime-500/10 border border-lime-500/20 rounded-xl p-6 text-center flex flex-col items-center gap-3 py-10">
                                    <CheckCircle2 className="w-12 h-12 text-lime-400 animate-bounce" />
                                    <h4 className="text-white font-black uppercase text-sm tracking-wider">Booking Confirmed!</h4>
                                    <p className="text-zinc-400 text-xs leading-relaxed max-w-xs">{successMessage}</p>
                                    <Link href="/facilities" className="mt-4 text-xs font-black text-lime-400 uppercase tracking-widest hover:underline">
                                        Book Another Arena
                                    </Link>
                                </div>
                            ) : (
                                <form onSubmit={handleBooking} className="flex flex-col gap-4">

                                    {/* Name input */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Your Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            className="w-full h-11 px-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-lime-500/40 transition-colors"
                                        />
                                    </div>

                                    {/* Email input */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="john@example.com"
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                            className="w-full h-11 px-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-lime-500/40 transition-colors"
                                        />
                                    </div>

                                    {/* Date input */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] text-zinc-400 font-black uppercase tracking-widest flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> Select Date
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={bookingDate}
                                            min={new Date().toISOString().split('T')[0]} // পেছনের ডেট লক করার জন্য
                                            onChange={(e) => setBookingDate(e.target.value)}
                                            className="w-full h-11 px-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-lime-500/40 transition-colors cursor-pointer scheme-dark"
                                        />
                                    </div>

                                    {/* Slots dropdown */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Available Time Slots</label>
                                        <select
                                            required
                                            value={selectedSlot}
                                            onChange={(e) => setSelectedSlot(e.target.value)}
                                            className="w-full h-11 px-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm focus:outline-none focus:border-lime-500/40 transition-colors cursor-pointer appearance-none"
                                        >
                                            <option value="" disabled>Choose a time slot...</option>
                                            {facility.availableSlots?.map((slot, index) => (
                                                <option key={index} value={slot}>
                                                    {slot}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Pricing Summary */}
                                    <div className="mt-2 p-3 bg-zinc-950 border border-zinc-800/60 rounded-xl flex justify-between items-center text-xs">
                                        <span className="text-zinc-500 font-semibold uppercase tracking-wider">Total Est. Price</span>
                                        <span className="text-base font-black text-lime-400">${facility.pricePerHour}</span>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={bookingLoading}
                                        className="mt-2 w-full h-11 rounded-xl bg-lime-500 hover:bg-lime-400 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:transform-none text-black font-black text-xs uppercase tracking-widest shadow-[0_4px_20px_rgba(163,230,53,0.15)] transition-all active:scale-[0.98]"
                                    >
                                        {bookingLoading ? "Processing Booking..." : "Confirm Booking"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}