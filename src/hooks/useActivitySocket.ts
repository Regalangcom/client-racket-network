"use client";

import { useEffect, useRef } from "react";
import { useSocket } from "@/providers/socket-provider";

interface ActivitySocketOptions {
  onNewActivity?: (activity: any) => void;
}

export function useActivitySocket({ onNewActivity }: ActivitySocketOptions) {
  const { socket, isConnected } = useSocket();
  const hasSubscribed = useRef(false);

  useEffect(() => {
    if (!socket || !isConnected) {
      hasSubscribed.current = false;
      return;
    }

    // Subscribe to activity feed
    // if (!hasSubscribed.current) {
    //   socket.emit("activity:subscribe");
    //   hasSubscribed.current = true;
    //   console.log("[ActivitySocket] Subscribed to activity feed");
    // }

    const handleNewActivity = (data: any) => {
      console.log("[ActivitySocket] New activity received:", data);
      onNewActivity?.(data);
    };

    socket.on("activity:new", handleNewActivity);

    return () => {
      // socket.emit("activity:unsubscribe");
      socket.off("activity:new", handleNewActivity);
      // hasSubscribed.current = false;
      // console.log("[ActivitySocket] Unsubscribed from activity feed");
    };
  }, [socket, isConnected, onNewActivity]);

  return { isConnected };
}