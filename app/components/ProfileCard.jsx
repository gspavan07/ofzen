import React from "react";

const Card = ({ className, img, name, role }) => {
  return (
    <div
      className={`flex max-w-[40vw] flex-col justify-center items-center p-3 lg:p-5 rounded-3xl sm:rounded-[50px] border-2 border-gray-700 bg-gradient-to-br from-[#ffffff15] to-[#2929292c] ${className}`}
    >
      <div className="bg-black w-fit mb-4 bg-opacity-25 p-5 rounded-full">
        <img src={img} alt="profile_img" className="w-52 h-auto" />
      </div>
      <h1 className="sm:text-2xl text-center text-nowrap lg:text-4xl uppercase font-[marcellus]">
        {name}
      </h1>
      <h1 className="text-[10px] sm:text-xs lg:text-lg text-center mt-1 uppercase font-[marcellus]">
        {role}
      </h1>
    </div>
  );
};

export default Card;
