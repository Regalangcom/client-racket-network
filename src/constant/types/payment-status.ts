export interface PaymentStatusResponse {
  success: boolean;
  data: {
    type: string;
    payment: {
      id: number;
      registration_id: number;
      payment_method: string;
      transaction_id: string;
      qrUrl: string;
      createdAt: string;
      verifiedAt: string | null;
      expires_at: string;
      registration: {
        id: number;
        full_name: string;
        email: string;
        payment_status: "PENDING" | "PAID" | "FAILED" | "EXPIRED";
      };
    };
    midtrans_status: {
      status_code: string;
      transaction_id: string;
      custom_field1: string;
      custom_field2: string;
      gross_amount: string;
      currency: string;
      order_id: string;
      payment_type: string;
      signature_key: string;
      transaction_status: "pending" | "settlement" | "expire" | "cancel" | "deny";
      fraud_status: string;
      status_message: string;
      merchant_id: string;
      transaction_time: string;
      expiry_time: string;
    };
  };
}
