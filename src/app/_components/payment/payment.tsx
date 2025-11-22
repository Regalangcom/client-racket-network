// "use client";

// import { ChevronRight, MoveLeft } from "lucide-react";
// import { useState } from "react";
// import { qris } from "@/public";
// import Image from "next/image";
// import { useRouter } from "next/navigation"; // Import Next.js router
// import { PaymentService } from "@/services/payment-services";

// // Data Payment Methods
// const paymentMethods = {
//   qrcode: [{ name: "QRIS", logo: qris }],
// };

// // Komponen Row Item
// const PaymentItem = ({ name, logo }: { name: string; logo: string }) => {
//   const router = useRouter();

//   // Handle the QRIS click
//   const handleClick = (name: string) => {
//     if (name === "QRIS") {
//       router.push("/qris");
//     }
//   };

//   return (
//     <div
//       className="flex items-center justify-between border-b py-3 cursor-pointer hover:bg-gray-50 w-full"
//       onClick={() => handleClick(name)}
//     >
//       <div className="flex items-center gap-3">
//         <Image
//           src={logo}
//           alt={name}
//           className="w-7 h-7 object-contain"
//           priority
//           width={28}
//           height={28}
//         />
//         <span className="font-medium">{name}</span>
//       </div>
//       <ChevronRight className="h-5 w-5 text-gray-700" />
//     </div>
//   );
// };

// const Payment: React.FC = () => {
//   const [showMoreEwallet, setShowMoreEwallet] = useState(false);
//   const [selectedMethod, setSelectedMethod] = useState("");

//   const router = useRouter();

//   // const ewalletToShow = showMoreEwallet
//   //   ? paymentMethods.ewallet
//   //   : paymentMethods.ewallet.slice(0, 3);

//   const handlePayment = async () => {
//     const payload = {
//       payment_method: selectedMethod,
//     };

//     try {
//       const result = await PaymentService.processPayment(payload);
//       if (result.success && result.data.transaction_id) {
//         const transactionId = result.data.transaction_id;
//         const orderId = result.data.order_id;

//         const paymentDetails = await PaymentService.getDetailPayment(orderId);

//         console.log("Payment Details:", paymentDetails);

//         if (result.data.qr_string) {
//           router.push(
//             `/qris?qrUrl=${encodeURIComponent(result.data.qr_string)}`
//           );
//         }
//       }
//     } catch (error) {}
//   };

//   return (
//     <div className="max-w-8xl">
//       <div className="max-w-screen-xl mx-auto px-4 py-3">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="flex mt-5 justify-start lg:justify-start lg:items-start">
//             <MoveLeft className="h-6 w-6 cursor-pointer text-gray-700 ml-2 mt-1 lg:hidden" />
//             <p className="lg:text-3xl text-2xl font-bold px-4">
//               Select Payment
//             </p>
//           </div>
//           <div className="space-y-6">
//             <div className="rounded-xl w-full">
//               {/* <h3 className="text-lg font-semibold p-4">Ewallet</h3> */}
//               <div className="divide-y">
//                 {/* {ewalletToShow.map((item) => (
//                   <PaymentItem
//                     key={item.name}
//                     name={item.name}
//                     logo={item.logo}
//                   />
//                 ))} */}
//               </div>
//               {/* {paymentMethods.ewallet.length > 3 && (
//                 <button
//                   onClick={() => setShowMoreEwallet(!showMoreEwallet)}
//                   className="w-full text-center text-blue-600 font-medium py-3"
//                 >
//                   {showMoreEwallet
//                     ? "Show less"
//                     : `Show ${paymentMethods.ewallet.length - 3} more`}
//                 </button>
//               )} */}
//             </div>
//             <div className="bg-white rounded-xl w-full">
//               {/* <h3 className="text-lg font-semibold p-4">Bank Transfer</h3> */}
//               {/* <div className="divide-y">
//                 {paymentMethods.bank.map((item) => (
//                   <PaymentItem
//                     key={item.name}
//                     name={item.name}
//                     logo={item.logo}
//                   />
//                 ))}
//               </div> */}
//             </div>
//             <div className="bg-white rounded-xl w-full">
//               <h3 className="text-lg font-semibold mb-3 ">QR Code</h3>
//               <div className="divide-y">
//                 {paymentMethods.qrcode.map((item) => (
//                   <PaymentItem
//                     key={item.name}
//                     name={item.name}
//                     logo={item.logo}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;

"use client";

import { ChevronRight, MoveLeft } from "lucide-react";
import { useState } from "react";
import { qris } from "@/public";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"; // Import Next.js router
import { PaymentService } from "@/services/payment-services";

// Data Payment Methods
const paymentMethods = {
  qrcode: [{ name: "qris", logo: qris }],
};

// Komponen Row Item
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
  const [selectedMethod, setSelectedMethod] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const Comp_Id = searchParams.get("order_id");

  const handleClick = async (name: string) => {
    setSelectedMethod(name); // Set selected payment method

    if (name === "qris") {
      // Jika QRIS dipilih, langsung panggil handlePayment
      await handlePayment();
    }
  };

  const handlePayment = async () => {
    const payload = {
      order_id: Comp_Id as string,
      payment_method: selectedMethod,
    };

    console.log("payload", payload);

    try {
      const result = await PaymentService.processPayment(payload);
      if (result.success) {
        const orderId = result.data.order_id;

        router.push(
          `/qris?orderId=${orderId}&qr=${encodeURIComponent(
            result.data.qr_string
          )}`
        );
      } else {
        console.error("Payment failed:", result.message);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
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
            <div className="bg-white rounded-xl w-full">
              <h3 className="text-lg font-semibold mb-3 ">QR Code</h3>
              <div className="divide-y">
                {paymentMethods.qrcode.map((item) => (
                  <PaymentItem
                    key={item.name}
                    name={item.name}
                    logo={item.logo}
                    onClick={handleClick} // Pass the handleClick here
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
