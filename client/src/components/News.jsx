import React from "react";
import { motion } from "framer-motion";

export default function News() {
  const newsItems = [
    { title: "New Safety App Features Released", excerpt: "Enhanced GPS tracking and emergency contacts now available for all users.", date: "Dec 15, 2024", category: "Technology" },
    { title: "Self-Defense Workshop Success", excerpt: "Over 200 women participated in our monthly self-defense training program.", date: "Dec 12, 2024", category: "Events" },
    { title: "Partnership with Local Police", excerpt: "New collaboration ensures faster emergency response times in urban areas.", date: "Dec 10, 2024", category: "Partnership" },
    { title: "Safety Statistics Report 2024", excerpt: "Annual report shows 40% improvement in women's safety awareness.", date: "Dec 8, 2024", category: "Research" },
  ];

  return (
    <section className="py-16 bg-pink-50">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-800 mb-10 text-center"
      >
        Latest News
      </motion.h2>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newsItems.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-lg border border-pink-200 hover:border-pink-300"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full">
                {item.category}
              </span>
              <span className="text-gray-500 text-sm">{item.date}</span>
            </div>
            <h3 className="text-gray-800 font-semibold text-lg mb-3">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{item.excerpt}</p>
            <motion.button
              whileHover={{ x: 5 }}
              className="text-purple-600 hover:text-pink-600 font-medium text-sm transition-colors"
            >
              Read More →
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
