import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatWidget from "./ChatWidget";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header visible on all main pages */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
        <ChatWidget />
      </main>

      {/* Footer visible on all main pages */}
      <Footer />
    </div>
  );
};

export default MainLayout;
