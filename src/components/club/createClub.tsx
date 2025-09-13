"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const CreateClub: React.FC = () => {
  return (
    <>
      {/* <section className="max-w-full sm:max-w-[70%] pl-9  mx-10 h-32 flex flex-col  bg-background-card py-8 px-8 rounded-xl transition-all"> */}
      <section className="max-w-full sm:max-w-[87%] flex flex-col bg-slate-900 rounded-xl transition-all">
        {/* <p className="text-black font-bold mb-4">Create a Club</p> */}
        <div className="relative">
          <Button className="border-[#174038]  border  w-full text-black hover:bg-background-button-rc hover:text-white bg-background-card pr-10">
            {/* w-full mt-4 border border-gray-400 text-gray-800 bg-transparent hover:bg-gray-100 rounded-lg */}
            Create a Club
          </Button>
        </div>
      </section>
    </>
  );
};

export default CreateClub;
