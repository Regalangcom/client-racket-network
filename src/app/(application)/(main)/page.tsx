// =====================================================
// FILE: app/(application)/(main)/page.tsx
// FIXED VERSION with all improvements
// =====================================================

import { Suspense } from "react";
import Notification from "@/components/home/notification/notification";
import PendingPaymentManager from "@/components/home/pending-payment-manager";
import { ActivityFeed } from "@/components/home/activity-feed";
import { NotificationSkeleton } from "@/components/home/home-skeleton";
import { ActivityService } from "@/services/activity-service";
import { getAuthServerSession } from "@/lib/auth-options";

// ✅ ADD: Revalidate every 60 seconds to refresh pending payment status
export const revalidate = 60;

interface PendingPayment {
  order_id: string;
  type: "COMPETITION" | "MATCH";
  event_name: string;
  payment_method: string;
  expires_at: string;
  remaining_seconds: number;
  qrUrl?: string;
  amount: {
    original: number;
    discount: number;
    final: number;
  };
}


async function getPendingPayment(access_token: string): Promise<PendingPayment | null> {
  try {
    // ✅ IMPROVED: Use environment variable with fallback
    const baseUrl = process.env.NEXT_PUBLIC_URL_API!;
    const apiUrl = `${baseUrl}/api/v1/payment/pending`;
    
    console.log("\n========================================");
    console.log("🌐 [SERVER] FETCHING PENDING PAYMENT");
    console.log("========================================");
    console.log("📍 URL:", apiUrl);
    console.log("🔑 Token length:", access_token.length);

    const response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: { revalidate: 0 } // ✅ ADD: Never cache this request
    });

    console.log("\n📥 RESPONSE:");
    console.log("  - Status:", response.status);
    console.log("  - OK:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ ERROR:", errorText);
      console.log("========================================\n");
      return null;
    }

    const result = await response.json();
    console.log("\n✅ PARSED JSON:");
    console.log("  - success:", result.success);
    console.log("  - has data:", !!result.data);

    if (result.success && result.data) {
      console.log("\n✅✅✅ PENDING PAYMENT FOUND!");
      console.log("  - Order ID:", result.data.order_id);
      console.log("  - Amount:", result.data.amount.final);
      console.log("  - Expires:", result.data.expires_at);
      console.log("========================================\n");
      return result.data;
    }
    
    console.log("\nℹ️ NO PENDING PAYMENT");
    console.log("========================================\n");
    return null;

  } catch (error) {
    console.error("\n❌❌❌ FETCH ERROR:");
    console.error(error);
    console.log("========================================\n");
    return null;
  }
}

// Async component for notification - streams with Suspense
async function NotificationSection() {
  const response = await ActivityService.getPublicActivities(undefined, 10);
  const activities = response.data?.activities ?? [];
  const latestJoinActivity = activities.find((a) => a.type === "MEMBER_JOINED");

  if (latestJoinActivity) {
    return (
      <Notification
        type="join"
        username={latestJoinActivity.actor_name || latestJoinActivity.club?.name}
        clubName={latestJoinActivity.club.name}
        message="just joined Racket Network"
      />
    );
  }

  return (
    <Notification
      type="join"
      username="Racket Network"
      message="Welcome to the community!"
    />
  );
}

// Async component for activity feed - streams with Suspense
async function ActivityFeedSection() {
  const response = await ActivityService.getPublicActivities(undefined, 10);
  const activities = response.data?.activities ?? [];
  const pagination = response.data?.pagination ?? {
    hasMore: false,
    nextCursor: null,
  };

  return (
    <ActivityFeed
      initialActivities={activities}
      initialPagination={pagination}
    />
  );
}

// Skeleton fallback for activity feed
function ActivityFeedSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-full h-[280px] bg-gray-200 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}

export default async function Home() {
  console.log("\n🏠 [SERVER] HOME PAGE RENDERING");
  console.log("========================================");

  const session = await getAuthServerSession();

  console.log("🔐 SESSION CHECK:");
  console.log("  - Session exists:", !!session);
  console.log("  - Has access_token:", !!session?.access_token);

  if (session?.access_token) {
    console.log("  - User ID:", session.userId);
  }

  let pendingPayment: PendingPayment | null = null;

  if (session?.access_token) {
    console.log("\n✅ Token available, fetching pending payment...");
    pendingPayment = await getPendingPayment(session.access_token as string);
    console.log("\n🎯 FINAL RESULT:");
    console.log("  - pendingPayment:", !!pendingPayment);
    if (pendingPayment) {
      console.log("  - Order ID:", pendingPayment.order_id);
    }
  } else {
    console.log("\n❌ No token available, skipping fetch");
  }

  console.log("========================================\n");

  return (
    <section className="container-lg min-h-screen mx-auto relative">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[27%] text-white">
          <Suspense fallback={<NotificationSkeleton />}>
            <NotificationSection />
          </Suspense>
        </div>

        <div className="flex-1 md:p-2 max-w-full">
          <Suspense fallback={<ActivityFeedSkeleton />}>
            <ActivityFeedSection />
          </Suspense>
        </div>
      </div>

      {/* FLOATING COUNTDOWN - Will show if pendingPayment exists */}
      <PendingPaymentManager pendingPayment={pendingPayment} />
    </section>
  );
}