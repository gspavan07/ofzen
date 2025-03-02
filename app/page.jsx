"use client";
// Import necessary components and libraries
import Navbar from "./components/Navbar";
import { Window } from "./components/ui/Window";
import { SiTicktick } from "react-icons/si";
import { FaPencilRuler, FaLaptopCode, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";
import { ShinyBorder } from "./components/ui/ShinyBorder";
import { ShinyBorderDash } from "./components/ui/ShinyBorderDash";
import Card from "./components/ProfileCard";
import { useState } from "react";
import { Marquee, ReviewCard } from "./components/ui/Marquee";
import { TypingAnimation } from "./components/ui/TypewriterEffect";
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

  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [err, setErr] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(false); // Reset error message on each submission attempt
    const { firstname, lastname, email, message } = formData;
    console.log(firstname, lastname, email, message);
    try {
      const response = await fetch("/api/contact", {
        method: "POST", // Specify the POST method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, email, message }), // Convert data to JSON string
      });
      const result = await response.json();
      console.log(result);
      if (response.status === 200) {
        setIsSubmitted(true);
        setLoading(false);
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          message: "",
        });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        setErr(true);
        setLoading(false);
      }
    } catch (error) {
      setErr(true);
      setLoading(false);
    }
  };

  // const reviews = [
  //   {
  //     name: "Jack",
  //     username: "@jack",
  //     body: "I've never seen anything like this before. It's amazing. I love it.",
  //     img: "https://avatar.vercel.sh/jack",
  //   },
  //   {
  //     name: "Jill",
  //     username: "@jill",
  //     body: "I don't know what to say. I'm speechless. This is amazing.",
  //     img: "https://avatar.vercel.sh/jill",
  //   },
  //   {
  //     name: "John",
  //     username: "@john",
  //     body: "I'm at a loss for words. This is amazing. I love it.",
  //     img: "https://avatar.vercel.sh/john",
  //   },
  //   {
  //     name: "Jane",
  //     username: "@jane",
  //     body: "I'm at a loss for words. This is amazing. I love it.",
  //     img: "https://avatar.vercel.sh/jane",
  //   },
  //   {
  //     name: "Jenny",
  //     username: "@jenny",
  //     body: "I'm at a loss for words. This is amazing. I love it.",
  //     img: "https://avatar.vercel.sh/jenny",
  //   },
  //   {
  //     name: "James",
  //     username: "@james",
  //     body: "I'm at a loss for words. This is amazing. I love it.",
  //     img: "https://avatar.vercel.sh/james",
  //   },
  // ];

  // const faqs = [
  //   {
  //     question: "Is there a free trail?",
  //     answer: "No.",
  //   },
  //   {
  //     question: "Is pavan gud boy?",
  //     answer: "No,vvv bad boy.",
  //   },
  //   {
  //     question: "Is charan gud boy?",
  //     answer: "Yes.",
  //   },
  //   {
  //     question: "Is sunil gud boy?",
  //     answer: "Yes.",
  //   },
  //   {
  //     question: "Is venky gud boy",
  //     answer: "Yes.",
  //   },
  //   {
  //     question: "Is sandeep gud boy?",
  //     answer: "Yes.",
  //   },
  // ];

  // const firstRow = reviews.slice(0, reviews.length / 2);
  // const secondRow = reviews.slice(reviews.length / 2);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative w-full flex flex-col items-center ">
      <div className="absolute -top-40 lg:-top-96 -left-80 lg:-left-[700px] blur-[100px] lg:blur-[400px] rounded-full w-[500px] lg:w-[1000px] h-[400px] lg:h-[800px] bg-[#31ffdd] opacity-25" />

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
        className="absolute w-[16%] min-w-40 drop-shadow-2xl top-8 lg:top-20 right-1 lg:right-20 hidden lg:block"
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
      <div className="relative w-[90%] lg:w-[70%] flex justify-center fade-in">
        <div className="absolute -top-5 md:-top-8 z-20 flex gap-2 left-5 items-center">
          <span className="bg-red-600 w-2 md:w-4 h-2 md:h-4 rounded-full flex "></span>
          <span className="bg-yellow-500 w-2 md:w-4 h-2 md:h-4 rounded-full flex"></span>
          <span className="bg-green-600 w-2 md:w-4 h-2 md:h-4 rounded-full flex"></span>
          <span className="bg-gradient-to-br text-xs font-[marcellus] font-bold md:text-base from-white to-[#818181c0] bg-clip-text text-transparent rounded-full flex">
            Editor
          </span>
        </div>
        <div className="absolute bottom-36 md:bottom-40 lg:bottom-28 xl:bottom-40 2xl:bottom-28 blur-2xl lg:blur-3xl rounded-full w-[80%] h-[100px] lg:h-[150px] 2xl:h-[300px] bg-[#206C47] z-0" />
        <Window
          className=" w-full h-[250px] xl:h-[300px] px-8 2xl:h-[400px] overflow-hidden rounded-[20px] border-0 fade-in"
          color={["#A07CFE", "#0099ff", "#0099ff"]}
        >
          <div className="flex flex-col ">
            <h1 className="text-4xl text-center md:text-left sm:text-5xl mt-5 md:mt-16 lg:mb-4 xl:mb-8 xl:text-6xl font-[marcellus]">
              Welcome to OFZEN
            </h1>
            <h1 className="sm:text-[18px] lg:w-[50%] xl:w-[60%] p-4 sm:p-6 md:p-0 lg:text-2xl xl:text-3xl font-[marcellus] ">
              Crafting seamless digital experiences through design, development,
              <br className="visible lg:hidden" />
              and innovation.
            </h1>
          </div>
          <div className="absolute -top-40 lg:-top-96 -left-40 lg:-left-[450px] blur-[80px] lg:blur-[100px] rounded-full w-[500px] lg:w-[1000px] h-[400px] lg:h-[800px] bg-[#71ebd6] opacity-10" />
        </Window>

        <img
          src="/window.svg"
          alt=""
          className="z-10 w-[50%] md:w-[40%] h-auto -bottom-8 sm:-bottom-14 lg:-bottom-20 xl:-bottom-28 right-5 md:right-5 absolute fade-in"
        />
      </div>

      {/* Service cards */}
      <div
        id="expertises"
        className="z-20 scroll-mt-24 flex flex-col font-[marcellus] justify-center items-center mt-16 mx-10 w-[90%] md:w-[70%] md:mt-28"
      >
        <h1 className="text-3xl md:text-6xl font-[marcellus] font-medium bg-gradient-to-br from-white to-[#4d4d4d8a] bg-clip-text text-transparent">
          Expertises
        </h1>
        <div className="grid grid-cols-3  bg-gradient-to-br from-[#ffffff18] to-[#00000018] mt-5 gap-4 p-3 md:p-10 border-2 border-gray-400 rounded-2xl">
          {services.map((service, index) => (
            <ShinyBorder
              color={service.borderColor}
              corner={service.corner}
              key={index}
            >
              <motion.div
                whileHover={{ scale: 1.09 }}
                className="flex flex-col h-full items-center"
              >
                <div
                  index={index}
                  className={` w-full h-full transition-all duration-300`}
                >
                  <div className="p-2 md:p-10 text-center text-white">
                    <div className="flex justify-center">{service.icon}</div>
                    <h3 className="text-[10px] sm:text-xs mt-2 md:text-xl font-semibold uppercase">
                      {service.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs mt-3 text-gray-400">
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
      <div
        id="creations"
        className="z-20 scroll-mt-24 flex flex-col font-[marcellus] justify-center items-center mt-10 mx-10 w-[90%] md:w-[70%] md:mt-20"
      >
        <h1 className="text-3xl md:text-6xl font-[marcellus] font-medium bg-gradient-to-br from-white to-[#4d4d4d8a] bg-clip-text text-transparent">
          Creations
        </h1>
        <div className="grid grid-cols-2 xl:grid-cols-3 justify-center  bg-gradient-to-br from-[#ffffff27] to-[#00000018] mt-5 gap-6 p-3 lg:p-10 border-2 border-gray-400 rounded-2xl">
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
                  <div className="p-2 flex flex-col justify-center items-center md:p-10 text-center text-white ">
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
      <div
        id="squad"
        className="flex scroll-mt-16 flex-col px-10 md:py-32 my-14 w-full lg:w-[70%] relative"
      >
        <div className="absolute -top-40 lg:-top-96 -left-80 lg:-left-[900px] blur-[80px] lg:blur-[100px] rounded-full w-[500px] lg:w-[1000px] h-[400px] lg:h-[800px] bg-[#0e947e94] opacity-10" />
        <img
          src="/light.svg"
          alt=""
          className="absolute w-1/2 lg:-top-60 overflow-hidden opacity-45 lg:opacity-70"
        />
        <div className="flex w-10 h-10 lg:w-20 lg:h-20 right-5 lg:-right-24 -rotate-45 lg:top-24 border-2 absolute opacity-45 border-purple-800" />
        <div className="flex w-10 h-10 lg:w-20 lg:h-20 left-1 lg:-left-10 -rotate-45 bottom-28 border-2 absolute opacity-45 border-blue-800" />

        <div className="hidden xl:block">
          <div className="flex gap-4 justify-between">
            <Card
              name={"Pavan G"}
              img={"/img/pavan_img.png"}
              role={"Full Stack Developer"}
            />
            <div className="lg:flex hidden flex-col text-center items-center justify-center">
              <h1 className="text-3xl md:text-5xl mb-5 font-[marcellus] font-medium bg-gradient-to-br from-white to-[#4d4d4d8a] bg-clip-text text-transparent">
                Meet our Squad
              </h1>
              <img
                src="/logo.svg"
                alt=""
                className="bg-gradient-to-br max-w-[80%] from-white to-[#4d4d4d8a] bg-clip-text text-transparent"
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
              role={"Back End Developer"}
            />
            <Card
              name={"Charan Tej"}
              img={"/img/charan_img.png"}
              role={"Ui/ux Designer"}
            />
            <Card
              name={"Venkat M"}
              img={"/img/venky_img.png"}
              role={"Front end Developer "}
            />
          </div>
        </div>

        <div className="block xl:hidden">
          <div className="flex items-center flex-col justify-center">
            <h1 className="text-3xl md:text-6xl font-[marcellus] font-medium bg-gradient-to-br from-white to-[#4d4d4d8a] bg-clip-text text-transparent">
              Meet our Squad
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-10 place-items-center ">
            <Card
              name={"Pavan G"}
              img={"/img/pavan_img.png"}
              role={"Full Stack Developer"}
            />
            <Card
              name={"Sanddep J"}
              img={"/img/sandeep_img.png"}
              role={"Digital Marketing "}
            />
            <Card
              name={"Sunil G"}
              img={"/img/sunil_img.png"}
              role={"Back End Developer"}
            />
            <Card
              name={"Charan Tej"}
              img={"/img/charan_img.png"}
              role={"Ui/ux Designer"}
            />
          </div>
          <div className="flex w-full items-center justify-center mt-3">
            <Card
              className=""
              name={"Venkat M"}
              img={"/img/venky_img.png"}
              role={"Front end Developer "}
            />
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div
        id="ourstory"
        className="md:w-[70%] scroll-mt-24 pb-10 w-[90%] flex flex-col justify-center items-center"
      >
        <h2 className="text-3xl md:text-6xl mb-5 font-[marcellus] font-medium bg-gradient-to-br from-white to-[#4d4d4d8a] bg-clip-text text-transparent">
          Our Story
        </h2>
        <p className="sm:text-2xl text-justify md:text-left font-[marcellus] leading-relaxed bg-gradient-to-br from-[#b1b1b1] to-[#8a8a8a8a] bg-clip-text text-transparent">
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

      {/* Let's have a virtual Coffee!  */}
      <div
        id="contactus"
        className="relative scroll-mt-24 flex overflow-x-clip flex-col items-center justify-center w-full pb-10 text-white p-6"
      >
        <div className="absolute -top-40 lg:-top-96 -right-72 lg:-right-[800px] blur-[80px] lg:blur-[100px] rounded-full w-[500px] lg:w-[1000px] h-[400px] lg:h-[800px] bg-[#71ebd6] opacity-10" />

        {/* Heading */}
        <h1 className="text-3xl md:text-6xl mb-3 font-[marcellus] font-medium bg-gradient-to-br from-white to-[#4d4d4d8a] bg-clip-text text-transparent">
          Let's Have a Virtual Coffee!
        </h1>
        <p className="text-gray-400 text-lg font-[marcellus] text-center mb-8">
          Let’s bring your ideas to life. Reach out, & let's create something
          extraordinary together!
        </p>
        {/* Popup Dialog */}
        {isSubmitted && (
          <div className="z-10 absolute flex flex-col p-8 justify-center items-center w-fit h-1/3 bg-background border-2 border-gray-700 text-white rounded-lg shadow-lg transition-opacity duration-300">
            <SiTicktick size={50} className="mb-5" />
            Submitted!
            <p className="text-gray-400 text-left mb-6">
              We contact you as soon as possible.
            </p>
          </div>
        )}
        {/* Form  */}
        <div className="flex flex-col p-8 lg:p-14 font-[marcellus] rounded-2xl w-[90%] lg:w-1/3 border-2 border-gray-700 bg-gradient-to-br from-[#ffffff15] to-[#2929292c]">
          <h2 className="text-2xl lg:text-3xl text-left mb-3">
            Let’s Connect!
          </h2>
          <p className="text-gray-400 text-left mb-6">
            Let’s connect our constellations and spark innovation together.
          </p>
          {err && (
            <p className="text-red-700 text-center text-wrap mt-5">
              Error submiting the request, please try again.
            </p>
          )}
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                placeholder="Last Name"
                className="w-1/2 bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70ff4533] text-white placeholder-gray-500"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                placeholder="First Name"
                className="w-1/2 bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70ff4533] text-white placeholder-gray-500"
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              className="w-full bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70ff4533] text-white placeholder-gray-500"
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              value={formData.message}
              className="w-full bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70ff4533] text-white placeholder-gray-500"
              onChange={handleChange}
              required
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#9494941c] p-3 rounded-lg hover:bg-[#70ff4533] transition text-white font-semibold flex items-center justify-center space-x-2"
            >
              {loading ? "Loading..." : "Submit"}{" "}
              <span className="ml-2">🚀</span>
            </button>
          </form>
        </div>
      </div>

      {/* Testimonials */}
      {/* <div className="relative flex w-full pb-10 flex-col items-center justify-center overflow-hidden">
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
      </div> */}
      {/*FAQ'S*/}
      {/* <div className="flex w-[70%] flex-col items-center px-6 lg:px-16 pb-10">
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
      </div> */}

      {/* Footer */}
      <footer className="relative overflow-hidden rounded-t-[70px] border-t-2 w-full text-white py-10 px-8 md:px-16 lg:px-24">
        <div className="flex w-20 opacity-25 h-20 top-10 -left-10 justify-center items-center blur-2xl absolute rounded-full bg-purple-800" />
        <div className="flex w-20 opacity-25 h-20 right-20 -bottom-10 justify-center items-center blur-2xl absolute rounded-full bg-blue-800" />

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
              <h3 className="text-gray-300 font-semibold">COMPANY</h3>
              <Link
                href="#home"
                className="text-base sm:text-lg text-transparent bg-clip-text hover:underline bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] py-1"
              >
                Home
              </Link>
              <Link
                href="#expertises"
                className="text-base sm:text-lg text-transparent bg-clip-text hover:underline bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] py-1"
              >
                Expertises
              </Link>
              <Link
                href="#creations"
                className="text-base sm:text-lg text-transparent bg-clip-text hover:underline bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] py-1"
              >
                Creations
              </Link>
              <Link
                href="#squad"
                className="text-base sm:text-lg text-transparent bg-clip-text hover:underline bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] py-1"
              >
                Meet our squad
              </Link>
              <Link
                href="#contactus"
                className="text-base sm:text-lg text-transparent bg-clip-text hover:underline bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus] py-1"
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
        <div className="flex flex-wrap gap-3 w-full items-center mt-6 justify-center">
          <Link
            href="mailto:ofzenenterprise@gmail.com"
            className="flex items-center bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg hover:bg-[#9494943b]"
          >
            ✉️ <span className="ml-2">ofzenenterprise@gmail.com</span>
          </Link>
          <br />{" "}
          {/* <Link
            href=""
            className="bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg hover:text-black"
          >
            <FaXTwitter />
          </Link> */}
          <Link
            href="https://www.linkedin.com/company/ofzen"
            className="bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg hover:text-blue-500"
          >
            <FaLinkedinIn />
          </Link>
          <Link
            href="https://www.instagram.com/ofzen.dev"
            className="bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg hover:text-pink-700"
          >
            <FaInstagram />
          </Link>
        </div>
      </footer>
    </div>
  );
}
