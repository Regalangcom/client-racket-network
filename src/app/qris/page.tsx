// ✅ NO "use client" - This is Server Component
import { notFound, redirect } from "next/navigation";
import { getAuthServerSession } from "@/lib/auth-options";
import QrisClient from "@/components/qris/qris-client";
import { PaymentService } from "@/services/payment-services";

interface PageProps {
  searchParams: { orderId?: string };
}

export default async function QrisPage({ searchParams }: PageProps) {
  const orderId = searchParams.orderId;

  if (!orderId) {
    redirect("/competitions");
  }

  const { access_token } = await getAuthServerSession();

  if (!access_token) {
    redirect("/sign-in");
  }

  try {
    // ✅ Call server service
    const paymentData = await PaymentService.getDetailPayment(
      orderId,
      access_token
    );

    if (!paymentData) {
      notFound();
    }

    return <QrisClient paymentData={paymentData} orderId={orderId} />;
  } catch (error) {
    console.error("Error loading payment:", error);
    notFound();
  }
}