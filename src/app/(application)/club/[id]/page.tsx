import { notFound } from "next/navigation";
import { getProfileClubData } from "@/constant/getMatchData";
import ClubProfileDetails from "@/components/club/clubProfileDetail";
export default async function CompetitionDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const club = await getProfileClubData(id);

  if (!club) return notFound();

  return (
    <section className="sm:p-8 mx-auto">
      <ClubProfileDetails
        title={club.title}
        genre={club.genre}
        member={club.member}
        stars_label={club.stars_label}
        logo={club.logo}
        club={club.club}
        name_contact={club.name_contact}
        contact_avatar={club.contact_avatar}
      />
    </section>
  );
}
