import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Your Safety, Our Priority",
      subtitle: "Empowering women with tools and knowledge for personal safety",
      image: "🛡",
    },
    {
      title: "24/7 Emergency Support",
      subtitle: "Instant help when you need it most",
      image: "📞",
    },
    {
      title: "Safety Education",
      subtitle: "Learn self-defense and safety techniques",
      image: "🥋",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="light-gradient py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl p-12"
          >
            <div className="text-8xl mb-6">{slides[currentSlide].image}</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {slides[currentSlide].title}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {slides[currentSlide].subtitle}
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Learn More
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-purple-600 scale-110"
                  : "bg-purple-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}