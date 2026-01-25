"use client";

import React, { useEffect, useState, useCallback } from "react";
import { RefreshCw } from "lucide-react";

interface NewActivityIndicatorProps {
  currentNewestId: number | null;
  onRefresh: () => void;
}

export function NewActivityIndicator({
  currentNewestId,
  onRefresh,
}: NewActivityIndicatorProps) {
  const [hasNewActivity, setHasNewActivity] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const checkForNewActivities = useCallback(async () => {
    if (isChecking || !currentNewestId) return;

    setIsChecking(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL_API;
      const response = await fetch(
        `${baseUrl}/api/v1/activity/public?limit=1`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        return;
      }

      const result = await response.json();

      if (result.success && result.data?.activities?.length > 0) {
        const latestActivity = result.data.activities[0];
        // Check if there's a newer activity than what we have
        if (latestActivity.id > currentNewestId) {
          setHasNewActivity(true);
        }
      }
    } catch (error) {
      console.error("Error checking for new activities:", error);
    } finally {
      setIsChecking(false);
    }
  }, [currentNewestId, isChecking]);

  // Poll for new activities every 30 seconds
  useEffect(() => {
    // Initial check after 10 seconds
    const initialTimeout = setTimeout(() => {
      checkForNewActivities();
    }, 10000);

    // Then check every 30 seconds
    const interval = setInterval(() => {
      checkForNewActivities();
    }, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [checkForNewActivities]);

  // Also check when user returns to the tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkForNewActivities();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkForNewActivities]);

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
                 px-4 py-2 rounded-full shadow-lg
                 flex items-center gap-2
                 animate-bounce-subtle
                 hover:animate-none"
    >
      <RefreshCw size={16} />
      <span className="text-sm font-medium">New activities available</span>
    </button>
  );
}
