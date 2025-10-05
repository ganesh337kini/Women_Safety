import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-br from-purple-900 to-red-600 text-white py-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
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

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => navigate("/about")}
                className="text-pink-100 hover:text-white transition-colors"
              >
                About Us
              </button>
            </li>
            <li>
              <a href="#safety" className="text-pink-100 hover:text-white transition-colors">
                Safety Tips
              </a>
            </li>
            <li>
              <a href="#emergency" className="text-pink-100 hover:text-white transition-colors">
                Emergency Contacts
              </a>
            </li>
            <li>
              <a href="#resources" className="text-pink-100 hover:text-white transition-colors">
                Resources
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#help" className="text-pink-100 hover:text-white transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#contact" className="text-pink-100 hover:text-white transition-colors">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Emergency / SOS */}
        <div>
          <h4 className="font-semibold mb-4">Emergency</h4>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => (window.location.href = "/speedlist")}
            className="w-full bg-white text-red-500 py-3 px-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            🆘 Emergency SOS
          </motion.button>
          <p className="text-pink-100 text-xs mt-3">
            24/7 emergency support available
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-pink-300 border-opacity-30 mt-8 pt-8 text-center">
        <p className="text-pink-100 text-sm">
          © 2024 SafeGuard. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
