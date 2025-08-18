"use client";

import SearchForm from "../components/search/search";
import MatchCard from "../components/match/match";

export default function MatchPage() {
  return (
    <section className="p-4 container-lg ">
      {" "}
      {/* Hapus min-h-screen atau atur ulang */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Sidebar w-1/4 */}
        <div className="w-full sm:w-[27%]   text-white">
          <SearchForm />
        </div>
        {/* Main Content */}
        <div className="flex-1 p-4 max-w-full ">
          <div className="mb-4 font-semibold">
            <p className="text-3xl">Join a match</p>
            <p className="font-semibold mt-1">
              Compete against other players of your level in your area
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
