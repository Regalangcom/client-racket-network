// components/club/joined/menu-joined.tsx
"use client";

import React from "react";
import { Calendar, Edit, Activity, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuJoinedProps {
  clubId: string | number;
  onCreateEvent?: () => void;
  onEditClub?: () => void;
  onActivities?: () => void;
  onStats?: () => void;
}

/**
 * MenuJoined Component
 * 4 action buttons for club owner (Create Event, Edit Club, Activities, Stats)
 */
export default function MenuJoined({
  clubId,
  onCreateEvent,
  onEditClub,
  onActivities,
  onStats,
}: MenuJoinedProps) {
  const menuItems = [
    {
      id: "create-event",
      label: "Create Event",
      icon: Calendar,
      onClick: onCreateEvent,
    },
    {
      id: "edit-club",
      label: "Edit Club",
      icon: Edit,
      onClick: onEditClub,
    },
    {
      id: "activities",
      label: "Activities",
      icon: Activity,
      onClick: onActivities,
    },
    {
      id: "stats",
      label: "Stats",
      icon: BarChart3,
      onClick: onStats,
    },
  ];

  return (
    <div className="w-full grid grid-cols-4 gap-3">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant="ghost"
            className="flex flex-col items-center justify-center h-auto py-4 px-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl gap-2"
            onClick={item.onClick}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-lg">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-center leading-tight">
              {item.label}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
