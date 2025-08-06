import React from "react";

function OtpLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full h-screen bg-zinc-50 flex flex-col items-center  justify-center px-4">
      {/* <h3 className="text-xl font-semibold mb-4">
        Welcome! Please sign in
      </h3>{" "} */}
      {/* Card yang berisi form */}
      {/* <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"> */}
      {children}
      {/* </div> */}
    </section>
  );
}

export default OtpLayout;
