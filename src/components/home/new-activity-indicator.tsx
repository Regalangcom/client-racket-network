"use client";

import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useActivitySocket } from "@/hooks/useActivitySocket";

interface NewActivityIndicatorProps {
  currentNewestId: number | null;
  onRefresh: () => void;
}

export function NewActivityIndicator({
  currentNewestId,
  onRefresh,
}: NewActivityIndicatorProps) {
  const [hasNewActivity, setHasNewActivity] = useState(false);

  // WebSocket integration for real-time activity updates (works for all users)
  useActivitySocket({
    onNewActivity: (activity) => {
      // Check if this activity is newer than what we currently have
      if (currentNewestId && activity?.id > currentNewestId) {
        setHasNewActivity(true);
      } else if (!currentNewestId && activity?.id) {
        // If we don't have any activities yet, show indicator
        setHasNewActivity(true);
      }
    },
  });

  const handleClick = () => {
    setHasNewActivity(false);
    onRefresh();
  };

  if (!hasNewActivity) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className="fixed top-20 left-1/2 z-50
                 bg-background-button-rc  text-white
                 px-3 py-2 rounded-full shadow-lg
                 flex items-center gap-2
                 animate-bounce-subtle
                 hover:animate-none"
    >
      <RefreshCw size={16} />
      <span className="text-sm font-medium">New activities available</span>
    </button>
  );
}