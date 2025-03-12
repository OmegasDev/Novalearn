"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import SignupPopup from "./SignupPopup"; // Import the Signup Popup Component

export default function Hero() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isSignupOpen, setIsSignupOpen] = useState(false); // State for Signup Popup

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "books", "tools", "affiliate"];
      let current = "";

      sections.forEach((section) => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavClass = (section: string) => `
    px-4 py-2 cursor-pointer relative inline-block
    ${activeSection === section ? "text-[#0056D2] font-bold" : "text-[#565E6C] font-normal"}
  `;

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full h-14 bg-white shadow-sm flex items-center px-6 z-50">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src="/logo.png" alt="NovaLearn Logo" width={36} height={36} />
          <h1 className="text-2xl font-bold font-roboto text-black">NovaLearn</h1>
        </div>

        {/* Navigation Menu */}
        <div className="absolute top-[2px] left-[232px] flex items-center space-x-6">
          {/* Home */}
          <ScrollLink to="hero" smooth={true} duration={800} offset={-50} className={getNavClass("hero")}>
            Home
            {activeSection === "hero" && <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#0056D2]"></div>}
          </ScrollLink>

          {/* Books */}
          <ScrollLink to="books" smooth={true} duration={800} offset={-50} className={getNavClass("books")}>
            Books
            {activeSection === "books" && <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#0056D2]"></div>}
          </ScrollLink>

          {/* Tools */}
          <ScrollLink to="tools" smooth={true} duration={800} offset={-50} className={getNavClass("tools")}>
            Tools
            {activeSection === "tools" && <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#0056D2]"></div>}
          </ScrollLink>

          {/* Affiliate */}
          <ScrollLink to="affiliate" smooth={true} duration={800} offset={-50} className={getNavClass("affiliate")}>
            Affiliate
            {activeSection === "affiliate" && <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#0056D2]"></div>}
          </ScrollLink>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={() => setIsSignupOpen(true)} // Open Signup Popup
          className="absolute top-[10px] right-[20px] w-[160px] h-[36px] flex items-center justify-center px-3 bg-[#0056D2] text-white rounded-lg gap-2 hover:bg-[#0047AC] active:bg-[#003886]"
        >
          <FaUser className="w-4 h-4" />
          Sign Up
        </button>
      </nav>

      {/* Signup Popup */}
      {isSignupOpen && <SignupPopup onClose={() => setIsSignupOpen(false)} title={""} description={""} type={"affiliate"} />} 

      {/* Hero Section */}
      <section id="hero" className="relative w-full h-screen mt-14">
        <div className="absolute inset-0 w-full h-full">
          <Image src="/Image18.png" alt="Hero Background" fill className="object-cover" quality={100} priority />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h2 className="text-5xl md:text-6xl font-bold font-roboto">Unlock Knowledge & Transform Your Life!</h2>
          <p className="text-lg md:text-xl mt-3 opacity-80">Explore insightful books and practical tools designed to help you succeed.</p>
          <ScrollLink to="books" smooth={true} duration={800} offset={-50}>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition">
              Explore Now
            </button>
          </ScrollLink>
        </div>
      </section>
    </>
  );
}



