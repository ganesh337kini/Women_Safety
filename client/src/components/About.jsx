import React from "react";
import { motion } from "framer-motion";

export default function About() {
  const items = [
    {
      icon: "🎯",
      title: "Our Mission",
      desc: "To create a world where every woman feels safe and empowered.",
    },
    {
      icon: "👁",
      title: "Our Vision",
      desc: "Building safer communities through technology and education.",
    },
    {
      icon: "💝",
      title: "Our Values",
      desc: "Compassion, empowerment, and unwavering support.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-800 mb-6"
        >
          About SafeGuard
        </motion.h2>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          SafeGuard empowers women with tools, knowledge, and support to stay safe...
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white border-2 border-purple-200 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto text-white">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
