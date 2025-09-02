// src/hooks/useInbox.ts
import { useAppDispatch, useAppSelector } from "@/redux";
import { fetchInboxItems, markItemAsRead } from "@/redux/store/inboxSlice";
import { useCallback } from "react";

export const useInbox = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, pagination } = useAppSelector(
    (state) => state.inbox
  );

  const loadInboxItems = useCallback(() => {
    dispatch(fetchInboxItems());
  }, [dispatch]);

  const handleMarkAsRead = useCallback(
    (itemId: string) => {
      dispatch(markItemAsRead(itemId));
    },
    [dispatch]
  );

  return {
    items,
    loading,
    error,
    pagination,
    loadInboxItems,
    handleMarkAsRead,
  };
};
