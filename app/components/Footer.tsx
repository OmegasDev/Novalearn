"use client";

import { useState } from "react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubmitted(true);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand Identity */}
        <div>
          <h2 className="text-xl font-bold text-white">NovaLearn</h2>
          <p className="text-sm">Learn, Grow, Succeed.</p>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">🏠 Home</a></li>
            <li><a href="#books" className="hover:text-white">📚 Books</a></li>
            <li><a href="#affiliate" className="hover:text-white">🤝 Affiliate Program</a></li>
            <li><a href="#offers" className="hover:text-white">📢 Special Offers</a></li>
          </ul>
        </nav>

        {/* Social Media & Newsletter */}
        <div>
          <div className="flex justify-center md:justify-start space-x-4 text-xl">
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaTiktok /></a>
            <a href="#" className="hover:text-white"><FaYoutube /></a>
          </div>

          {/* Newsletter */}
          <div className="mt-4">
            <p className="text-sm">Get updates on new books & tools!</p>
            {submitted ? (
              <p className="text-green-400 text-sm mt-2">✅ Subscribed!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-2 flex justify-center md:justify-start">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-2 w-48 bg-gray-800 border border-gray-600 text-white text-sm rounded-l-md focus:outline-none"
                  required 
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition text-sm"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © 2025 NovaLearn. All Rights Reserved.
      </div>
    </footer>
  );
}
