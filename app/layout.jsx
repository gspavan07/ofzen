import "./globals.css";
import { Megrim, Playfair_Display, Marcellus } from "next/font/google";
// Import Google Fonts
const megrim = Megrim({
  variable: "--font-megrim",
  weight: "400",
  subsets: ["latin"],
});
const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: "400",
  subsets: ["latin"],
});
const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ofzen - Grow Digital",
  description:
    "Ofzen specializes in web development, responsive design and digital marketing. We build high-performance websites and online solutions to grow your business.",
  keywords:
    "web development, Next.js development, responsive web design, full-stack development,  social media marketing, digital marketing, e-commerce development, UI/UX design, business website solutions, API integrations, website security",
  openGraph: {
    title: "Ofzen - Grow Digital",
    description:
      "Expert web development and online marketing solutions to help businesses grow.",
    url: "https://ofzen.in",
    siteName: "Ofzen",
    images: [
      {
        url: "https://ofzen.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ofzen Web Development & Digital Marketing",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${megrim.variable} ${playfair.variable} ${marcellus.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
