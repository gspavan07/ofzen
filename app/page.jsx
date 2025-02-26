import Navbar from "./components/Navbar";
import { Window } from "./components/ui/Window";
import { Megrim, Playfair_Display_SC } from "next/font/google";

const megrim = Megrim({
  variable: "--font-megrim",
  weight: "400",
  subsets: ["latin"],
});
const playfair = Playfair_Display_SC({
  variable: "--font-playfair",
  weight: "400",
});

export default function Home() {
  return (
    <div className="relative w-full flex flex-col items-center ">
      <img
        src="/rays_bg.svg"
        alt=""
        className="absolute top-0 right-0 opacity-85 "
      />
      <Navbar />
      <div className="flex flex-col my-32 lg:my-36 justify-center items-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[Megrim]">
          Precision in Design.
        </h1>
        <h1 className="text-[42px] sm:text-6xl lg:text-7xl font-[playfair]">
          Power in Execution {"</>"}
        </h1>
      </div>
      <Window
        className="w-[90%] lg:w-[70%] h-[200px] lg:h-[400px] overflow-hidden rounded-t-[20px] border-0"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      >
        <div className="absolute -top-40 lg:-top-96 -left-40 lg:-left-[450px] blur-[80px] lg:blur-[100px] rounded-full w-[500px] lg:w-[1000px] h-[400px] lg:h-[800px] bg-[#71ebd6] opacity-10" />
      </Window>
      <img
        src="/window.svg"
        alt=""
        className="z-10 w-52 sm:w-40 lg:w-fit h-auto -bottom-10 sm:-bottom-32 lg:-bottom-20 right-10 sm:right-40 lg:right-80 absolute"
      />
    </div>
  );
}
