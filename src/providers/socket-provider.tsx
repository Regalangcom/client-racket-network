"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  isAuthenticated: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  isAuthenticated: false,
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const isAuthenticated = status === "authenticated" && !!session?.user?.access_token;

  useEffect(() => {
    // Wait for session status to be determined
    if (status === "loading") {
      return;
    }

    // Don't create a new socket if one already exists and is connected
    if (socket?.connected) {
      return;
    }

    // Connect for everyone (guests and authenticated users)
    // Public events like activity:new will work for all
    // Payment events require authentication (handled on backend)
    const socketInstance = io(process.env.NEXT_PUBLIC_URL_API!, {
      // Only send auth token if authenticated
      auth: isAuthenticated
        ? { token: session?.user?.access_token }
        : undefined,
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on("connect", () => {
      console.log("[Socket] Connected", isAuthenticated ? "(authenticated)" : "(guest)");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("[Socket] Disconnected:", reason);
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("[Socket] Connection error:", error.message);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [status, isAuthenticated, session?.user?.access_token]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, isAuthenticated }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);