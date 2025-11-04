import { notFound } from "next/navigation";
import MatchDetailCard from "@/components/match/match-detail-card";
import { getAuthServerSession } from "@/lib/auth-options";
import { MatchService } from "@/services/match-service";

export default async function MatchDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { access_token } = await getAuthServerSession();

  const matchData = await MatchService.getMatchById(
    id,
    access_token || undefined
  );

  console.log("match data", matchData);

  if (!matchData) return notFound();

  return (
    <section className="sm:p-8 md:container-lg">
      <MatchDetailCard
        id={matchData.id}
        name_match={matchData.name_match}
        bannerUrl={matchData.bannerUrl}
        match_date={matchData.match_date}
        TimeSlot={matchData.TimeSlot || []}
        location={matchData.location}
        price={matchData.price}
        name_club={matchData.club?.name_club}
        gender_restriction={matchData.gender_restriction}
        description={matchData.description}
      />
    </section>
  );
}
