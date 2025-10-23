import { getAuthServerSession } from "@/lib/auth-options";
import CreateClub from "@/components/club/create-club";
import ClubCard from "@/components/club/club";
import SearchForm from "@/app/_components/search/search";
import LoginButton from "@/components/club/login-button";
import ClubCardSkeleton from "@/components/club/club-card-skeleton";
import { ClubService } from "@/services/club-services";
import { ClubData } from "@/constant/types";

export default async function ClubPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getAuthServerSession();
  const isAuthenticated = !!session?.access_token;

  const sport_category = searchParams.sport_category as string | undefined;
  const location = searchParams.location as string | undefined;
  const gender_rule = searchParams.gender_rule as string | undefined;

  const allClubs: ClubData[] = await ClubService.getClubs(
    {},
    session?.access_token || null
  );

  // Filter di client sesuai parameter yang ada
  let clubs = allClubs;

  // Apply sport_category filter
  if (sport_category) {
    clubs = clubs.filter(
      (club) =>
        club.sport_category.toLowerCase() === sport_category.toLowerCase()
    );
  }

  // Apply location filter
  if (location) {
    clubs = clubs.filter(
      (club) => club.location.toLowerCase() === location.toLowerCase()
    );
  }

  // Apply gender_rule filter
  if (gender_rule) {
    clubs = clubs.filter(
      (club) => club.gender_rule.toLowerCase() === gender_rule.toLowerCase()
    );
  }

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
          <SearchForm
            initialSport={sport_category}
            initialLocation={location}
            initialGender={gender_rule}
          />

          <div className="mt-6 mb-5 md:ml-3 ml:0">
            {isAuthenticated ? (
              <>
                <p className="text-black mb-2">Create your own club</p>
                <CreateClub access_token={session.access_token} />
              </>
            ) : (
              <>
                <p className="text-black mb-2">create a club ?</p>
                <LoginButton />
              </>
            )}
          </div>
        </div>

        {/* Main Content - Menampilkan daftar klub dari API */}
        <div className="flex-1 max-w-full mt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {clubs && clubs.length > 0 ? (
              clubs.map((club: ClubData) => (
                <ClubCard key={club.id} club={club} />
              ))
            ) : (
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
