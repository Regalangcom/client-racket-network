import {
  VoucherApplyPayload,
  VoucherApplyResponse,
} from "@/constant/types/voucher";

export class VoucherService {
  static async applyVoucher(
    payload: VoucherApplyPayload,
    access_token?: string
  ): Promise<VoucherApplyResponse> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/vouchers/apply`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to apply voucher for event");
      }

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to apply voucher");
    }
  }
}
