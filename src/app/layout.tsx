import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/redux/redux-provider";
import { NextAuthProvider } from "./_components/refactor/providers/next-auth-provider";
import { SocketProvider } from "@/providers/socket-provider";

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
  title: "Racquet Corner App",
  description: "develop by DC",
  icons: {
    icon: "/RC01.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${manRope.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextAuthProvider>
          <SocketProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </SocketProvider>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
