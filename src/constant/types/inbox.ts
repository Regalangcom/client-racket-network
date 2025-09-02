// src/types/inbox.ts
export interface InboxItem {
  id: string;
  type: string;
  ticket: string;
  timestamp: string;
  status: "read" | "unread";
  details?: string;
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
