import { notFound, redirect } from "next/navigation";
import MatchRegister from "@/components/match/match-register";
import { getAuthServerSession } from "@/lib/auth-options";
import { MatchService } from "@/services/match-service";
import { TimeSlot } from "@/constant/types"; // ✅ Import the type

interface PageProps {
  params: { id: string };
  searchParams?: { timeSlotId?: string }; // ✅ Optional if you want to pre-select via URL
}

export default async function MatchRegisterPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = params;
  const timeSlotId = searchParams?.timeSlotId
    ? parseInt(searchParams.timeSlotId)
    : undefined;

  const { access_token } = await getAuthServerSession();

  // Auth guard - redirect unauthenticated users to sign-in
  if (!access_token) {
    redirect(`/sign-in?callbackUrl=/match/${id}/join-match`);
  }

  const matchDetail = await MatchService.getMatchById(
    id,
    access_token || undefined
  );

  if (!matchDetail) {
    notFound();
  }

  const selectedTimeSlot: TimeSlot | undefined = timeSlotId
    ? matchDetail.TimeSlot?.find((slot: TimeSlot) => slot.id === timeSlotId)
    : matchDetail.TimeSlot?.[0]; // Default to first if not specified

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
        selectedTimeSlot={selectedTimeSlot}
        timeSlots={matchDetail.TimeSlot}
      />
    </section>
  );
}
