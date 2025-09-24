import { notFound } from "next/navigation";
import { getCompData } from "@/constant/get-all-dummy-data";
import CompetitionsDetails from "@/components/Competitions/CompetitionsDetail";
export default async function CompetitionDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const competitions = await getCompData(id);

  if (!competitions) return notFound();

  return (
    <section className="sm:p-8 w-full container-lg mx-auto">
      <CompetitionsDetails
        title={competitions.title}
        logo={competitions.logo}
        date={competitions.date}
        location={competitions.location}
        price={competitions.price}
        club={competitions.club}
        description={competitions.description}
        name_contact={competitions.name_contact}
        organized={competitions.organized}
        contact_avatar={competitions.contact_avatar}
      />
    </section>
  );
}
