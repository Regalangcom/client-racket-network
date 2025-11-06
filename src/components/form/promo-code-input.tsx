// "use client";

// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import {
//   UseFormRegister,
//   Control,
//   UseFormSetValue,
//   UseFormGetValues,
// } from "react-hook-form";

// interface PromoCodeInputProps {
//   register: UseFormRegister<any>;
//   setValue: UseFormSetValue<any>;
//   getValues: UseFormGetValues<any>;
//   onPromoApplied: (discount: number) => void;
//   className?: string;
//   placeholder?: string;
//   fieldName?: string;
// }

// export const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
//   register,
//   setValue,
//   getValues,
//   onPromoApplied,
//   className = "",
//   placeholder = "TEN87",
//   fieldName = "promoCode",
// }) => {
//   const [isApplyingPromo, setIsApplyingPromo] = useState(false);
//   const [promoApplied, setPromoApplied] = useState(false);
//   const [promoError, setPromoError] = useState<string | null>(null);

//   const handleApplyPromo = async () => {
//     const promoCode = getValues(fieldName);

//     if (!promoCode) {
//       setPromoError("Please enter a promo code");
//       return;
//     }

//     setIsApplyingPromo(true);
//     setPromoError(null);
//     setPromoApplied(false);

//     try {
//       // Call your API endpoint
//       const response = await fetch("/api/apply-promo", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           promoCode,
//           // You can add additional context data if needed
//           // pageType: 'match' or 'competition'
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setPromoApplied(true);
//         // Call the callback with the discount amount
//         onPromoApplied(data.discountAmount || 0);
//       } else {
//         setPromoError(data.message || "Invalid promo code");
//         // Reset any previously applied promo
//         onPromoApplied(0);
//       }
//     } catch (error) {
//       setPromoError("Error applying promo code. Please try again.");
//       console.error("Error applying promo code:", error);
//       // Reset any previously applied promo
//       onPromoApplied(0);
//     } finally {
//       setIsApplyingPromo(false);
//     }
//   };

//   return (
//     <div className={`bg-white ${className} rounded-2xl  mb-6`}>
//       <h3 className="text-2xl font-semibold mb-4">Promo</h3>
//       <div className="flex gap-4">
//         <input
//           {...register(fieldName)}
//           type="text"
//           placeholder={placeholder}
//           className="w-full p-1 border rounded"
//         />
//         <Button
//           type="button"
//           onClick={handleApplyPromo}
//           className="bg-white text-black border border-[#174038] p-0 w-32 h-auto hover:bg-gray-100"
//           disabled={isApplyingPromo}
//         >
//           {isApplyingPromo ? "Applying..." : "Use"}
//         </Button>
//       </div>
//       {promoApplied && (
//         <p className="text-green-500 text-sm mt-1">
//           Promo code applied successfully!
//         </p>
//       )}
//       {promoError && <p className="text-red-500 text-sm mt-1">{promoError}</p>}
//     </div>
//   );
// };

// components/form/promo-code-input.tsx

"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";

interface PromoCodeInputProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;

  // ✅ Just callbacks - no service logic
  onApply: (code: string) => Promise<void>;
  onRemove: () => void;

  // ✅ State passed from parent
  isLoading: boolean;
  appliedCode: string | null;
  discountAmount: number;
  errorMessage: string | null;

  className?: string;
  placeholder?: string;
  fieldName?: string;
}

export const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  register,
  setValue,
  getValues,
  onApply,
  onRemove,
  isLoading,
  appliedCode,
  discountAmount,
  errorMessage,
  className = "",
  placeholder = "Enter promo code",
  fieldName = "promoCode",
}) => {
  const handleApply = async () => {
    const code = getValues(fieldName);

    if (!code || !code.trim()) {
      return;
    }

    await onApply(code.trim().toUpperCase());
  };

  const handleRemove = () => {
    setValue(fieldName, "");
    onRemove();
  };

  return (
    <div className={`bg-white ${className} rounded-2xl mb-6`}>
      <h3 className="text-2xl font-semibold mb-4">
        Promo{" "}
        <span className="text-sm text-gray-500 font-normal">(Optional)</span>
      </h3>

      <div className="flex gap-4">
        <input
          {...register(fieldName)}
          type="text"
          placeholder={placeholder}
          disabled={!!appliedCode || isLoading}
          className="w-full p-1 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
        />

        {appliedCode ? (
          <Button
            type="button"
            onClick={handleRemove}
            className="bg-white text-red-500 border border-red-500 p-0 w-32 h-auto hover:bg-red-50"
            disabled={isLoading}
          >
            Remove
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleApply}
            className="bg-white text-black border border-[#174038] p-0 w-32 h-auto hover:bg-gray-100"
            disabled={isLoading}
          >
            {isLoading ? "Checking..." : "Use"}
          </Button>
        )}
      </div>

      {appliedCode && discountAmount > 0 && (
        <p className="text-green-500 text-sm mt-2">
          ✅ Voucher {appliedCode} applied! You saved Rp{" "}
          {discountAmount.toLocaleString()}
        </p>
      )}

      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
};
