import { notFound } from "next/navigation";
import ClubProfileDetails from "@/components/club/club-profile-detail";
import { getAuthServerSession } from "@/lib/auth-options";
import { ClubService } from "@/services/club-services";
export default async function CompetitionDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const session = await getAuthServerSession();
  const access_token = session?.access_token || undefined;

  const clubData = await ClubService.getClubById(id, access_token);
  console.log("data", JSON.stringify(clubData?.logoUrl));

  if (!clubData) return notFound();

  const memberText = `${clubData._count.members} Member${
    clubData._count.members !== 1 ? "s" : ""
  }`;

  // Format rating text
  const ratingText = `${clubData.rating} Rating`;

  return (
    <section className="sm:p-8 mx-auto">
      <ClubProfileDetails
        privacy={clubData.privacy}
        title={clubData.name_club}
        genre={clubData.sport_category}
        member={memberText}
        stars_label={ratingText}
        logoUrl={clubData.logoUrl}
        club={clubData.name_club}
        name_contact={clubData.owner.username}
        contact_avatar={clubData.logoUrl}
      />
    </section>
  );
}
