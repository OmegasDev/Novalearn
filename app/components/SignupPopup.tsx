"use client"

import { useState } from "react";

interface SignupPopupProps {
  title: string;
  description: string;
  type: "nav" | "affiliate";
  onClose: () => void;
}

const SignupPopup: React.FC<SignupPopupProps> = ({ title, description, type, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = { name, email, type };
    
    try {
      const response = await fetch("YOUR_GOOGLE_SHEETS_API_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        if (type === "affiliate") {
          window.location.href = "/affiliate-dashboard"; // Change this when table is ready
        }
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px] relative animate-fadeIn scale-95">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl" onClick={onClose}>
          ✖
        </button>
        {submitted ? (
          <p className="text-green-600 text-center text-lg font-semibold">Thanks for signing up!</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Sign Up
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPopup;
