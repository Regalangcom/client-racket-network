"use client";

import CreateClub from "../../components/club/createClub";
import ClubCard from "../../components/club/club";
import SearchForm from "../../components/search/search";

export default function ClubPage() {
  return (
    <section className="p-4 container-lg max-w-screen-2xl mx-auto ">
      {" "}
      {/* Hapus min-h-screen atau atur ulang */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Sidebar w-full sm:w-[27%] */}
        <div className=" w-full  md:w-[26%]    text-white">
          <SearchForm />
          <div className="mt-6">
            <CreateClub />
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-4 max-w-full ">
          <div className="mb-4 font-semibold">
            <p className="text-3xl">Club</p>
            <p className="font-semibold mt-1">
              Join a club, play together or create your own club
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <ClubCard />
            <ClubCard />
            <ClubCard />
          </div>
        </div>
      </div>
    </section>
  );
}
