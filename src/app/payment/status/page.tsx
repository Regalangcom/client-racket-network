import { checkFill, xCircleFill } from "@/public";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PaymentService } from "@/services/payment-services";
import { Loader2 } from "lucide-react";

interface PageProps {
  searchParams: { order_id?: string };
}

export default async function StatusPage({ searchParams }: PageProps) {
  const orderId = searchParams.order_id;

  if (!orderId) {
    redirect("/");
  }

  let statusData;
  let error = false;

  try {
    statusData = await PaymentService.getPaymentStatus(orderId);
  } catch (err) {
    error = true;
  }

  const transactionStatus =
    statusData?.data?.midtrans_status?.transaction_status;
  const paymentStatus = statusData?.data?.payment?.registration?.payment_status;

  // Determine payment type from response or order_id prefix
  const paymentType =
    statusData?.data?.type ||
    (orderId.startsWith("MATCH-") ? "MATCH" : "COMPETITION");
  const redirectUrl = paymentType === "MATCH" ? "/match" : "/competitions";

  const isSuccess =
    transactionStatus === "settlement" || paymentStatus === "PAID";
  const isFailed =
    ["expire", "cancel", "deny"].includes(transactionStatus || "") ||
    paymentStatus === "FAILED" ||
    paymentStatus === "EXPIRED" ||
    error;
  const isPending =
    transactionStatus === "pending" || paymentStatus === "PENDING";

  return (
    <div className="min-h-screen flex md:justify-center md:items-center px-4">
      <div className="w-full max-w-xl space-y-14">
        <div className="flex mt-5 justify-start lg:justify-start lg:items-start">
          {/* <p className="lg:text-3xl text-2xl font-bold px-4">Payment Status</p> */}
        </div>

        <div className="flex flex-col items-center">
          {isSuccess && (
            <>
              <Image
                src={checkFill}
                alt="Payment Success"
                width={140}
                height={140}
                className="mx-auto"
                priority
              />
              <p className="text-2xl font-bold mt-6">Payment Successful!</p>
              <p className="text-xl text-gray-700 mt-3 text-center">
                Please check your email or profile for the ticket
              </p>
            </>
          )}

          {isFailed && (
            <>
              <Image
                src={xCircleFill}
                alt="Payment Failed"
                width={140}
                height={140}
                className="mx-auto"
                priority
              />
              <p className="text-2xl font-bold mt-6 text-red-500">
                Payment Failed
              </p>
              <p className="text-xl text-gray-700 mt-3 text-center">
                Your payment could not be processed. Please try again.
              </p>
            </>
          )}

          {isPending && !isSuccess && !isFailed && (
            <>
              <Loader2 className="h-32 w-32 animate-spin text-green-rc" />
              <p className="text-2xl font-bold mt-6">Processing Payment...</p>
              <p className="text-xl text-gray-700 mt-3 text-center">
                Please wait while we verify your payment
              </p>
            </>
          )}
        </div>

        <div className="border-t border-gray-300 py-3">
          <div className="space-y-4">
            {isSuccess && (
              <Link href={redirectUrl}>
                <Button className="w-full py-4 md:py-6 bg-background-button-rc hover:text-black text-white rounded-md text-[#E1FFA0]">
                  Okay
                </Button>
              </Link>
            )}

            {isFailed && (
              <Link href={redirectUrl}>
                <Button className="w-full py-4 md:py-6 bg-red-500 hover:bg-red-600 text-white rounded-md">
                  Try Again
                </Button>
              </Link>
            )}

            {isPending && !isSuccess && !isFailed && (
              <Button
                className="w-full py-4 md:py-6 bg-gray-400 text-white rounded-md cursor-not-allowed"
                disabled
              >
                Waiting for payment...
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
