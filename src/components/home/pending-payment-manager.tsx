'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'; // ✅ Use next-auth client hook
import FloatingCountdown from './notification/floating-time-payments';

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

interface PendingPaymentManagerProps {
  pendingPayment?: PendingPayment | null; // ✅ Make optional
}

export default function PendingPaymentManager({ 
  pendingPayment: serverPayment 
}: PendingPaymentManagerProps) {
  const [pendingPayment, setPendingPayment] = useState<PendingPayment | null>(
    serverPayment || null
  );
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(!serverPayment);
  
  const { data: session } = useSession(); // ✅ Get client-side session

  useEffect(() => {
    // ✅ If no server data, fetch from client
    if (!serverPayment && session?.access_token) {
      fetchPendingPayment();
    }
  }, [serverPayment, session]);

  const fetchPendingPayment = async () => {
    if (!session?.access_token) {
      console.log("❌ No session token");
      setIsLoading(false);
      return;
    }

    try {
      console.log("🔄 [CLIENT] Fetching pending payment...");
      
      const response = await fetch('/api/v1/payment/pending', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      console.log("📥 Response:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Result:", result);

      if (result.success && result.data) {
        setPendingPayment(result.data);
      } else {
        setPendingPayment(null);
      }

    } catch (error) {
      console.error("❌ Fetch error:", error);
      setPendingPayment(null);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("\n🎨 [CLIENT] PendingPaymentManager rendered");
  console.log("  - serverPayment:", serverPayment);
  console.log("  - pendingPayment:", pendingPayment);
  console.log("  - isVisible:", isVisible);
  console.log("  - isLoading:", isLoading);

  if (isLoading) {
    console.log("⏳ Loading...");
    return null;
  }

  if (!pendingPayment || !isVisible) {
    console.log("ℹ️ Not showing countdown");
    return null;
  }

  const targetTime = new Date(pendingPayment.expires_at).getTime();

  if (isNaN(targetTime) || targetTime <= Date.now()) {
    console.log("⚠️ Invalid or expired time");
    return null;
  }

  // Calculate original duration from remaining_seconds (convert to ms)
  // This preserves the progress bar state across page navigations/remounts
  const originalDuration = pendingPayment.remaining_seconds * 1000;

  console.log("✅ Showing FloatingCountdown");

  return (
    <FloatingCountdown
      id={`payment-${pendingPayment.order_id}`}
      targetTime={targetTime}
      originalDuration={originalDuration}
      message="⏳ Selesaikan pembayaran Anda"
      paymentUrl={`/qris?orderId=${pendingPayment.order_id}`}
      onComplete={() => setIsVisible(false)}
      onClose={() => setIsVisible(false)}
      position="bottom-right"
    />
  );
}