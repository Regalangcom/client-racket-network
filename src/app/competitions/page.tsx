"use client";

import CompetitionsCard from "../components/Competitions/CompetitionsCard";
import CompetitionFilter from "../components/Competitions/CompetitionsFilter";
import CompetitionsSearch from "../components/Competitions/compSearch";

export default function CompetitionsPage() {
  return (
    <section className="p-4 container-lg ">
      {" "}
      {/* Hapus min-h-screen atau atur ulang */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Sidebar w-1/4 */}
        <div className="w-full sm:w-[27%]   text-white">
          <CompetitionsSearch />
        </div>
        {/* Main Content */}
        <div className="flex-1 p-4 max-w-full ">
          <div className="mb-4 font-semibold">
            {/* filter */}
            <CompetitionFilter />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <CompetitionsCard />
            <CompetitionsCard />
          </div>
        </div>
      </div>
    </section>
  );
}
