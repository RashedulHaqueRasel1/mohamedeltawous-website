"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";

export default function AnimatedAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      {/* Main Container */}
      <div className="relative w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden min-h-[700px] flex border border-slate-100">
        {/* Sliding Overlay Section */}
        <motion.div
          animate={{ x: isLogin ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute top-0 left-0 w-1/2 h-full bg-[#DEF0FA] z-20 hidden lg:flex flex-col items-center justify-center text-white p-12 text-center"
        >
          <motion.div
            key={isLogin ? "signup-txt" : "login-txt"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-[#0F172A]">
              {isLogin ? "Hello, Friend!" : "Welcome Back!"}
            </h2>
            <p className="text-[#475569] mb-8 leading-relaxed">
              {isLogin
                ? "Enter your personal details and start your journey with us."
                : "To keep connected with us please login with your personal info."}
            </p>
            <button
              onClick={toggleForm}
              className="px-10 py-3 border-2 border-[#0F172A] text-[#0F172A] cursor-pointer rounded-[8px] font-bold hover:bg-[#0F172A] hover:text-white transition-all duration-300"
            >
              {isLogin ? "SIGN UP" : "LOG IN"}
            </button>
          </motion.div>
        </motion.div>

        {/* --- Login Form Section --- */}
        <div
          className={`w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center transition-opacity duration-500 ${!isLogin && "lg:opacity-0"}`}
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Login to Account
          </h2>
          <p className="text-slate-500 mb-8">Use your email for login</p>

          <form className="space-y-4">
            <AuthInput
              icon={<Mail size={18} />}
              type="email"
              placeholder="Email"
            />
            <AuthInput
              icon={<Lock size={18} />}
              type="password"
              placeholder="Password"
            />
            <button className="text-sm text-slate-500 hover:text-pink-500 transition-colors">
              Forgot password?
            </button>
            <button className="w-full bg-[#0F172A] text-white py-4 rounded-[8px] font-bold hover:shadow-xl transition-all">
              LOG IN
            </button>
          </form>

          <button
            onClick={toggleForm}
            className="lg:hidden mt-6 text-pink-600 font-bold"
          >
            New here? Sign Up
          </button>
        </div>

        {/* --- Sign Up Form Section --- */}
        <div
          className={`w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center transition-opacity duration-500 ${isLogin && "lg:opacity-0"}`}
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Create Account
          </h2>
          <p className="text-slate-500 mb-8">Join our community today</p>

          <form className="space-y-4">
            <AuthInput
              icon={<User size={18} />}
              type="text"
              placeholder="Full Name"
            />
            <AuthInput
              icon={<Mail size={18} />}
              type="email"
              placeholder="Email"
            />
            <AuthInput
              icon={<Lock size={18} />}
              type="password"
              placeholder="Password"
            />
            <AuthInput
              icon={<Lock size={18} />}
              type="password"
              placeholder="Confirm Password"
            />
            <button className="w-full bg-[#0F172A] text-white py-4 rounded-[8px] font-bold hover:shadow-lg transition-all">
              SIGN UP
            </button>
          </form>

          <button
            onClick={toggleForm}
            className="lg:hidden mt-6 text-pink-600 font-bold"
          >
            Have an account? Log In
          </button>
        </div>
      </div>
    </section>
  );
}

// Reusable Components
function AuthInput({
  ...props
}: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative group">
      <input
        {...props}
        className="w-full px-5 py-4 rounded-[16px] border border-black/10 bg-white  focus:ring-1 focus:ring-black outline-none transition-all"
      />
    </div>
  );
}
