// app/club/page.tsx
import { getAuthServerSession } from "@/lib/auth-options";

import CreateClub from "../../../components/club/create-club";
import ClubCard from "../../../components/club/club";
import SearchForm from "../../_components/search/search";
import LoginButton from "@/components/club/login-button";
import { ClubResponse } from "@/constant/types";
import ClubCardSkeleton from "@/components/club/club-card-skeleton";

async function getClubs(accessToken: string | null) {
  try {
    // Opsi header jika ada token
    const headers: HeadersInit = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/api/v1/club`,
      { headers, cache: "no-store" } // Tambahkan cache: 'no-store' untuk selalu mendapatkan data terbaru
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch clubs: ${response.statusText}`);
    }

    const data: ClubResponse = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching clubs:", error);
    return [];
  }
}

export default async function ClubPage() {
  const session = await getAuthServerSession();
  const isAuthenticated = !!session?.access_token;

  // Ambil daftar klub dari API
  const clubs = await getClubs(session?.access_token || null);

  return (
    <section className="p-4 container-lg max-w-screen-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Sidebar */}
        <div className="w-full md:w-[26%]">
          <div className="mb-10 font-semibold">
            <p className="text-3xl">Club</p>
            <p className="font-semibold mt-1">
              Join a Club, play together or create your own Club
            </p>
          </div>
          <SearchForm />

          <div className="mt-6 mb-5 md:ml-3 ml:0">
            {isAuthenticated ? (
              // User sudah login - tampilkan tombol create club
              <>
                <p className="text-black mb-2">Create your own club</p>
                <CreateClub />
              </>
            ) : (
              // User belum login - tampilkan pesan untuk login
              <>
                <p className="text-black mb-2">Want to create a club?</p>
                <LoginButton />
              </>
            )}
          </div>
        </div>

        {/* Main Content - Menampilkan daftar klub dari API */}
        <div className="flex-1 max-w-full mt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {clubs && clubs.length > 0 ? (
              clubs.map((club) => <ClubCard key={club.id} club={club} />)
            ) : (
              // Tampilkan placeholder jika belum ada klub atau masih loading
              <>
                <ClubCardSkeleton />
                <ClubCardSkeleton />
                <ClubCardSkeleton />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
