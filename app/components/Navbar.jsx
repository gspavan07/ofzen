import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to check scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="top"
      className={`fixed top-0 z-50 w-full flex justify-between items-center pt-6 px-6 sm:px-10 md:px-20 transition-all duration-300 ${
        isScrolled ? "bg-[#d3e9d436] shadow-md h-fit pb-4" : "bg-transparent"
      }`}
    >
      <Link
        href="#top"
        className="left-6 sm:left-10 lg:left-20 top-10 lg:mt-0 w-20 md:w-36"
      >
        <img src="/logo.svg" alt="OfZen logo" />
      </Link>

      <div className="hidden xl:flex flex-wrap justify-center items-center gap-3 sm:gap-5">
        {["Home", "Expertises", "Creations", "Squad", "Contact us"].map(
          (item, index) => (
            <Link
              key={index}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className="rounded-full border-2 border-white/10 hover:border-white/25 text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] px-4 sm:px-6 py-2"
            >
              {item}
            </Link>
          )
        )}
      </div>
      <div className="hidden xl:flex w-20"></div>
      {/* Mobile Menu Icon (Click to Toggle) */}
      <div
        className="xl:hidden ml-auto cursor-pointer z-40"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FiX size={28} className="text-white block right-10" />
        ) : (
          <FiMenu size={28} className="text-white block  right-10" />
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-4 right-1 w-1/2 bg-[#94949481] border-2 border-gray-700 text-white p-6 shadow-md rounded-lg z-30 ${
          isOpen ? "block" : "hidden"
        } lg:hidden`}
      >
        <ul className="space-y-4 mt-3 text-center">
          {[
            "Home",
            "Expertises",
            "Creations",
            "Squad",
            "Our Story",
            "Contact Us",
          ].map((item, index) => (
            <li key={index}>
              <Link
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="block text-lg text-white py-1 hover:bg-[#276b3b] rounded"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
