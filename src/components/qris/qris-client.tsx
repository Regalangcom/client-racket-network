"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoveLeft, Wifi, WifiOff } from "lucide-react";
import displayIDRCurrency from "@/utils/currency";
import ExpireTimer from "@/components/ui/expires-At";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { setQrString, resetQrString } from "@/redux/store/payment-slice";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePaymentSocket } from "@/hooks/usePaymentSocket";
import { toast } from "sonner";

interface QrisClientProps {
  paymentData: {
    gross_amount?: number;
    final_amount?: number;
    expired_at?: string;
    expires_at?: string;
    qrUrl?: string;
    qr_string?: string;
  };
  orderId: string;
  paymentType?: "MATCH" | "COMPETITION";
}

export default function QrisClient({
  paymentData,
  orderId,
  paymentType = "COMPETITION",
}: QrisClientProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { status } = useSession();

  const isAuthenticated = status === "authenticated";
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Determine redirect URL based on payment type
  const redirectUrl = paymentType === "MATCH" ? "/match" : "/competitions";

  // Redux - check if QR string already stored
  const qrString = useSelector((state: RootState) => state.payment.qrString);

  // WebSocket integration for authenticated users
  const { isConnected } = usePaymentSocket({
    orderId,
    onSuccess: () => {
      setPaymentCompleted(true);
      dispatch(resetQrString());
      // Clear guest email from localStorage if exists
      localStorage.removeItem("guest_payment_email");
    },
    onExpired: () => {
      toast.error("Payment expired");
      dispatch(resetQrString());
      router.push(redirectUrl);
    },
    onCancelled: () => {
      toast.error("Payment cancelled");
      dispatch(resetQrString());
      router.push(redirectUrl);
    },
  });

  // Store QR string to Redux on mount
  useEffect(() => {
    const qrUrl = paymentData.qrUrl || paymentData.qr_string;
    if (qrUrl && !qrString) {
      dispatch(setQrString(qrUrl));
    }
  }, [paymentData, qrString, dispatch]);

  // Check payment status function (polling)
  const checkPaymentStatus = useCallback(async () => {
    if (paymentCompleted) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/webhook/payment-status/${orderId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        }
      );

      if (!response.ok) return;

      const data = await response.json();
      const transactionStatus = data?.data?.midtrans_status?.transaction_status;
      const paymentStatus = data?.data?.payment?.registration?.payment_status;

      // Redirect if payment is successful
      if (transactionStatus === "settlement" || paymentStatus === "PAID") {
        setPaymentCompleted(true);
        dispatch(resetQrString());
        // Clear guest email from localStorage
        localStorage.removeItem("guest_payment_email");
        router.push(`/payment/status?order_id=${orderId}`);
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
  }, [orderId, dispatch, router, paymentCompleted]);

  // Poll payment status every 5 seconds (skip if WebSocket is connected for authenticated users)
  useEffect(() => {
    // Skip polling if WebSocket is connected (authenticated user with active connection)
    if (isAuthenticated && isConnected) {
      console.log("[QRIS] Skipping polling - WebSocket connected");
      return;
    }

    console.log("[QRIS] Starting payment status polling");
    const interval = setInterval(() => {
      checkPaymentStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [checkPaymentStatus, isAuthenticated, isConnected]);

  const handleExpiration = () => {
    dispatch(resetQrString());
    localStorage.removeItem("guest_payment_email");
    router.push(redirectUrl);
  };

  const handleCancelPayment = () => {
    dispatch(resetQrString());
    localStorage.removeItem("guest_payment_email");
    router.push(redirectUrl);
  };

  const expiresAt = paymentData.expired_at || paymentData.expires_at;
  const amount = paymentData.gross_amount || paymentData.final_amount || 0;
  const formattedAmount = displayIDRCurrency(amount);
  const qrCodeUrl = qrString || paymentData.qrUrl || paymentData.qr_string;

  return (
    <div className="min-h-screen flex md:justify-center md:items-center px-4">
      <div className="w-full max-w-xl space-y-14">
        <div className="flex mt-5 justify-start lg:justify-start lg:items-start">
          <MoveLeft
            className="h-6 w-6 cursor-pointer text-gray-700 ml-2 mt-1 lg:hidden"
            onClick={() => router.back()}
          />
          <p className="lg:text-3xl text-2xl font-bold px-4">
            Payment Confirmation
          </p>
        </div>

        {/* Connection status indicator for authenticated users */}
        {isAuthenticated && (
          <div className={`flex items-center gap-2 text-sm ${isConnected ? 'text-green-600' : 'text-yellow-600'}`}>
            {isConnected ? (
              <>
                <Wifi className="h-4 w-4" />
                <span>Real-time updates active</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4" />
                <span>Checking status periodically...</span>
              </>
            )}
          </div>
        )}

        <div className="mb-0">
          {expiresAt && (
            <ExpireTimer expiresAt={expiresAt} onExpire={handleExpiration} />
          )}
        </div>

        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold">{formattedAmount}</p>
          <p className="text-sm text-gray-500">Order ID #{orderId}</p>
        </div>

        <div className="flex flex-col items-center">
          {qrCodeUrl ? (
            <>
              <Image
                src={qrCodeUrl}
                alt="QRIS"
                width={240}
                height={240}
                className="mx-auto"
                priority
              />
              <Link
                href={qrCodeUrl}
                download
                target="_blank"
                className="text-blue-700 underline mt-2"
              >
                Download QRIS
              </Link>
            </>
          ) : (
            <div className="w-60 h-60 bg-gray-100 flex items-center justify-center rounded-lg">
              <p className="text-gray-500">QR Code not available</p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-300 py-3">
          <div className="space-y-4">
            <Button
              onClick={handleCancelPayment}
              className="w-full py-4 md:py-6 bg-background-button-rc hover:bg-white hover:text-black text-white rounded-md"
            >
              Cancel Payment
            </Button>

            <Button
              onClick={checkPaymentStatus}
              className="w-full md:py-6 border-2 bg-white text-black hover:bg-background-button-rc hover:text-white rounded-md"
            >
              Check Status
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}