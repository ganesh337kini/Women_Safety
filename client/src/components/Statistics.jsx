import React from "react";
import { motion } from "framer-motion";

export default function Statistics() {
  const stats = [
    { number: "10,000+", label: "Women Protected", icon: "👥" },
    { number: "24/7", label: "Emergency Support", icon: "🚨" },
    { number: "500+", label: "Safety Tips", icon: "💡" },
    { number: "99%", label: "Response Rate", icon: "⚡" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 2 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-300 to-pink-300 rounded-xl p-6 text-center shadow-md hover:shadow-2xl border border-purple-100"
          >
            <div className="text-5xl mb-3">{stat.icon}</div>
            <div className="text-3xl font-bold text-gray-800">{stat.number}</div>
            <div className="text-gray-700">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
