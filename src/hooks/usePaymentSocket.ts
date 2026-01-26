"use client";

import { useEffect, useRef } from "react";
import { useSocket } from "@/providers/socket-provider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PaymentSocketOptions {
  orderId: string;
  onPending?: () => void;
  onSuccess?: () => void;
  onExpired?: () => void;
  onCancelled?: () => void;
}

export function usePaymentSocket({
  orderId,
  onPending,
  onSuccess,
  onExpired,
  onCancelled,
}: PaymentSocketOptions) {
  const { socket, isConnected, isAuthenticated } = useSocket();
  const router = useRouter();
  const hasJoinedRoom = useRef(false);

  // Payment WebSocket only works for authenticated users
  const isActive = isConnected && isAuthenticated;

  useEffect(() => {
    // Payment events require authentication
    if (!socket || !isConnected || !isAuthenticated || !orderId) {
      hasJoinedRoom.current = false;
      return;
    }

    // Join payment room for this order
    if (!hasJoinedRoom.current) {
      socket.emit("payment:join", { orderId });
      hasJoinedRoom.current = true;
      console.log("[PaymentSocket] Joined room for order:", orderId);
    }

    const handlePending = (data: { orderId: string; expireTime?: string }) => {
      if (data.orderId === orderId) {
        console.log("[PaymentSocket] Payment pending:", data);
        onPending?.();
      }
    };

    const handleSuccess = (data: { orderId: string; transactionId?: string }) => {
      if (data.orderId === orderId) {
        console.log("[PaymentSocket] Payment success:", data);
        toast.success("Payment successful!");
        onSuccess?.();
        router.push(`/payment/status?order_id=${orderId}`);
      }
    };

    const handleExpired = (data: { orderId: string }) => {
      if (data.orderId === orderId) {
        console.log("[PaymentSocket] Payment expired:", data);
        toast.error("Payment expired");
        onExpired?.();
      }
    };

    const handleCancelled = (data: { orderId: string }) => {
      if (data.orderId === orderId) {
        console.log("[PaymentSocket] Payment cancelled:", data);
        toast.error("Payment cancelled");
        onCancelled?.();
      }
    };

    socket.on("payment:pending", handlePending);
    socket.on("payment:success", handleSuccess);
    socket.on("payment:expired", handleExpired);
    socket.on("payment:cancelled", handleCancelled);

    return () => {
      socket.emit("payment:leave", { orderId });
      socket.off("payment:pending", handlePending);
      socket.off("payment:success", handleSuccess);
      socket.off("payment:expired", handleExpired);
      socket.off("payment:cancelled", handleCancelled);
      hasJoinedRoom.current = false;
      console.log("[PaymentSocket] Left room for order:", orderId);
    };
  }, [socket, isConnected, isAuthenticated, orderId, onPending, onSuccess, onExpired, onCancelled, router]);

  return { isConnected: isActive };
}