import Image from "next/image";
import { qris } from "@/public";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

export default function PageQris() {
  return (
    <div className="min-h-screen flex   md:justify-center md:items-center px-4">
      <div className="w-full max-w-xl space-y-6">
        <div className="flex mt-5 justify-start lg:justify-start lg:items-start">
          <MoveLeft className="h-6 w-6 cursor-pointer text-gray-700 ml-2 mt-1 lg:hidden" />
          <p className="lg:text-3xl text-2xl font-bold px-4"></p>
        </div>
        {/* Order Details */}
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold">Rp 100,000</p>
          <p className="text-sm text-gray-500">Order ID #123123123123</p>
        </div>

        {/* QR Code Section */}
        <div className="my-6 flex flex-col items-center">
          <Image
            src={qris}
            alt="QRIS"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>

        {/* Divider Section with Gray Border */}
        <div className="border-t border-gray-300 py-3">
          <div className="space-y-4">
            {/* Buttons */}
            <Button className="w-full py-4 md:py-6 bg-background-button-rc hover:bg-white hover:text-black text-white rounded-md">
              Download QRIS
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
