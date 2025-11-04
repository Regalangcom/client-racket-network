import { notFound } from "next/navigation";
import CompetitionsDetails from "@/components/competitions/competitions-detail";
import { getAuthServerSession } from "@/lib/auth-options";
import { CompetitionsService } from "@/services/comp-services";
export default async function CompetitionDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { access_token } = await getAuthServerSession();

  const detailCompetitions = await CompetitionsService.getCompetitionsById(
    id,
    access_token || undefined
  );
  console.log("comps", detailCompetitions);

  // const competitions = await getCompData(id);

  if (!detailCompetitions) return notFound();

  return (
    <section className="sm:p-8 w-full container-lg mx-auto">
      <CompetitionsDetails
        id={detailCompetitions.id}
        name_comp={detailCompetitions.name_comp}
        club={detailCompetitions.club}
        host={detailCompetitions.host}
        organizer_name={detailCompetitions.organizer_name}
        competitions_date={detailCompetitions.competitions_date}
        description={detailCompetitions.description}
        logo={detailCompetitions.logo}
        location={detailCompetitions.location}
        price={detailCompetitions.price}
        bannerUrl={detailCompetitions.bannerUrl}
      />
    </section>
  );
}
