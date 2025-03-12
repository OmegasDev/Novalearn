"use client";

import { useState } from "react";

export default function ToolsSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubmitted(true);
    }
  };

  return (
    <section id="tools" className="py-16 px-8 bg-gradient-to-b from-gray-100 to-gray-500 text-center">
      {/* Title */}
      <h2 className="text-4xl font-bold text-gray-900 mb-4"> Coming Soon: Powerful Tools to Help You Succeed!</h2>

      {/* Description */}
      <p className="text-gray-700 max-w-2xl mx-auto">
        We're working on exciting tools to make your learning journey easier. Stay tuned for innovative resources that will enhance your experience.
      </p>

      {/* Illustration (Placeholder for Now) */}
      <div className="flex justify-center mt-6">
        <img 
          src="/book1.jpg" 
          alt="Futuristic Tools Preview" 
          className="w-80 h-auto rounded-md shadow-lg"
        />
      </div>

      {/* CTA Form */}
      <div className="mt-6">
        {submitted ? (
          <p className="text-green-600 font-semibold"> Thank you! You'll be notified when our tools are ready.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex justify-center mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 w-72 border border-gray-400 rounded-l-md focus:outline-none"
              required
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
            >
              Get Notified
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
