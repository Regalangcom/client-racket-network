import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { authReducer } from "@/redux/store/auth-slice";
import { inboxReducer } from "./store/inbox-slice";
import paymentReducer from "@/redux/store/payment-slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/**
 * Creates a Redux Persist storage object that does nothing.
 *
 * This is useful in environments where we don't want to persist state,
 * such as in server-side rendering.
 *
 * @returns A Redux Persist storage object that does nothing.
 */
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },

    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["authState"],
};

const paymentPersistConfig = {
  key: "payment", // Kunci untuk payment
  storage: storage, // Menggunakan localStorage atau storage yang sesuai
};

const persistedReducer = persistReducer(authPersistConfig, authReducer);
const persistedPaymentReducer = persistReducer(
  paymentPersistConfig,
  paymentReducer
);

const rootReducer = combineReducers({
  // payment
  payment: persistedPaymentReducer,
  // auth
  auth: persistedReducer,
  // added
  inbox: inboxReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  /**
   * The middleware option for the store. We use the default middleware
   * because redux-persist will save the state in the local storage
   * and we should not throw an error when we load the state from
   * the storage.
   */
  //    * with the exception of disabling the serializable check. This is

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  // devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
