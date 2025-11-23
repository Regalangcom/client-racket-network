// store/paymentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  qrString: string | null;
  orderId: string | null;
}

const initialState: PaymentState = {
  qrString: null,
  orderId: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setQrString(state, action: PayloadAction<string | null>) {
      state.qrString = action.payload;
    },
    setOrderId(state, action: PayloadAction<string | null>) {
      state.orderId = action.payload;
    },
    resetQrString(state) {
      state.qrString = null;
      state.orderId = null;
    },
  },
});

export const { setQrString, setOrderId, resetQrString } = paymentSlice.actions;

export default paymentSlice.reducer;
