// // app/club/[id]/page.tsx
// import { notFound } from "next/navigation";
// import ClubProfileDetails from "@/components/club/club-profile-detail";
// import { getAuthServerSession } from "@/lib/auth-options";
// import { ClubService, JoinRequestItem } from "@/services/club-services";

// // ✅ Helper function to decode JWT and get user id
// function getUserIdFromToken(token: string): number | undefined {
//   try {
//     // JWT structure: header.payload.signature
//     const payload = token.split(".")[1];
//     if (!payload) return undefined;

//     // Decode base64
//     const decoded = JSON.parse(Buffer.from(payload, "base64").toString());

//     // Return user id (adjust property name based on your JWT structure)
//     // Common property names: id, userId, user_id, sub
//     return decoded.id || decoded.userId || decoded.user_id || decoded.sub;
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return undefined;
//   }
// }

// export default async function CompetitionDetails({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const { id } = params;
//   const session = await getAuthServerSession();
//   const access_token = session?.access_token || undefined;

//   // Fetch club data
//   const clubData = await ClubService.getClubById(id, access_token);

//   console.log("Club data:", JSON.stringify(clubData?.logoUrl));

//   if (!clubData) return notFound();

//   // ✅ Extract user ID from token
//   let userId: number | undefined;
//   let isOwner;

//   if (access_token) {
//     userId = getUserIdFromToken(access_token);
//     isOwner = userId === clubData.owner_id;
//   }

//   // Format member text
//   const memberText = `${clubData._count.members} Member${
//     clubData._count.members !== 1 ? "s" : ""
//   }`;

//   // Format rating text
//   const ratingText = `${clubData.rating} Rating`;

//   // ✅ FIXED: Explicit type for joinRequests
//   let joinRequests: JoinRequestItem[] = [];
//   if (!isOwner && access_token) {
//     joinRequests = await ClubService.getClubJoinRequests(id, access_token);
//   }

//   return (
//     <section className="sm:p-8 mx-auto">
//       <ClubProfileDetails
//         // Existing props
//         privacy={clubData.privacy}
//         id={id}
//         title={clubData.name_club}
//         genre={clubData.sport_category}
//         member={memberText}
//         stars_label={ratingText}
//         logoUrl={clubData.logoUrl}
//         club={clubData.name_club}
//         name_contact={clubData.owner.username}
//         contact_avatar={clubData.logoUrl}
//         owner_id={clubData.owner_id}
//         accessToken={access_token}
//         // isOwner={isOwner}
//         userId={userId}
//         joinRequests={joinRequests}
//       />
//     </section>
//   );
// }

// app/club/[id]/page.tsx
import { notFound } from "next/navigation";
import ClubProfileDetails from "@/components/club/club-profile-detail";
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
      <ClubProfileDetails
        // Club data
        id={id}
        title={clubData.name_club}
        logoUrl={clubData.logoUrl}
        club={clubData.name_club}
        genre={clubData.sport_category}
        member={memberText}
        stars_label={ratingText}
        privacy={clubData.privacy}
        name_contact={clubData.owner.username}
        contact_avatar={clubData.logoUrl}
        owner_id={clubData.owner_id}
        accessToken={accessToken}
        isOwner={isOwner}
        userId={userId}
        userJoinStatus={userJoinStatus}
        // Join requests (for owner)
        joinRequests={joinRequests}
      />
    </section>
  );
}
