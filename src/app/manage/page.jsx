"use client";
import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
    LayoutDashboard,
    PlusCircle,
    Calendar,
    Clock,
    User,
    DollarSign,
    Layers,
    MapPin,
    Image as ImageIcon,
    Users,
    Trash2
} from "lucide-react";

export default function ManageDashboard() {
    // Better Auth session
    const { data: session, isPending } = authClient.useSession();

    // State Management
    const [activeTab, setActiveTab] = useState("bookings");

    // Booking List State
    const [allBookings, setAllBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(true);
    const router = useRouter();

    // New Arena Form
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        image: "",
        location: "",
        pricePerHour: "",
        capacity: "",
        availableSlots: "",
        description: ""
    });

    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    // Dependency Array
    useEffect(() => {
        // Session Owner Email 
        if (!session?.user?.email) return;

        fetch(`${apiUrl}/owner-bookings?email=${session.user.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setAllBookings(data);
                }
                setLoadingBookings(false);
            })
            .catch((err) => {
                console.error("Error fetching bookings:", err);
                setLoadingBookings(false);
            });
    }, [apiUrl, session?.user?.email]);

    // New field Handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddArenaSubmit = async (e) => {
        e.preventDefault();

        if (!session?.user?.email) {
            setMessage({ type: "error", text: "You must be logged in as an owner to add an arena." });
            return;
        }

        setSubmitting(true);
        setMessage({ type: "", text: "" });

        const slotsArray = formData.availableSlots
            .split(",")
            .map((slot) => slot.trim())
            .filter((slot) => slot !== "");

        const arenaPayload = {
            ...formData,
            pricePerHour: parseFloat(formData.pricePerHour),
            capacity: parseInt(formData.capacity),
            availableSlots: slotsArray,
            ownerEmail: session.user.email
        };

        try {
            const res = await fetch(`${apiUrl}/facilities`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(arenaPayload)
            });

            if (res.ok) {
                setMessage({ type: "success", text: "New Sports Arena added successfully!" });

                // Form Reset
                setFormData({
                    name: "",
                    type: "",
                    image: "",
                    location: "",
                    pricePerHour: "",
                    capacity: "",
                    availableSlots: "",
                    description: ""
                });

                const timer = setTimeout(() => {
                    router.push("/facilities");
                }, 1500);

                return () => clearTimeout(timer);
            } else {
                setMessage({ type: "error", text: "Failed to add facility. Try again." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Server error occurred." });
        } finally {
            setSubmitting(false);
        }
    };
    // Owner Booking Function
    const handleCancelBooking = async (bookingId) => {
        const confirmCancel = window.confirm("Are you sure you want to cancel this user reservation?");
        if (!confirmCancel) return;

        try {
            const res = await fetch(`${apiUrl}/bookings/${bookingId}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (res.ok && data.success) {
                alert("Booking canceled successfully!");
                setAllBookings((prevBookings) =>
                    prevBookings.filter((booking) => booking._id !== bookingId)
                );
            } else {
                alert(data.message || "Failed to cancel the booking.");
            }
        } catch (error) {
            console.error("Error canceling booking:", error);
            alert("Server error occurred while canceling.");
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-lime-500"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 pb-20">

            {/* Top Welcome Header */}
            <div className="border-b border-zinc-900 bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <p className="text-[10px] text-lime-400 font-black uppercase tracking-[0.3em] mb-2">
                        — Owner Command Center
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white italic">
                        Manage <span className="text-zinc-500">Dashboard</span>
                    </h1>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
                <div className="flex border-b border-zinc-800 gap-2">
                    <button
                        onClick={() => setActiveTab("bookings")}
                        className={`flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${activeTab === "bookings"
                            ? "border-lime-500 text-lime-400 bg-lime-500/5"
                            : "border-transparent text-zinc-500 hover:text-zinc-300"
                            }`}
                    >
                        <LayoutDashboard className="w-4 h-4" /> Received Bookings
                    </button>

                    <button
                        onClick={() => setActiveTab("add-arena")}
                        className={`flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${activeTab === "add-arena"
                            ? "border-lime-500 text-lime-400 bg-lime-500/5"
                            : "border-transparent text-zinc-500 hover:text-zinc-300"
                            }`}
                    >
                        <PlusCircle className="w-4 h-4" /> Add New Arena
                    </button>
                </div>

                {/* Bookings List Section */}
                {activeTab === "bookings" && (
                    <div className="mt-8">
                        <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Users Reservations</h2>

                        {loadingBookings ? (
                            <div className="space-y-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="h-20 w-full bg-zinc-900 border border-zinc-800 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : allBookings.length === 0 ? (
                            <div className="text-center py-16 bg-zinc-900/20 border border-zinc-800 rounded-xl">
                                <p className="text-zinc-600 text-3xl mb-2">📋</p>
                                <p className="text-zinc-500 text-xs">No active bookings received yet for your venues.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {allBookings.map((booking) => (
                                    <div
                                        key={booking._id}
                                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                                    >
                                        <div>
                                            <span className="text-[10px] bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded text-lime-400 font-mono">
                                                ID: {booking._id ? booking._id.slice(-6) : "N/A"}
                                            </span>
                                            <h3 className="text-white font-black text-base mt-2">{booking.facilityName}</h3>
                                            <div className="flex flex-wrap gap-4 text-xs text-zinc-400 mt-2">
                                                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-zinc-600" /> {booking.userName || "Customer"} ({booking.userEmail})</span>
                                                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-zinc-600" /> {booking.bookingDate}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 border-t border-zinc-800 md:border-t-0 pt-3 md:pt-0 justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] uppercase tracking-wider text-zinc-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Slot</span>
                                                <span className="text-xs font-bold text-zinc-200 mt-0.5">{booking.slot}</span>
                                            </div>
                                            <div className="flex flex-col text-right">
                                                <span className="text-[9px] uppercase tracking-wider text-zinc-500 flex items-center gap-1"><DollarSign className="w-3 h-3" /> Received</span>
                                                <span className="text-sm font-black text-lime-400 mt-0.5">${booking.pricePerHour || booking.price}</span>
                                            </div>
                                            <div className="flex items-center pl-4">
                                                <button
                                                    onClick={() => handleCancelBooking(booking._id)}
                                                    className="h-9 px-3 rounded-xl border border-zinc-800 hover:border-red-500/30 hover:bg-red-500/10 text-zinc-500 hover:text-red-400 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 active:scale-95"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" /> Cancel Booking
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Add New Arena Form Section */}
                {activeTab === "add-arena" && (
                    <div className="mt-8 max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Deploy New Sports Arena</h2>
                        <p className="text-xs text-zinc-500 mb-6">Fill up the field details to list a new playground in SportNest system.</p>

                        {message.text && (
                            <div className={`p-4 rounded-xl text-xs font-bold mb-6 ${message.type === "success" ? "bg-lime-500/10 text-lime-400 border border-lime-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleAddArenaSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="flex items-center text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Arena / Stadium Name</label>
                                    <input
                                        type="text" name="name" required value={formData.name} onChange={handleInputChange}
                                        placeholder="e.g. Old Trafford Turf"
                                        className="w-full h-11 bg-zinc-950 border border-zinc-800 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-lime-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Sports Type</label>
                                    <input
                                        type="text" name="type" required value={formData.type} onChange={handleInputChange}
                                        placeholder="e.g. Football, Cricket, Badminton"
                                        className="w-full h-11 bg-zinc-950 border border-zinc-800 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-lime-500 transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                                    <ImageIcon className="w-3.5 h-3.5" /> Image Link (URL)
                                </label>
                                <input
                                    type="url" name="image" required value={formData.image} onChange={handleInputChange}
                                    placeholder="https://i.ibb.co/... / image.png"
                                    className="w-full h-11 bg-zinc-950 border border-zinc-800 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-lime-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                                    <MapPin className="w-3.5 h-3.5" /> Location Address
                                </label>
                                <input
                                    type="text" name="location" required value={formData.location} onChange={handleInputChange}
                                    placeholder="e.g. 5th Avenue, New York, NY"
                                    className="w-full h-11 bg-zinc-950 border border-zinc-800 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-lime-500 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="flex items-center gap-0.5 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                                        <DollarSign className="w-3.5 h-3.5" /> Price Per Hour ($)
                                    </label>
                                    <input
                                        type="number" name="pricePerHour" required value={formData.pricePerHour} onChange={handleInputChange}
                                        placeholder="45"
                                        className="w-full h-11 bg-zinc-950 border border-zinc-800 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-lime-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                                        <Users className="w-3.5 h-3.5" /> Team Capacity (Persons)
                                    </label>
                                    <input
                                        type="number" name="capacity" required value={formData.capacity} onChange={handleInputChange}
                                        placeholder="14"
                                        className="w-full h-11 bg-zinc-950 border border-zinc-800 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-lime-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                                    <Clock className="w-3.5 h-3.5" /> Available Slots (Separated by Comma)
                                </label>
                                <input
                                    type="text" name="availableSlots" required value={formData.availableSlots} onChange={handleInputChange}
                                    placeholder="06:00 AM - 08:00 AM, 04:00 PM - 06:00 PM, 08:00 PM - 10:00 PM"
                                    className="w-full h-11 bg-zinc-950 border border-zinc-800 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-lime-500 transition-all"
                                />
                                <span className="text-[10px] text-zinc-500 mt-1 block">Note: Use a comma ( , ) after typing each slot.</span>
                            </div>

                            <div>
                                <label className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                                    <Layers className="w-3.5 h-3.5" /> Description
                                </label>
                                <textarea
                                    name="description" rows="4" required value={formData.description} onChange={handleInputChange}
                                    placeholder="Premium artificial turf with international standard lighting..."
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-lime-500 transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full h-11 bg-lime-500 hover:bg-lime-400 disabled:bg-zinc-800 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center"
                            >
                                {submitting ? "Deploying Arena..." : "Deploy Arena / Facility"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}