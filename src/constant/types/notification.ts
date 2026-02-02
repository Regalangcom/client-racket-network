// src/constant/types/notification.ts

export interface Notification {
  id: number;
  user_id: number;
  type: string;
  title: string;
  message: string;
  reference_id: string;
  reference_type: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
}

export interface NotificationResponse {
  success: boolean;
  message: string;
  data: {
    notifications: Notification[];
  };
}

export interface MarkAsReadResponse {
  success: boolean;
  message: string;
}
