import {
  PaymentProcessingPayload,
  PaymentProcessingResponse,
} from "@/constant/types/qris";
import { PaymentStatusResponse } from "@/constant/types/payment-status";

export class PaymentService {
  static async processPayment(
    payload: PaymentProcessingPayload,
    access_token?: string
  ): Promise<PaymentProcessingResponse> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/payment/process`,
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
        throw new Error(data.message || "Failed to process payment");
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to process payment");
    }
  }

  static async getDetailPayment(
    // payload: PaymentProcessingPayload,
    orderId: string,
    access_token?: string
  ): Promise<any> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/payment/process/${orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store", // ✅ Don't cache payment data
          next: {
            revalidate: 0, // ✅ Always fetch fresh data
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to get payment details");
      }
      return data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to get payment details");
    }
  }

  static async getPaymentStatus(orderId: string): Promise<PaymentStatusResponse> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/webhook/payment-status/${orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get payment status");
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to get payment status");
    }
  }
}
