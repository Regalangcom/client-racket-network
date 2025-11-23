"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import displayIDRCurrency from "@/utils/currency";
import ExpireTimer from "@/components/ui/expires-At";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { resetQrString } from "@/redux/store/payment-slice";
import Link from "next/link";

export default function PageQris() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  // redux
  const qrString = useSelector((state: RootState) => state.payment.qrString);

  const [paymentData, setPaymentData] = useState<any>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;

    async function loadPayment() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/v1/payment/process/${orderId}`
        );

        const json = await res.json();

        if (json.success) {
          setPaymentData(json.data);
          setExpiresAt(json.data.expired_at);
        }
      } catch (err) {
        console.error("Error fetching payment:", err);
      }
    }

    loadPayment();
  }, [orderId]);

  const handleExpiration = () => {
    dispatch(resetQrString());
    router.push("/competitions");
  };

  const formattedAmount = paymentData
    ? displayIDRCurrency(paymentData.gross_amount)
    : displayIDRCurrency(0);

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
        <div className="mb-0">
          {/* expired time */}
          {expiresAt && (
            <ExpireTimer expiresAt={expiresAt} onExpire={handleExpiration} />
          )}
        </div>
        {/* Order Details */}
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold">{formattedAmount}</p>
          <p className="text-sm text-gray-500">Order ID #{orderId}</p>

          {/* Countdown dari API */}
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center">
          {qrString && (
            <Image
              src={qrString}
              alt="QRIS"
              width={240}
              height={240}
              className="mx-auto"
            />
          )}

          <Link href="" className="text-blue-700 underline">
            Download Qris
          </Link>
        </div>

        <div className="border-t border-gray-300 py-3">
          <div className="space-y-4">
            {/* <Button className="w-full py-4 md:py-6 bg-background-button-rc hover:bg-white hover:text-black text-white rounded-md">
              Download QRIS
            </Button> */}
            <Button className="w-full py-4 md:py-6 bg-background-button-rc hover:bg-white hover:text-black text-white rounded-md">
              Cancel Payment
            </Button>

            <Button className="w-full md:py-6 border-2 bg-white text-black hover:bg-background-button-rc hover:text-white rounded-md">
              Check status
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
