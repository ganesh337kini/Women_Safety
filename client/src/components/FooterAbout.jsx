import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer"; // make sure Footer has default export

// ForwardRef About Section
const FooterAbout = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} id="about" className="py-20 bg-pink-50 text-center">
      <h2 className="text-3xl font-bold mb-4">About Us</h2>
      <p className="max-w-3xl mx-auto text-gray-700">
        SafeSpace empowers women through knowledge, safety tools, and a supportive community.
      </p>
    </section>
  );
});

export default function App() {
  const [activeSection, setActiveSection] = useState("");
  const aboutRef = useRef();

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cardData = [
    {
      id: "vision",
      title: "Our Vision",
      text: "We believe in empowering women through knowledge, awareness, and solidarity. Education and safety are at the heart of everything we do.",
    },
    {
      id: "core-values",
      title: "Our Core Values",
      text: "We are guided by empowerment, education, and equality for every woman. Awareness and safety are the foundations of our mission.",
    },
    {
      id: "network",
      title: "Our Network",
      text: "A nationwide and rapidly expanding global network dedicated to women’s empowerment. We connect women to vital communities that inspire strength and solidarity.",
    },
  ];

  return (
    <div className="font-sans">
      {/* Navbar */}
      

      {/* Hero Section */}
      <div className="relative w-full h-screen">
        <motion.img
          src="https://images.unsplash.com/photo-1535469420027-517674dad7a1?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          className="w-full h-full object-cover brightness-75"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 max-w-3xl mx-auto">
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4">
            Together, We Protect and Empower
          </motion.h1>
          <motion.p className="text-lg md:text-xl">
            Creating a safer world for every woman, through strength and solidarity.
          </motion.p>
        </motion.div>
      </div>

      {/* Cards Section */}
      <motion.div className="max-w-7xl mx-auto px-6 py-16 flex flex-wrap justify-center gap-6">
        {cardData.map((card) => (
          <motion.div
            key={card.id}
            className={`relative w-80 h-72 rounded-xl p-6 cursor-pointer transition-all text-gray-800 ${
              activeSection === card.id ? "bg-pink-500 text-white" : "bg-white bg-opacity-70"
            }`}
            whileHover={{ scale: 1.07, rotate: 1 }}
            onClick={() => toggleSection(card.id)}
          >
            <div className="text-center mb-2 font-semibold text-lg">{card.title}</div>
            <div className="text-center mt-2">
              <AnimatePresence>
                {activeSection === card.id ? (
                  <motion.p
                    className="text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {card.text}
                  </motion.p>
                ) : (
                  <p className="text-gray-700 text-sm">Click to view more details</p>
                )}
              </AnimatePresence>
            </div>
            <motion.div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full font-semibold bg-pink-400 text-white">
              {activeSection === card.id ? "Hide Details" : "Show Details"}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* About Section */}
      <FooterAbout ref={aboutRef} />

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-pink-50 text-center">
        <div className="max-w-3xl mx-auto space-y-4 text-left">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          {[{ question: "What is SafeSpace?", answer: "SafeSpace is a platform dedicated to empowering women by providing knowledge, resources, and a supportive community." }].map((faq, i) => (
            <details key={i} className="p-4 border rounded-lg">
              <summary className="cursor-pointer font-semibold">{faq.question}</summary>
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-16 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Support</h2>
          <p className="mb-6 text-lg">Need help or have questions? Our team is here to support you.</p>
          <a
            href="mailto:mahendrapk2005@gmail.com"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold inline-block"
          >
            Contact Support
          </a>
        </div>
      </section>

     
    </div>
  );
}
