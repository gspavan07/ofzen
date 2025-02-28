"use client";
// Import necessary components and libraries
import Navbar from "./components/Navbar";
import { Window } from "./components/ui/Window";

import { FaPencilRuler, FaLaptopCode, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";
import { ShinyBorder } from "./components/ui/ShinyBorder";
import { ShinyBorderDash } from "./components/ui/ShinyBorderDash";
import Card from "./components/ProfileCard";
import { useState } from "react";
import { Marquee, ReviewCard } from "./components/ui/Marquee";
import Link from "next/link";
import { FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
export default function Home() {
  // Services array containing details of each service
  const services = [
    {
      icon: <FaPencilRuler className="text-2xl md:text-4xl text-white" />,
      title: "UI/UX",
      description:
        "Seamless experiences, where design meets functionality, enhancing user engagement.",
      borderColor: ["#A07CFE", "#FF00F5"],
      corner: ["tr", "br"],
    },
    {
      icon: <FaLaptopCode className="text-2xl md:text-4xl text-white" />,
      title: "Web Designing",
      description:
        "Crafting visually stunning, user-friendly designs that elevate brand identity & engagement.",
      borderColor: ["#FF00F5", "#FE8FB5"],
      corner: ["bl", "tl"],
    },
    {
      icon: <FaCode className="text-2xl md:text-4xl text-white" />,
      title: "Web Development",
      description:
        "Robust and scalable web solutions, blending performance, innovation, & seamless functionality.",
      borderColor: ["#A07CFE", "#0FEFFD"],
      corner: ["tr", "br"],
    },
  ];
  // Creations array containing details of each creation
  const creations = [
    {
      img: "creation1",
      title: "UI/UX",
      description:
        "Seamless experiences, where design meets functionality, enhancing user engagement.",
      borderColor: ["#0FEFFD"],
    },
    {
      img: "creation2",
      title: "Web Designing",
      description:
        "Crafting visually stunning, user-friendly designs that elevate brand identity & engagement.",
      borderColor: ["#FF00F5"],
    },
    {
      img: "creation1",
      title: "Web Development",
      description:
        "Robust and scalable web solutions, blending performance, innovation, & seamless functionality.",
      borderColor: ["#A07CFE"],
    },
    {
      img: "creation3",
      title: "UI/UX",
      description:
        "Seamless experiences, where design meets functionality, enhancing user engagement.",
      borderColor: ["#A07CFE"],
    },
    {
      img: "creation4",
      title: "Web Designing",
      description:
        "Crafting visually stunning, user-friendly designs that elevate brand identity & engagement.",
      borderColor: ["#0FEFFD"],
    },
    {
      img: "creation5",
      title: "Web Development",
      description:
        "Robust and scalable web solutions, blending performance, innovation, & seamless functionality.",
      borderColor: ["#FF00F5"],
    },
  ];

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic
  };

  const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Jenny",
      username: "@jenny",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "James",
      username: "@james",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/james",
    },
  ];

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  const faqs = [
    {
      question: "Is there a free trail?",
      answer: "No.",
    },
    {
      question: "Is pavan gud boy?",
      answer: "No,vvv bad boy.",
    },
    {
      question: "Is charan gud boy?",
      answer: "Yes.",
    },
    {
      question: "Is sunil gud boy?",
      answer: "Yes.",
    },
    {
      question: "Is venky gud boy",
      answer: "Yes.",
    },
    {
      question: "Is sandeep gud boy?",
      answer: "Yes.",
    },
  ];
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative w-full flex flex-col items-center ">
      <div className="absolute -top-40 lg:-top-96 -left-80 lg:-left-[900px] blur-[80px] lg:blur-[400px] rounded-full w-[500px] lg:w-[1000px] h-[400px] lg:h-[800px] bg-[#31ffdd] opacity-15" />

      {/* Background image */}
      <img
        src="/ray2.svg"
        alt=""
        className="absolute top-0 right-0 overflow-hidden opacity-0 lg:opacity-70"
      />
      <img
        src="/rays_bg.svg"
        alt=""
        className="absolute top-0 right-0 overflow-hidden opacity-45 lg:opacity-0"
      />
      <img
        src="/herotext.svg"
        alt=""
        className="absolute w-[16%] min-w-40 drop-shadow-2xl top-8 lg:top-20 right-1 lg:right-20 "
      />
      {/* Navbar component */}
      <Navbar />

      {/* Main title and subtitle */}
      <div className="flex flex-col my-32 lg:my-44 justify-center items-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[Megrim]">
          Precision in Design.
        </h1>
        <h1 className="text-[42px] sm:text-6xl lg:text-7xl font-serif md:font-[Playfair_Display_SC]">
          Power in Execution {"</>"}
        </h1>
      </div>
      {/* Window component */}
      <div className="relative w-[90%] lg:w-[70%] flex justify-center">
        <div className="absolute -top-5 md:-top-8 z-20 flex gap-2 left-5 items-center">
          <span className="bg-red-600 w-2 md:w-4 h-2 md:h-4 rounded-full flex"></span>
          <span className="bg-yellow-500 w-2 md:w-4 h-2 md:h-4 rounded-full flex"></span>
          <span className="bg-green-600 w-2 md:w-4 h-2 md:h-4 rounded-full flex"></span>
          <span className="bg-gradient-to-br text-xs font-[marcellus] font-bold md:text-base from-white to-[#818181c0] bg-clip-text text-transparent rounded-full flex">
            Editor
          </span>
        </div>
        <div className="absolute bottom-36 md:bottom-40 lg:bottom-28 xl:bottom-40 2xl:bottom-28 blur-2xl lg:blur-3xl rounded-full w-[80%] h-[100px] lg:h-[150px] 2xl:h-[300px] bg-[#206C47] z-0" />
        <Window
          className=" w-full h-[250px] xl:h-[300px] 2xl:h-[400px] overflow-hidden rounded-[20px] border-0"
          color={["#A07CFE", "#0099ff", "#0099ff"]}
        >
          <div className="absolute -top-40 lg:-top-96 -left-40 lg:-left-[450px] blur-[80px] lg:blur-[100px] rounded-full w-[500px] lg:w-[1000px] h-[400px] lg:h-[800px] bg-[#71ebd6] opacity-10" />
        </Window>
        <img
          src="/window.svg"
          alt=""
          className="z-10 w-[50%] md:w-[40%] h-auto -bottom-8 sm:-bottom-14 lg:-bottom-20 xl:-bottom-28 right-5 md:right-5 absolute"
        />
      </div>
      {/* <div className="absolute -left-44 xl:-left-[700px] bottom-36 md:bottom-40 lg:bottom-28 xl:bottom-40 2xl:bottom-28 blur-2xl lg:blur-3xl rounded-full w-[70%] h-[50%] bg-[#206C47] opacity-15 z-0" /> */}

      {/* Service cards */}
      <div className="z-20 flex flex-col font-[marcellus] justify-center items-center mt-16 mx-10 w-[90%] md:w-[70%] md:mt-28">
        <h1 className="text-3xl md:text-6xl font-[marcellus] font-medium bg-gradient-to-br from-white to-[#4d4d4d8a] bg-clip-text text-transparent">
          Our Expertises
        </h1>
        <div className="grid grid-cols-3  bg-gradient-to-br from-[#ffffff18] to-[#00000018] mt-5 gap-4 p-3 md:p-10 border-2 border-gray-400 rounded-2xl">
          {services.map((service, index) => (
            <ShinyBorder
              color={service.borderColor}
              corner={service.corner}
              key={index}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col h-full items-center"
              >
                <div
                  index={index}
                  className={`rounded-${service.corner[0]}-[100px] w-full h-full transition-all duration-300`}
                >
                  <div className="p-2 md:p-10 text-center text-white">
                    <div className="flex justify-center">{service.icon}</div>
                    <h3 className="text-xs mt-2 md:text-xl font-semibold uppercase">
                      {service.title}
                    </h3>
                    <p className="text-xs mt-3 text-gray-400">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </ShinyBorder>
          ))}
        </div>
      </div>

      {/* Creation cards */}
      <div className="z-20 flex flex-col font-[marcellus] justify-center items-center mt-10 mx-10 w-[90%] md:w-[70%] md:mt-20">
        <h1 className="text-3xl md:text-6xl font-[marcellus] font-medium bg-gradient-to-br from-white to-[#4d4d4d8a] bg-clip-text text-transparent">
          Creations
        </h1>
        <div className="grid grid-cols-2 xl:grid-cols-3 justify-center  bg-gradient-to-br from-[#ffffff27] to-[#00000018] mt-5 gap-6 p-3 md:p-10 border-2 border-gray-400 rounded-2xl">
          {creations.map((creation, index) => (
            <ShinyBorderDash
              className="relative overflow-hidden border-0"
              color={creation.borderColor}
              duration={14}
              key={index}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col h-full items-center"
              >
                <div
                  index={index}
                  className={`rounded-2xl bg-[#ffffff10] p-3 border-0 w-full h-full transition-all duration-300 `}
                >
                  <div className="p-2 flex flex-col justify-center items-center md:p-10 text-center text-white">
                    <img
                      src={`/img/${creation.img}.png`}
                      alt={creation.title}
                      className=""
                    />
                    <h3 className="text-sm md:text-xl font-semibold uppercase">
                      {creation.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {creation.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </ShinyBorderDash>
          ))}
        </div>
      </div>

      {/* Meet our Squad */}
      <div className="flex flex-col px-10 md:py-32 py-24 w-full lg:w-[70%] relative">
        <div className="absolute -top-40 lg:-top-96 -left-80 lg:-left-[900px] blur-[80px] lg:blur-[100px] rounded-full w-[500px] lg:w-[1000px] h-[400px] lg:h-[800px] bg-[#71ebd6] opacity-10" />
        <img
          src="/light.svg"
          alt=""
          className="absolute w-1/2 lg:-top-60 overflow-hidden opacity-45 lg:opacity-70"
        />
        <div className="flex w-10 h-10 lg:w-20 lg:h-20 right-5 lg:-right-24 -rotate-45 lg:top-24 border-2 absolute opacity-45 border-purple-800" />
        <div className="flex w-10 h-10 lg:w-20 lg:h-20 left-1 lg:-left-10 -rotate-45 bottom-28 border-2 absolute opacity-45 border-blue-800" />

        <div className="hidden lg:block">
          <div className="flex gap-4 justify-between">
            <Card
              name={"Pavan G"}
              img={"/img/pavan_img.png"}
              role={"Full Stack Devloper"}
            />
            <div className="lg:flex hidden flex-col text-center justify-center">
              <h1 className="text-3xl md:text-5xl mb-5 font-[marcellus] font-medium bg-gradient-to-br from-white to-[#4d4d4d8a] bg-clip-text text-transparent">
                Meet our Squad
              </h1>
              <img
                src="/logo.svg"
                alt=""
                className="bg-gradient-to-br max-w-[90%] from-white to-[#4d4d4d8a] bg-clip-text text-transparent"
              />
            </div>
            <Card
              name={"Sanddep J"}
              img={"/img/sandeep_img.png"}
              role={"Digital Marketing "}
            />
          </div>
          <div className="flex gap-4 justify-between mt-5 lg:mt-10">
            <Card
              name={"Sunil G"}
              img={"/img/sunil_img.png"}
              role={"Back End Devloper"}
            />
            <Card
              name={"Charan Tej"}
              img={"/img/charan_img.png"}
              role={"Ui/ux Designer"}
            />
            <Card
              name={"Venkat M"}
              img={"/img/venky_img.png"}
              role={"Front end Devloper "}
            />
          </div>
        </div>
        <div className="block lg:hidden">
          <div className="flex items-center flex-col justify-center">
            <h1 className="text-3xl  mb-5 font-serif font-medium bg-gradient-to-br from-white to-[#4d4d4d8a] bg-clip-text text-transparent">
              Meet our Squad
            </h1>
            <img
              src="/logo.svg"
              alt=""
              className=" w-1/2 bg-gradient-to-br from-white to-[#4d4d4d8a] bg-clip-text text-transparent"
            />
          </div>
          <div className="grid gap-2 mt-10 place-items-center grid-cols-2">
            <Card
              name={"Pavan G"}
              img={"/img/pavan_img.png"}
              role={"Full Stack Devloper"}
            />
            <Card
              name={"Sanddep J"}
              img={"/img/sandeep_img.png"}
              role={"Digital Marketing "}
            />
            <Card
              name={"Sunil G"}
              img={"/img/sunil_img.png"}
              role={"Back End Devloper"}
            />
            <Card
              name={"Charan Tej"}
              img={"/img/charan_img.png"}
              role={"Ui/ux Designer"}
            />
          </div>
          <div className="w-full flex items-center mt-2 justify-center">
            <Card
              className="w-1/2"
              name={"Venkat M"}
              img={"/img/venky_img.png"}
              role={"Front end Devloper "}
            />
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="md:w-[70%] pb-20 w-[90%] flex flex-col justify-center items-center">
        <h2 className="text-3xl md:text-6xl mb-5 font-[marcellus] font-medium bg-gradient-to-br from-white to-[#4d4d4d8a] bg-clip-text text-transparent">
          Our Story
        </h2>
        <p className="text-2xl text-justify md:text-left font-[marcellus] leading-relaxed bg-gradient-to-br from-[#b1b1b1] to-[#8a8a8a8a] bg-clip-text text-transparent">
          We are a group of five engineering students who came together with a
          shared vision—to build something innovative and impactful. Driven by
          passion and expertise, we founded Ofzen, a startup dedicated to
          crafting seamless digital experiences through cutting-edge design,
          development, and technology. <br /> At Ofzen, we don’t just create; we
          innovate, solve problems, and turn ideas into reality. Our mission is
          to push boundaries, challenge the norm, and build solutions that make
          a difference. <span className="text-white">🚀</span>
        </p>
      </div>

      {/* Testimonials */}
      <div className="relative flex w-full pb-10 flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>

      {/* Let's have a virtual Coffee!  */}
      <div className="flex flex-col items-center justify-center md:w-[70%] pb-10 w-[90%] text-white p-6">
        {/* Heading */}
        <h1 className="text-3xl md:text-6xl mb-3 font-[marcellus] font-medium bg-gradient-to-br from-white to-[#4d4d4d8a] bg-clip-text text-transparent">
          Let's Have a Virtual Coffee!
        </h1>
        <p className="text-gray-400 text-lg font-[marcellus] text-center mb-8">
          Let’s bring your ideas to life. Reach out, & let's create something
          extraordinary together!
        </p>

        {/* Form  */}
        <div className="flex flex-col p-8 lg:p-14 font-[marcellus] rounded-2xl w-full lg:w-1/2 border-2 border-gray-700 bg-gradient-to-br from-[#ffffff15] to-[#2929292c]">
          <h2 className="text-2xl lg:text-3xl text-left mb-3">
            Let’s Connect!
          </h2>
          <p className="text-gray-400 text-left mb-6">
            Let’s connect our constellations and spark innovation together.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-1/2 bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70ff4533] text-white placeholder-gray-500"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-1/2 bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70ff4533] text-white placeholder-gray-500"
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70ff4533] text-white placeholder-gray-500"
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              className="w-full bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70ff4533] text-white placeholder-gray-500"
              onChange={handleChange}
              required
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#9494941c] p-3 rounded-lg hover:bg-[#70ff4533] transition text-white font-semibold flex items-center justify-center space-x-2"
            >
              Submit <span className="ml-2">🚀</span>
            </button>
          </form>
        </div>
      </div>
      {/*FAQ'S*/}
      <div className="flex w-[70%] flex-col items-center px-6 lg:px-16 py-10">
        <h2 className="text-3xl md:text-6xl mb-3 font-[marcellus] font-medium bg-gradient-to-br from-white to-[#4d4d4d8a] bg-clip-text text-transparent">
          FAQ's
        </h2>

        <div className="w-full max-w-2xl">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-2">
              <button
                className="w-full text-left p-4 border-2 border-gray-700 bg-[#9494941c] rounded-lg transition duration-300 hover:bg-[#222b1f52] "
                onClick={() => toggleFAQ(index)}
              >
                <p className="bg-gradient-to-br from-white to-[#4d4d4d8a] bg-clip-text text-transparent">
                  {index + 1}. {faq.question}
                </p>
              </button>
              {openIndex === index && (
                <div className="p-4 bg-green-100 bg-opacity-20 text-white rounded-lg mt-1">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative rounded-t-[70px] border-t-2 w-full text-white py-10 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex justify-between gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex flex-col items-start">
              <img src="./icon.svg" alt="" className="w-16" />
              {/* Replace with actual logo */}
              <h2 className="text-xl font-semibold">OFZEN</h2>
            </div>
            <p className="text-gray-400 mt-2">
              We grow your business with a <br /> personal AI manager.
            </p>
            <div className="flex items-center mt-4"></div>
          </div>
          <div className="flex gap-8">
            {/* Company Links */}
            <div className="text-right flex-col flex">
              <h3 className="text-gray-300 font-semibold ">COMPANY</h3>
              <Link
                href="/"
                className="text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] py-1"
              >
                Home
              </Link>
              <Link
                href="/"
                className="text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] py-1"
              >
                Expertises
              </Link>
              <Link
                href="/"
                className="text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] py-1"
              >
                About us
              </Link>
              <Link
                href="/"
                className="text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] py-1"
              >
                Contact us
              </Link>
            </div>

            {/* Legal Links */}
            {/* <div>
              <h3 className="text-gray-300 font-semibold mb-2">LEGAL</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#">Terms of Service</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Cookies Policy</a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex w-full items-center mt-6 justify-center space-x-4">
          <Link
            href="mailto:ofzenenterprise@gmail.com"
            className="flex items-center bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg hover:bg-[#9494943b]"
          >
            ✉️ <span className="ml-2">ofzenenterprise@gmail.com</span>
          </Link>
          <a
            href="#"
            className="bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg hover:bg-[#9494943b]"
          >
            <FaXTwitter />
          </a>
          <a
            href="#"
            className="bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg hover:bg-[#9494943b]"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="#"
            className="bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg hover:bg-[#9494943b]"
          >
            <FaInstagram />
          </a>
        </div>
      </footer>
    </div>
  );
}
