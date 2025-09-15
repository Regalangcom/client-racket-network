"use client";

import SearchForm from "../../components/search/search";
import MatchCard from "@/components/match/match";
import { useWindowDimension } from "@/hooks/useWindowdimension";

export default function MatchPage() {
  const { isLaptop } = useWindowDimension();
  console.log("laptop", isLaptop);
  //
  return (
    <section className="p-4 container-lg max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar w-1/4 */}
        {/* xl:w-[20%] */}
        <div className="w-full relative md:w-[34%] text-white">
          {/* <div className=" w-full  md:w-[26%]  text-white"> */}
          <SearchForm />
        </div>
        {/* Main Content */}
        <div className="flex-1 max-w-full">
          <div className="mb-4 font-semibold">
            <p className="text-3xl">Join a match</p>
            <p className="font-semibold mt-1">
              Compete against other players of your level in your area
            </p>
          </div>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-[18px]`}
          >
            <MatchCard />
            <MatchCard />
            <MatchCard />
            <MatchCard />
            <MatchCard />
            <MatchCard />
          </div>
        </div>
      </div>
    </section>
  );
}
