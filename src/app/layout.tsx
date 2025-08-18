import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessProvider } from "./components/sess-provider";
import { Toaster } from "@/components/ui/sonner";
import Footer from "./components/footer/footer";

const manRope = localFont({
  src: [
    {
      path: "../app/fonts/Manrope-Regular.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Racket Network app",
  description: "develop by DC",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname(); // Mengambil path sekarang

  // // Tentukan variant berdasarkan pathname
  // let navbarVariant: "default" | "sign-in" | "sign-up" | "match" = "default"; // Default variant

  // if (pathname.includes("sign-in")) {
  //   navbarVariant = "sign-in";
  // } else if (pathname.includes("sign-up")) {
  //   navbarVariant = "sign-up";
  // } else if (pathname.includes("match")) {
  //   navbarVariant = "match";
  // }

  return (
    <html lang="en">
      <head>
        {/* Mengatur favicon dan meta */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${manRope.variable} antialiased`}>
        <SessProvider>{children}</SessProvider>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
