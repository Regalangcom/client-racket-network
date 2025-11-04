export type VoucherApplyPayload = {
  voucher_code: string;
  original_amount: number;
};

export type VoucherApplyResponse = {
  success: true;
  message: string;
  data: {
    valid: boolean;
    promo_code_id: number;
    code: string;
    discount_type: "PERCENTAGE" | "FIXED";
    discount_value: string;
    original_amount: number;
    discount_amount: number;
    final_amount: number;
    is_personal_voucher: boolean | null;
  };
};
