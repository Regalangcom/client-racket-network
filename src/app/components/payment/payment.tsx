"use client";

import { ChevronRight, MoveLeft } from "lucide-react";
import { useState } from "react";
import { dana, gopay, ovo } from "@/public";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import Next.js router

// Data Payment Methods
const paymentMethods = {
  ewallet: [
    { name: "Gopay", logo: gopay },
    { name: "OVO", logo: ovo },
    { name: "Dana", logo: dana },
    { name: "LinkAja", logo: "/images/linkaja.png" },
    { name: "ShopeePay", logo: "/images/shopeepay.png" },
  ],
  bank: [
    { name: "BCA", logo: "/images/bca.png" },
    { name: "Bank Mega", logo: "/images/mega.png" },
    { name: "Maybank", logo: "/images/maybank.png" },
  ],
  qrcode: [{ name: "QRIS", logo: "/images/qris.png" }],
};

// Komponen Row Item
const PaymentItem = ({ name, logo }: { name: string; logo: string }) => {
  const router = useRouter();

  // Handle the QRIS click
  const handleClick = (name: string) => {
    if (name === "QRIS") {
      router.push("/qris");
    }
  };

  return (
    <div
      className="flex items-center justify-between border-b py-3 cursor-pointer hover:bg-gray-50 w-full"
      onClick={() => handleClick(name)}
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
};

const Payment: React.FC = () => {
  const [showMoreEwallet, setShowMoreEwallet] = useState(false);

  const ewalletToShow = showMoreEwallet
    ? paymentMethods.ewallet
    : paymentMethods.ewallet.slice(0, 3);

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
            <div className="rounded-xl w-full">
              <h3 className="text-lg font-semibold p-4">Ewallet</h3>
              <div className="divide-y">
                {ewalletToShow.map((item) => (
                  <PaymentItem
                    key={item.name}
                    name={item.name}
                    logo={item.logo}
                  />
                ))}
              </div>
              {paymentMethods.ewallet.length > 3 && (
                <button
                  onClick={() => setShowMoreEwallet(!showMoreEwallet)}
                  className="w-full text-center text-blue-600 font-medium py-3"
                >
                  {showMoreEwallet
                    ? "Show less"
                    : `Show ${paymentMethods.ewallet.length - 3} more`}
                </button>
              )}
            </div>
            <div className="bg-white rounded-xl w-full">
              <h3 className="text-lg font-semibold p-4">Bank Transfer</h3>
              <div className="divide-y">
                {paymentMethods.bank.map((item) => (
                  <PaymentItem
                    key={item.name}
                    name={item.name}
                    logo={item.logo}
                  />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl w-full">
              <h3 className="text-lg font-semibold p-4">QR Code</h3>
              <div className="divide-y">
                {paymentMethods.qrcode.map((item) => (
                  <PaymentItem
                    key={item.name}
                    name={item.name}
                    logo={item.logo}
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
