import React from "react";

const Card = ({ className, img, name, role }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center p-3 lg:p-5 rounded-[50px] border-2 border-gray-700 bg-gradient-to-br from-[#ffffff15] to-[#2929292c] ${className}`}
    >
      <div className="bg-black w-[90%] bg-opacity-25 p-5 rounded-full">
        <img src={img} alt="profile_img" className="w-52 h-auto" />
      </div>
      <h1 className="text-2xl text-center text-nowrap lg:text-4xl uppercase font-[marcellus]">
        {name}
      </h1>
      <h1 className="text-xs lg:text-lg mt-1 uppercase font-[marcellus]">
        {role}
      </h1>
    </div>
  );
};

export default Card;
