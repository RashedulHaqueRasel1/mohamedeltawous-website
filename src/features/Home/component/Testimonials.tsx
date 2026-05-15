"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    brand: "hulu",
    rating: "4.9",
    name: "Kate Davis",
    username: "friable_captain_8",
    review:
      "The progress tracker is fantastic. It's motivating to see how much I've improved over time. The app has a great mix of",
  },
  {
    id: 2,
    brand: "HBOMax",
    rating: "3.2",
    name: "Martin Kazlauskas",
    username: "sartorial_statue_59",
    review:
      "The progress tracker is fantastic. It's motivating to see how much I've improved over time. The app has a great mix of",
  },
  {
    id: 3,
    brand: "Disney+",
    rating: "4.9",
    name: "Sanjay Sharma",
    username: "voracious_rainbows_68",
    review:
      "The progress tracker is fantastic. It's motivating to see how much I've improved over time. The app has a great mix of",
  },
  {
    id: 4,
    brand: "STARZ",
    rating: "3.2",
    name: "Tawanna Afumba",
    username: "intransigent_toejam_15",
    review:
      "The progress tracker is fantastic. It's motivating to see how much I've improved over time. The app has a great mix of",
  },
  {
    id: 5,
    brand: "Vix",
    rating: "4.9",
    name: "Larry King",
    username: "pendulous_unicorn_46",
    review:
      "The progress tracker is fantastic. It's motivating to see how much I've improved over time. The app has a great mix of",
  },
  {
    id: 6,
    brand: "prime video",
    rating: "3.2",
    name: "Fatima Mohamed",
    username: "salubrious_artist_72",
    review:
      "The progress tracker is fantastic. It's motivating to see how much I've improved over time. The app has a great mix of",
  },
];

export default function TestimonialGrid() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary flex items-center justify-center gap-3">
            Our Trusted Clients
          </h2>
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Our mission is to drive progress and enhance the lives of our
            customers by delivering superior products and services that exceed
            expectations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{
                rotate: 1,
                scale: 1.02,
                y: -10,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative bg-white p-8 rounded-[16px] shadow-sm border border-gray-100 cursor-pointer"
            >
              {/* Card Top */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold tracking-tight text-[#00D3A9] uppercase italic">
                  {item.brand}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1E293B]">
                    {item.rating}
                  </span>
                  <Star className="w-5 h-5 fill-[#0f172a] text-[#0f172a]" />
                </div>
              </div>

              {/* Review Text */}
              <p className="text-[#475569] text-[15px] leading-relaxed mb-8">
                &quot;{item.review}&quot;
              </p>

              {/* User Info */}
              <div className="mt-auto">
                <h4 className="text-xl font-bold text-[#1E293B]">
                  {item.name}
                </h4>
                <p className="text-sm text-[#475569] font-medium">
                  {item.username}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
