import React from "react";
import { FaPhoneAlt, FaFemale, FaChild, FaShieldAlt, FaHandsHelping, FaUsers } from "react-icons/fa";

// Emergency helpline list with icons
const emergencyList = [
  {
    name: "Women's Helpline",
    numbers: ["1091", "181"],
    icon: <FaFemale className="w-16 h-16 text-pink-500" />,
  },
  {
    name: "Police Helpline",
    numbers: ["100", "112"],
    icon: <FaUsers className="w-16 h-16 text-pink-500" />,
  },
  {
    name: "Ambulance",
    numbers: ["102", "108"],
    icon: <FaHandsHelping className="w-16 h-16 text-pink-500" />,
  },
  {
    name: "Fire Service",
    numbers: ["101", "1800-180-1234"],
    icon: <FaPhoneAlt className="w-16 h-16 text-pink-500" />,
  },
  {
    name: "Child Helpline",
    numbers: ["1098", "1800-121-121"],
    icon: <FaChild className="w-16 h-16 text-pink-500" />,
  },
  {
    name: "Anti-Harassment Helpline",
    numbers: ["1512", "1800-180-123"],
    icon: <FaShieldAlt className="w-16 h-16 text-pink-500" />,
  },
];


// Women's safety organizations with icons
const organizations = [
  {
    name: "Jagori",
    description:
      "Jagori is a Delhi-based feminist organization working for women's rights, awareness against violence, and empowerment.",
    icon: <FaFemale className="w-20 h-20 text-pink-500" />,
    website: "https://www.jagori.org/",
  },
  {
    name: "SNEHA",
    description:
      "SNEHA is a mental health organization providing services for women and children.",
    icon: <FaHandsHelping className="w-20 h-20 text-pink-500" />,
    website: "https://www.snehamumbai.org/",
  },
  {
    name: "SEWA",
    description:
      "SEWA is a trade union working for self-reliant women workers and their rights.",
    icon: <FaUsers className="w-20 h-20 text-pink-500" />,
    website: "https://www.sewa.org/",
  },
];

const SpeedList = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 p-6">
      {/* Header */}
      <header className="bg-gradient-to-br from-purple-800 via-pink-300 to-purple-500 shadow-lg py-6 mb-8">
        <div className="container mx-auto flex items-center justify-center space-x-4 animate-bounce">
          <FaFemale className="w-16 h-16 text-white" />
          <h1 className="text-4xl font-bold text-white">🚨 Women's Safety Speed List</h1>
        </div>
      </header>

      {/* Emergency helplines */}
      <section className="container mx-auto px-6 mb-12">
        <h2 className="text-3xl font-bold text-pink-600 text-center mb-8 animate-pulse">
          Emergency Helpline Numbers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencyList.map((item, idx) => (
            <div
              key={idx}
              className="bg-pink-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform transition hover:scale-105 duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-pink-500 mb-2">{item.name}</h3>
              <p className="text-gray-700 mb-4">📞 {item.number}</p>
              <a
                href={`tel:${item.number}`}
                className="bg-pink-400 hover:bg-pink-500 text-white font-bold px-6 py-2 rounded-full transition transform hover:scale-105"
              >
                Call
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Women's safety organizations */}
      <section className="container mx-auto px-6 mb-12">
        <h2 className="text-3xl font-bold text-pink-600 text-center mb-8 animate-pulse">
          Women's Safety Organizations
        </h2>
        <div className="space-y-8">
          {organizations.map((org, idx) => (
            <div
              key={idx}
              className="bg-pink-50 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6 transform transition hover:scale-105 duration-300"
            >
              <div>{org.icon}</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-pink-500 mb-2">{org.name}</h3>
                <p className="text-gray-700 mb-4">{org.description}</p>
                <a
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-400 hover:bg-pink-500 text-white font-bold px-6 py-2 rounded-full transition transform hover:scale-105"
                >
                  Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SpeedList;
