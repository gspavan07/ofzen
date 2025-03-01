import React from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react"; // Import icons
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      id="top"
      className="relative w-full flex justify-center items-center pt-6 px-6 sm:px-10 md:px-20 "
    >
      <img
        src="/logo.svg"
        alt="OfZen logo"
        className="absolute left-6 sm:left-10 lg:left-20 mt-10 lg:mt-0 w-36"
      />
      <div className=" hidden lg:flex flex-wrap justify-center items-center gap-3 sm:gap-5">
        <Link
          href="/"
          className="rounded-full border-2 border-white/10 hover:border-white/25 text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] px-4 sm:px-6 py-2"
        >
          Home
        </Link>
        <Link
          href="#expertises"
          className="rounded-full border-2 border-white/10 hover:border-white/25 text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] px-4 sm:px-6 py-2"
        >
          Expertises
        </Link>
        <Link
          href="#creations"
          className="rounded-full border-2 border-white/10 hover:border-white/25 text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] px-4 sm:px-6 py-2"
        >
          Creations
        </Link>
        <Link
          href="#squad"
          className="rounded-full border-2 border-white/10 hover:border-white/25 text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] px-4 sm:px-6 py-2"
        >
          Squad
        </Link>
        <Link
          href="#ourstory"
          className="rounded-full border-2 border-white/10 hover:border-white/25 text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] px-4 sm:px-6 py-2"
        >
          Our Story
        </Link>
        <Link
          href="#contactus"
          className="rounded-full border-2 border-white/10 hover:border-white/25 text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] px-4 sm:px-6 py-2"
        >
          Contact us
        </Link>
      </div>

      {/* Mobile Menu Icon (Click to Toggle) */}
      <div
        className="lg:hidden ml-auto cursor-pointer z-40 "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FiX size={28} className=" text-white block fixed top-7 right-10" />
        ) : (
          <FiMenu size={28} className=" text-white block fixed top-7 right-10" />
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-4 right-1 w-1/2 bg-[#1d4d3d] text-white p-6 shadow-md rounded-lg z-30 ${isOpen ? "block" : "hidden"
          } lg:hidden`}
      >
        <ul className="space-y-4 mt-3 text-center">
          <li>
            <Link
              href="/"
              className="block text-lg text-white py-2 hover:bg-[#276b3b] rounded "
              onClick={() => setIsOpen(false)}>
              Home</Link>
          </li>
          <li>
            <Link
              href="#expertises"
              className="block text-lg text-white py-2 hover:bg-[#276b3b] rounded "
              onClick={() => setIsOpen(false)}>
              Expertises</Link>
          </li>
          <li>
            <Link
              href="#creations"
              className="block text-lg text-white py-2 hover:bg-[#276b3b] rounded "
              onClick={() => setIsOpen(false)}>
              Creations</Link>
          </li>
          <li>
            <Link
              href="#squad"
              className="block text-lg text-white py-2 hover:bg-[#276b3b] rounded "
              onClick={() => setIsOpen(false)}>
              Squad</Link>
          </li>
          <li>
            <Link
              href="#ourstory"
              className="block text-lg text-white py-2 hover:bg-[#276b3b] rounded "
              onClick={() => setIsOpen(false)}>
              Our Story</Link>
          </li>
          <li>
            <Link
              href="#contactus"
              className="block text-lg text-white py-2 hover:bg-[#276b3b] rounded "
              onClick={() => setIsOpen(false)}>
              Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
