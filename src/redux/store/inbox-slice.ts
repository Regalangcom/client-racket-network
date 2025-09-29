// src/redux/store/inbox-slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Types
export interface InboxItem {
  id: string;
  type: string;
  ticket: string;
  timestamp: string;
  status: "read" | "unread";
}

export interface InboxState {
  items: InboxItem[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// Initial State
const initialState: InboxState = {
  items: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

// Dummy data generator (for demo purposes)
const generateDummyInboxItems = (count: number = 10): InboxItem[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `inbox_${index + 1}`,
    type: index % 2 === 0 ? "Competition Ticket" : "Match Ticket",
    ticket: `12DC${66 + index}`,
    timestamp: "Today, 16:40",
    status: index < 3 ? "unread" : "read",
  }));
};

// Async Thunks
export const fetchInboxItems = createAsyncThunk(
  "inbox/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const items = generateDummyInboxItems();
      return {
        items,
        pagination: {
          page: 1,
          limit: 10,
          total: items.length,
        },
      };
    } catch (error) {
      return rejectWithValue("Failed to fetch inbox items");
    }
  }
);

export const markItemAsRead = createAsyncThunk(
  "inbox/markAsRead",
  async (itemId: string, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      return itemId;
    } catch (error) {
      return rejectWithValue("Failed to mark item as read");
    }
  }
);

// Slice
export const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Items
      .addCase(fetchInboxItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInboxItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchInboxItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Mark as Read
      .addCase(markItemAsRead.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        if (index !== -1) {
          state.items[index].status = "read";
        }
      });
  },
});

export const inboxReducer = inboxSlice.reducer;
