import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="relative w-full flex justify-center items-center pt-6 px-6 sm:px-10 md:px-20">
      <img
        src="/logo.svg"
        alt="OfZen logo"
        className="absolute left-6 sm:left-10 md:left-20 mt-10 md:mt-0 w-36 "
      />
      <div className=" hidden md:flex flex-wrap justify-center items-center gap-3 sm:gap-5">
        <Link
          href="/"
          className="rounded-full border-2 border-white/10 hover:border-white/25 text-base sm:text-lg font-serif font-medium px-4 sm:px-6 py-2"
        >
          Home
        </Link>
        <Link
          href="/"
          className="rounded-full border-2 border-white/10 hover:border-white/25 text-base sm:text-lg font-serif font-medium px-4 sm:px-6 py-2"
        >
          Expertises
        </Link>
        <Link
          href="/"
          className="rounded-full border-2 border-white/10 hover:border-white/25 text-base sm:text-lg font-serif font-medium px-4 sm:px-6 py-2"
        >
          About us
        </Link>
        <Link
          href="/"
          className="rounded-full border-2 border-white/10 hover:border-white/25 text-base sm:text-lg font-serif font-medium px-4 sm:px-6 py-2"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
