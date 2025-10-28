// app/club/[id]/page.tsx
import { notFound } from "next/navigation";
import ClubProfileDetail from "@/components/club/club-profile-detail";
import { getAuthServerSession } from "@/lib/auth-options";
import { ClubService, JoinRequestItem } from "@/services/club-services";

/**
 * Helper function to decode JWT and extract user ID
 */
function getUserIdFromToken(token: string): number | undefined {
  try {
    const payload = token.split(".")[1];
    if (!payload) return undefined;

    const decoded = JSON.parse(Buffer.from(payload, "base64").toString());

    // Common JWT property names for user ID
    return decoded.id || decoded.userId || decoded.user_id || decoded.sub;
  } catch (error) {
    console.error("Error decoding token:", error);
    return undefined;
  }
}

/**
 * Club Detail Page - Server Component
 * Responsibilities:
 * 1. Fetch club data
 * 2. Determine ownership
 * 3. Fetch join requests (if owner)
 * 4. Pass data to client components
 */
export default async function ClubDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Get session & token
  const session = await getAuthServerSession();
  const accessToken = session?.access_token || undefined;

  // Fetch club data
  const clubData = await ClubService.getClubById(id, accessToken);

  if (!clubData) return notFound();

  // Extract user ID from token
  let userId: number | undefined;
  let isOwner = false;

  if (accessToken) {
    userId = getUserIdFromToken(accessToken);
    isOwner = userId === clubData.owner_id;
  }

  // Format display texts
  const memberText = `${clubData._count.members} Member${
    clubData._count.members !== 1 ? "s" : ""
  }`;
  const ratingText = `${clubData.rating} Rating`;

  let userJoinStatus: {
    isMember: boolean;
    requestStatus: "PENDING" | "APPROVED" | "REJECTED" | null;
  } = { isMember: false, requestStatus: null };

  if (!isOwner && accessToken) {
    userJoinStatus = await ClubService.getJoinStatus(id, accessToken);
  }

  // Fetch join requests ONLY if user is owner
  let joinRequests: JoinRequestItem[] = [];
  if (isOwner && accessToken) {
    joinRequests = await ClubService.getClubJoinRequests(id, accessToken);
  }

  // Pass all data to client component
  return (
    <section className="sm:p-8 mx-auto">
      <ClubProfileDetail
        id={id}
        title={clubData.name_club}
        logoUrl={clubData.logoUrl}
        club={clubData.name_club}
        genre={clubData.sport_category}
        member={memberText}
        location={clubData.location}
        home_court={clubData.home_court}
        stars_label={ratingText}
        privacy={clubData.privacy}
        name_contact={clubData.owner.username}
        contact_avatar={clubData.logoUrl}
        owner_id={clubData.owner_id}
        accessToken={accessToken}
        phone_number={clubData.owner?.phone_number}
        isOwner={isOwner}
        userId={userId}
        userJoinStatus={userJoinStatus}
        // Join requests (for owner)
        joinRequests={joinRequests}
      />
    </section>
  );
}
