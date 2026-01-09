// =====================================================
// FILE: app/(application)/(main)/page.tsx
// FIXED VERSION with all improvements
// =====================================================

import { Match } from "@/constant/types/match";
import { sampeImage } from "@/public";
import Notification from "@/components/home/notification/notification";
import HomeCard from "@/components/home/card-home";
import PendingPaymentManager from "@/components/home/pending-payment-manager";
import { getAuthServerSession } from "@/lib/auth-options";

// ✅ ADD: Revalidate every 60 seconds to refresh pending payment status
export const revalidate = 60;

interface PendingPayment {
  order_id: string;
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

  const matches: Match[] = [
    {
      id: "1",
      clubName: "Supreme TC",
      title: "Tennis Thursday Night",
      date: "30 April, 18:00 - 21:00",
      location: "Smes Sport Bintaro",
      status: "ongoing",
      imageUrl: sampeImage,
    },
  ];

  return (
    <section className="container-lg min-h-screen mx-auto relative">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[27%] text-white">
          <Notification
            type="join"
            username="Padel Cihuy"
            message="just joined Racket Network"
          />
        </div>

        <div className="flex-1 md:p-2 max-w-full">
          {/* ✅ DEBUG BOX - Only show in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-gray-300 from-purple-900 to-blue-900 border-4 border-yellow-400 text-white p-6 rounded-lg mb-4">
              <p className="text-2xl font-bold mb-4">🔍 SERVER DEBUG</p>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span>Session:</span>
                  <span className={`font-bold px-4 py-2 rounded ${session ? "bg-green-500" : "bg-red-500"}`}>
                    {session ? "✅ EXISTS" : "❌ NULL"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Token:</span>
                  <span className={`font-bold px-4 py-2 rounded ${session?.access_token ? "bg-green-500" : "bg-red-500"}`}>
                    {session?.access_token ? "✅ EXISTS" : "❌ NULL"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Pending Payment:</span>
                  <span className={`font-bold px-4 py-2 rounded text-2xl ${pendingPayment ? "bg-green-500" : "bg-red-500"}`}>
                    {pendingPayment ? "✅ EXISTS" : "❌ NULL"}
                  </span>
                </div>
              </div>

              {/* {session?.access_token && (
                <div className="mt-4 p-4 bg-white/10 rounded">
                  <p className="font-bold">User Info:</p>
                  <p className="text-sm">ID: {session.userId}</p>
                </div>
              )} */}

              {/* {pendingPayment && (
                <div className="mt-4 p-4 bg-green-500/20 border-2 border-green-400 rounded">
                  <p className="font-bold text-2xl mb-2">✅ PENDING PAYMENT DATA:</p>
                  <p>Order ID: <span className="font-mono">{pendingPayment.order_id}</span></p>
                  <p>Amount: <span className="font-bold">Rp {pendingPayment.amount.final.toLocaleString("id-ID")}</span></p>
                  <p>Expires: {new Date(pendingPayment.expires_at).toLocaleString()}</p>
                </div>
              )} */}

            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {matches.map((match) => (
              <HomeCard key={match.id} {...match} />
            ))}
          </div>
        </div>
      </div>

      {/* ✅ FLOATING COUNTDOWN - Will show if pendingPayment exists */}
      <PendingPaymentManager pendingPayment={pendingPayment} />
    </section>
  );
}