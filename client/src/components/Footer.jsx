import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-900 to-red-600 text-white py-12 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8"
      >
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-pink-500 font-bold">🛡</span>
            </div>
            <span className="font-bold text-lg">SafeGuard</span>
          </div>
          <p className="text-pink-100 text-sm">
            Empowering women with safety tools and knowledge for a secure future.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["About Us", "Safety Tips", "Emergency Contacts", "Resources"].map((item, i) => (
              <li key={i}>
                <a href="#" className="text-pink-100 hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"].map((item, i) => (
              <li key={i}>
                <a href="#" className="text-pink-100 hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Emergency</h4>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition-all"
          >
            🆘 Emergency SOS
          </motion.button>
          <p className="text-pink-100 text-xs mt-3">24/7 emergency support available</p>
        </div>
      </motion.div>

      <div className="border-t border-pink-300 border-opacity-30 mt-8 pt-8 text-center">
        <p className="text-pink-100 text-sm">
          © 2024 SafeGuard. All rights reserved. Made with ❤ for women's safety.
        </p>
      </div>
    </footer>
  );
}
