"use client";

import { useState, useCallback } from "react";
import { Activity } from "@/constant/types/activity";

interface Pagination {
  hasMore: boolean;
  nextCursor: string | null;
}

interface UseActivityFeedReturn {
  activities: Activity[];
  isLoadingMore: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  error: string | null;
}

export function useActivityFeed(
  initialActivities: Activity[],
  initialPagination: Pagination
): UseActivityFeedReturn {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !pagination.hasMore || !pagination.nextCursor) {
      return;
    }

    setIsLoadingMore(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL_API;
      const params = new URLSearchParams();
      params.append("cursor", pagination.nextCursor);
      params.append("limit", "10");

      const response = await fetch(
        `${baseUrl}/api/v1/activity/public?${params.toString()}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load more activities");
      }

      const result = await response.json();

      if (result.success && result.data) {
        setActivities((prev) => [...prev, ...result.data.activities]);
        setPagination(result.data.pagination);
      }
    } catch (err) {
      console.error("Error loading more activities:", err);
      setError(err instanceof Error ? err.message : "Failed to load more");
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, pagination]);

  return {
    activities,
    isLoadingMore,
    hasMore: pagination.hasMore,
    loadMore,
    error,
  };
}
