import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div
      id="top"
      className="relative w-full flex justify-center items-center pt-6 px-6 sm:px-10 md:px-20"
    >
      <img
        src="/logo.svg"
        alt="OfZen logo"
        className="absolute left-6 sm:left-10 lg:left-20 mt-10 lg:mt-0 w-36 "
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
    </div>
  );
};

export default Navbar;
