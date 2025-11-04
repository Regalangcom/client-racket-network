import { notFound } from "next/navigation";
import MatchRegister from "@/components/match/match-register";
import { getAuthServerSession } from "@/lib/auth-options";
import { MatchService } from "@/services/match-service";

export default async function MatchRegisterPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { access_token } = await getAuthServerSession();
  const matchDetail = await MatchService.getMatchById(
    id,
    access_token || undefined
  );

  if (!matchDetail) {
    notFound();
  }

  return (
    <section className="sm:p-8 md:container">
      <MatchRegister
        matchId={matchDetail.id}
        gender_restriction={matchDetail.gender_restriction}
        name_match={matchDetail.name_match}
        location={matchDetail.location}
        match_date={matchDetail.match_date}
        price={matchDetail.price}
        name_club={matchDetail.club.name_club || "Unknown Club"}
      />
    </section>
  );
}
