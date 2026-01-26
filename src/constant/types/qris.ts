export type PaymentProcessingPayload = {
  email?: string; // Required for guest payments
  order_id?: string;
  payment_method: string;
};

export type PaymentProcessingResponse = {
  success: boolean;
  message: string;
  data: {
    order_id: string;
    transaction_id: string;
    transaction_status: string;
    payment_type: string;
    gross_amount: string;
    fraud_status: string;
    expires_at: string;
    actions: Array<{
      name: string;
      method: string;
      url: string;
    }>;
    qr_string: string;
  };
};
