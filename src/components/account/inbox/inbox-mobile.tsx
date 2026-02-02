"use client";

import React from "react";
import { AccountMenu } from "../accountMenu/title-menu";
import { Notification } from "@/constant/types/notification";

interface InboxMobileViewProps {
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

export const InboxMobileView: React.FC<InboxMobileViewProps> = ({
  notifications,
}) => {
  if (notifications.length === 0) {
    return (
      <div className="w-full min-h-screen bg-white">
        <div className="mt-24">
          <AccountMenu title="Inbox" showBackButton={true} />
          <div className="px-4 py-8 text-center text-gray-500">
            No notifications yet
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="mt-24">
        <AccountMenu title="Inbox" showBackButton={true} />

        <div>
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`px-4 py-3 border-b flex items-start ${
                !item.is_read ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-md pr-2">{item.title}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatDate(item.created_at)}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{item.message}</p>
                <span className="text-xs text-gray-400 mt-1 inline-block">
                  {item.type.replace(/_/g, " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
