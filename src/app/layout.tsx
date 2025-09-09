import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessProvider } from "./components/sess-provider";
import { Toaster } from "@/components/ui/sonner";
import Footer from "./components/footer/footer";
import ReduxProvider from "@/redux/redux-provider";
import Navbar from "./components/navbar/navbar";

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
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${manRope.variable} antialiased`}>
        <SessProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </SessProvider>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
