"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Activity } from "@/constant/types/activity";
import { ActivityCard } from "./activity-card";
import { NewActivityIndicator } from "./new-activity-indicator";
import { useActivityFeed } from "@/hooks/useActivityFeed";
import { Loader2 } from "lucide-react";

interface Pagination {
  hasMore: boolean;
  nextCursor: string | null;
}

interface ActivityFeedProps {
  initialActivities: Activity[];
  initialPagination: Pagination;
}

export function ActivityFeed({
  initialActivities,
  initialPagination,
}: ActivityFeedProps) {
  const router = useRouter();
  const { activities, loadMore, hasMore, isLoadingMore, error } =
    useActivityFeed(initialActivities, initialPagination);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Get the newest activity ID for comparison
  const newestActivityId = activities.length > 0 ? activities[0].id : null;

  // Handle refresh when new activities are available
  const handleRefresh = useCallback(() => {
    router.refresh();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router]);

  // Intersection Observer callback
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoadingMore) {
        loadMore();
      }
    },
    [hasMore, isLoadingMore, loadMore]
  );

  // Set up IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    });

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleIntersection]);

  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No activities available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* New activity indicator - shows when new content is available */}
      <NewActivityIndicator
        currentNewestId={newestActivityId}
        onRefresh={handleRefresh}
      />

      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}

      {/* Load more trigger element */}
      <div ref={loadMoreRef} className="h-4" />

      {/* Loading indicator */}
      {isLoadingMore && (
        <div className="flex justify-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="text-center py-4">
          <p className="text-red-500 text-sm">{error}</p>
          <button
            onClick={loadMore}
            className="mt-2 text-sm text-blue-500 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* End of feed message */}
      {!hasMore && activities.length > 0 && (
        <div className="text-center py-4">
          <p className="text-gray-400 text-sm">You&apos;ve reached the end</p>
        </div>
      )}
    </div>
  );
}
