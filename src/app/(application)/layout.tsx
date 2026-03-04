import React from "react";
import BottomNavbar from "../_components/refactor/bottom-navbar";
// import Footer from "@/components/footer/footer";
import Navbar from "../_components/refactor/navbar";

function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="min-h-screen flex flex-col bg-white">
        {/* top navbar */}
        <Navbar />

        {/* content page */}
        <main>{children}</main>

        {/* bottom navbar */}
        <BottomNavbar />
      </section>
      {/* <Footer /> */}
    </>
  );
}

export default ApplicationLayout;
