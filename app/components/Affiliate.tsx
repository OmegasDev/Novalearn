"use client";

import { useState } from "react";
import SignupPopup from "./SignupPopup"; // Ensure correct path

interface AffiliateSectionProps {
  commissionRate: number;
}

export default function AffiliateSection({ commissionRate }: AffiliateSectionProps) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section id="affiliate" className="py-16 px-8 bg-gray-100 text-center">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Join Our Affiliate Program & Earn!
      </h2>

      {/* Description */}
      <p className="text-gray-700 max-w-2xl mx-auto">
        Promote our books and earn a percentage on every sale. It&apos;s free and easy to start!
      </p>

      {/* Benefits List */}
      <ul className="mt-6 space-y-2 text-gray-800 text-lg">
        <li>✅ Earn up to <span className="font-bold">{commissionRate}%</span> commission per sale.</li>
        <li>✅ No upfront cost—just share and earn!</li>
        <li>✅ Track your earnings in real time.</li>
      </ul>

      {/* Signup Button (Opens Popup) */}
      <button
        onClick={() => setShowPopup(true)}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Sign Up as an Affiliate
      </button>

      {/* Subtle Login Link */}
      <p className="mt-2 text-gray-600 text-sm">
        Already an affiliate?{" "}
        <a href="https://payhip.com/affiliates/login" className="text-blue-600 hover:underline">
          Log in to track your earnings.
        </a>
      </p>

      {/* Show Signup Popup */}
      {showPopup && (
        <SignupPopup
          title="Affiliate Sign-Up"
          description="Earn commissions by promoting our products!"
          type="affiliate"
          onClose={() => setShowPopup(false)}
        />
      )}
    </section>
  );
}


