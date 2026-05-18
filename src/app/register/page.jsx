"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trophy, User, Mail, Lock, Image, ArrowRight, ImageIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "", image: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Password Validation Function
    const validatePassword = (password) => {
        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }
        return null;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        // Password Policy Check
        const passwordValidationError = validatePassword(formData.password);
        if (passwordValidationError) {
            setError(passwordValidationError);
            return;
        }

        setLoading(true);

        try {
            // Better-Auth (Registration)
            await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                image: formData.image,
            }, {
                onSuccess: () => {
                    // Redirect
                    router.push("/login");
                },
                onError: (ctx) => {
                    setError(ctx.error.message || "Registration failed.");
                    setLoading(false);
                }
            });

        } catch (err) {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    // Better-Auth Google handler
    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard/my-bookings"
            });
        } catch (err) {
            setError("Google sign in failed.");
        }
    };

    return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-12 text-white">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">

                {/* Decorative Glowing BG */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 blur-3xl rounded-full pointer-events-none" />

                {/* Logo Section */}
                <div className="flex flex-col items-center mb-6 select-none">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-lime-500 text-black mb-3 shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                        <Trophy className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">Create Account</h2>
                    <p className="text-xs text-zinc-500 mt-1 font-semibold uppercase tracking-wider">Join SportNest Arena Today</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="alert alert-error bg-red-500/10 border-red-500/20 text-red-400 text-xs font-bold rounded-xl mb-4 p-3">
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleRegister} className="flex flex-col gap-4">

                    {/* Name Input */}
                    <div className="form-control">
                        <label className="label px-1 py-0.5"><span className="label-text text-xs text-zinc-400 font-bold uppercase tracking-wider">Name</span></label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="John Doe"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="input w-full bg-zinc-950 border border-zinc-800 focus:border-lime-500 rounded-xl pl-11 text-sm text-white outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="form-control">
                        <label className="label px-1 py-0.5"><span className="label-text text-xs text-zinc-400 font-bold uppercase tracking-wider">Email Address</span></label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="input w-full bg-zinc-950 border border-zinc-800 focus:border-lime-500 rounded-xl pl-11 text-sm text-white outline-none transition-all"
                            />
                        </div>
                    </div>
                    {/* Photo URL Input */}
                    <div className="form-control">
                        <label className="label px-1 py-0.5">
                            <span className="label-text text-xs text-zinc-400 font-bold uppercase tracking-wider">Photo URL</span>
                        </label>
                        <div className="relative">
                            {/*  ImageIcon  */}
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                                type="url"
                                placeholder="https://example.com/photo.jpg"
                                required
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="input w-full bg-zinc-950 border border-zinc-800 focus:border-lime-500 rounded-xl pl-11 text-sm text-white outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="form-control">
                        <label className="label px-1 py-0.5"><span className="label-text text-xs text-zinc-400 font-bold uppercase tracking-wider">Password</span></label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="input w-full bg-zinc-950 border border-zinc-800 focus:border-lime-500 rounded-xl pl-11 text-sm text-white outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn bg-lime-500 hover:bg-lime-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-black uppercase text-xs tracking-widest rounded-xl h-12 mt-2 w-full gap-2 transition-all shadow-[0_0_20px_rgba(163,230,53,0.15)]"
                    >
                        {loading ? <span className="loading loading-spinner loading-sm"></span> : (
                            <>
                                Sign Up
                                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                            </>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="divider before:bg-zinc-800 after:bg-zinc-800 text-xs text-zinc-500 font-bold uppercase tracking-wider my-4">OR</div>

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="btn btn-outline w-full h-12 border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-300 hover:text-white rounded-xl gap-3 text-xs font-bold uppercase tracking-wider transition-all"
                >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Continue with Google
                </button>

                {/* Footer Link */}
                <p className="text-center text-xs text-zinc-500 font-semibold mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-lime-400 hover:underline font-bold ml-1">
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
}