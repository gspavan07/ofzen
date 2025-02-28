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
  title: "OfZen",
  description: "where simplicity meets creativity",
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
