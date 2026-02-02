"use client";

import React from "react";
import { Notification } from "@/constant/types/notification";

interface InboxDesktopViewProps {
  notifications: Notification[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return `Today, ${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export const InboxDesktopView: React.FC<InboxDesktopViewProps> = ({
  notifications,
}) => {
  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r p-6">
        <h1 className="text-2xl font-bold mb-6">Inbox</h1>
      </div>

      {/* Main Content */}
      <div className="w-3/4 bg-gray-100 p-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>

            {notifications.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No notifications yet
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 border-b last:border-b-0 ${
                    !item.is_read ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.message}
                      </p>
                      <span className="text-xs text-gray-400 mt-2 inline-block">
                        {item.type.replace(/_/g, " ")}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(item.created_at)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
