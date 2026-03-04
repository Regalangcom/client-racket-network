export const dynamic = "force-dynamic";

import Search from "@/app/_components/refactor/search";
// import ClubCardSkeleton from "@/components/club/club-card-skeleton";
import MatchCard from "@/components/match/match";
import { MatchData, MatchFilter } from "@/constant/types";
import { getAuthServerSession } from "@/lib/auth-options";
import { MatchService } from "@/services/match-service";
import { Calendar } from "lucide-react";

export default async function MatchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { access_token } = await getAuthServerSession();

  const filters: MatchFilter = {};
  if (typeof searchParams.gender_restriction === "string") {
    filters.gender_restriction = searchParams.gender_restriction;
  }
  if (typeof searchParams.location === "string") {
    filters.location = searchParams.location;
  }
  if (typeof searchParams.skill_level === "string") {
    filters.skill_level = searchParams.skill_level;
  }
  if (typeof searchParams.search === "string") {
    filters.name = searchParams.search;
  }

  const matches: MatchData[] = await MatchService.getMatches(
    filters,
    access_token || null
  );

  return (
    <section className="p-4 container-lg max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar w-1/4 */}
        {/* xl:w-[20%] */}
        <div className="w-full relative md:max-w-[34%] text-white mb-6">
          <Search />
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
            {matches && matches.length > 0 ? (
              matches.map((match: MatchData) => (
                <MatchCard key={match.id} match={match} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Matches Available
                </h3>
                <p className="text-gray-500 text-center max-w-sm">
                  There are no matches scheduled at the moment. Check back later
                  for upcoming games!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
