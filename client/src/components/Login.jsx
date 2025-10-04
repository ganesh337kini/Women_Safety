import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginRegisterMotion = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
    setMessage("");
  };

  // Handlers
  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleRegisterChange = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", loginData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("✅ Login successful!");
      navigate("/"); // redirect to home
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/register", registerData);
      setMessage("✅ Registration successful! Please login.");
      setIsLoginActive(true);
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
    }
  };

  // Animation variants
  const formVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    animate: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white/20 backdrop-blur-md p-4">
      <div className="relative w-full max-w-4xl h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Forms */}
        <AnimatePresence custom={isLoginActive ? 1 : -1} mode="wait">
          {isLoginActive ? (
            <motion.form
              key="login"
              custom={1}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={formVariants}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              className="absolute top-0 left-0 w-1/2 h-full p-10 flex flex-col justify-center space-y-5"
              onSubmit={handleLoginSubmit}
            >
              <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

              <div className="relative">
                <input
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
                />
                <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>

              <div className="relative">
                <input
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Password"
                  required
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
                />
                <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white font-semibold rounded-lg hover:scale-[1.02] transition">
                Login
              </button>

              {message && <p className="text-center text-sm text-gray-600 font-medium">{message}</p>}
            </motion.form>
          ) : (
            <motion.form
              key="register"
              custom={-1}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={formVariants}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              className="absolute top-0 left-0 w-1/2 h-full p-10 flex flex-col justify-center space-y-5"
              onSubmit={handleRegisterSubmit}
            >
              <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

              <div className="relative">
                <input
                  name="username"
                  type="text"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  placeholder="Username"
                  required
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
                />
                <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>

              <div className="relative">
                <input
                  name="email"
                  type="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
                />
                <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>

              <div className="relative">
                <input
                  name="password"
                  type="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Password"
                  required
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
                />
                <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white font-semibold rounded-lg hover:scale-[1.02] transition">
                Register
              </button>

              {message && <p className="text-center text-sm text-gray-600 font-medium">{message}</p>}
            </motion.form>
          )}
        </AnimatePresence>

        {/* Toggle Panel */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-purple-500 to-pink-400 flex flex-col justify-center items-center text-white p-6">
          {isLoginActive ? (
            <>
              <h1 className="text-3xl font-bold mb-4">Hello, Welcome!</h1>
              <p className="mb-6">Don't have an account?</p>
              <button
                onClick={toggleForm}
                className="border-2 border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="mb-6">Already have an account?</p>
              <button
                onClick={toggleForm}
                className="border-2 border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterMotion;