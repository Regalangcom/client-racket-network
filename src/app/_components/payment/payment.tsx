"use client";

import { ChevronRight, MoveLeft } from "lucide-react";
import { qris } from "@/public";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { PaymentService } from "@/services/payment-services";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { setOrderId, setQrString } from "@/redux/store/payment-slice";
import { toast } from "sonner";
import { useEffect, useState } from "react";

// Data Payment Methods
const paymentMethods = {
  qrcode: [{ name: "qris", logo: qris }],
};

// Payment Item Component
const PaymentItem = ({
  name,
  logo,
  onClick,
}: {
  name: string;
  logo: string;
  onClick: (name: string) => void;
}) => (
  <div
    className="flex items-center justify-between border-b py-3 cursor-pointer hover:bg-gray-50 w-full"
    onClick={() => onClick(name)}
  >
    <div className="flex items-center gap-3">
      <Image
        src={logo}
        alt={name}
        className="w-7 h-7 object-contain"
        priority
        width={28}
        height={28}
      />
      <span className="font-medium">{name}</span>
    </div>
    <ChevronRight className="h-5 w-5 text-gray-700" />
  </div>
);

const Payment: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [guestEmail, setGuestEmail] = useState<string | null>(null);
  const isAuthenticated = status === "authenticated" && !!session?.user?.access_token;

  // Get guest email from localStorage on mount
  useEffect(() => {
    if (!isAuthenticated) {
      const storedEmail = localStorage.getItem("guest_payment_email");
      if (storedEmail) {
        setGuestEmail(storedEmail);
      }
    }
  }, [isAuthenticated]);

  const handleClick = async (name: string) => {
    const handlePayment = async () => {
      // For guests, we need the email from localStorage
      if (!isAuthenticated && !guestEmail) {
        toast.error("Session expired. Please register again.");
        router.push("/");
        return;
      }

      const payload: {
        email?: string;
        order_id: string;
        payment_method: string;
      } = {
        order_id: orderId as string,
        payment_method: name,
      };

      // Include email for guest payments
      if (!isAuthenticated && guestEmail) {
        payload.email = guestEmail;
      }

      try {
        const result = await PaymentService.processPayment(
          payload,
          isAuthenticated ? session?.user?.access_token : undefined
        );

        if (result.success) {
          dispatch(setQrString(result.data.qr_string));
          dispatch(setOrderId(result.data.order_id));
          window.location.href = `/qris?orderId=${result.data.order_id}`;
        } else {
          toast.error("Payment failed");
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        const errorMsg = error instanceof Error ? error.message : "Payment failed";
        toast.error(errorMsg);
      }
    };

    if (name === "qris") {
      await handlePayment();
    }
  };

  return (
    <div className="max-w-8xl">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex mt-5 justify-start lg:justify-start lg:items-start">
            <MoveLeft className="h-6 w-6 cursor-pointer text-gray-700 ml-2 mt-1 lg:hidden" />
            <p className="lg:text-3xl text-2xl font-bold px-4">
              Select Payment
            </p>
          </div>
          <div className="space-y-6">
            {/* Guest indicator */}
            {!isAuthenticated && guestEmail && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  Paying as guest: <strong>{guestEmail}</strong>
                </p>
              </div>
            )}

            <div className="bg-white rounded-xl w-full">
              <h3 className="text-lg font-semibold mb-3 ">QR Code</h3>
              <div className="divide-y">
                {paymentMethods.qrcode.map((item) => (
                  <PaymentItem
                    key={item.name}
                    name={item.name}
                    logo={item.logo}
                    onClick={handleClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;