"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import { Activity } from "@/constant/types/activity";
import { sampeImage } from "@/public";
import { maps } from "@/public";

interface ActivityCardProps {
  activity: Activity;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}

function parseMatchTitle(message: string): string {
  const colonIndex = message.lastIndexOf(":");
  if (colonIndex !== -1) {
    return message.substring(colonIndex + 1).trim();
  }
  return "New Match";
}

export function ActivityCard({ activity }: ActivityCardProps) {
  if (activity.type === "MATCH_CREATED") {
    return (
      <Card className="w-full overflow-hidden shadow-sm border border-gray-200 flex flex-col">
        {/* Header */}
        <div className="bg-gray-100 flex items-center px-4 py-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            {activity.bannerUrl && (
              <Image
                src={activity.bannerUrl}
                alt={activity.club.name}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <div className="flex-1 ml-3">
            <p className="text-sm text-gray-700">
              <span className="font-bold text-black">{activity.club.name}</span>{" "}
              created a match
            </p>
            <p className="text-xs text-gray-500">
              {formatRelativeTime(activity.created_at)}
            </p>
          </div>
        </div>

        {/* Banner Image */}
        <div className="w-full h-[160px] relative">
          <Image
            src={activity.bannerUrl || sampeImage}
            alt={activity.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <h3 className="font-bold text-base text-black mb-2">
            {parseMatchTitle(activity.message)}
          </h3>
          <div className="flex items-center text-sm text-gray-600 gap-2 mb-3">
            <Calendar size={14} />
            <span>
              {new Date(activity.created_at).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600 gap-2 mb-3">
            <Image src={maps} alt="maps" priority />
            <span className="font-semibold">{activity.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 gap-2 mb-3">
            {/* <Image src={maps} alt="maps" priority /> */}
            <span className="flex items-center justify-center py-1 w-28 mb-5 text-sm bg-[#B5D9D2] rounded-full  text-gray-700 gap-2">
              <span className="text-center">{activity.slot_left} sport left</span>
            </span>
          </div>
          <Link href={`/match/${activity.reference_id}`}>
            <Button className="w-full bg-background-button-rc text-[#E1FFA0] rounded-lg">
              View Match
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (activity.type === "MEMBER_JOINED") {
    return (
      <Card className="w-full overflow-hidden shadow-sm border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <Users size={24} className="text-gray-500" />
            </div>
            <div className="flex-1 ml-3">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-black">
                  {activity.actor_name || "Someone"}
                </span>{" "}
                joined{" "}
                <span className="font-semibold">{activity.club.name}</span>
              </p>
              <p className="text-xs text-gray-500">
                {formatRelativeTime(activity.created_at)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Fallback for other activity types
  return (
    <Card className="w-full overflow-hidden shadow-sm border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden" />
          <div className="flex-1 ml-3">
            <p className="text-sm font-medium text-black">{activity.title}</p>
            <p className="text-xs text-gray-500">{activity.message}</p>
            <p className="text-xs text-gray-400 mt-1">
              {formatRelativeTime(activity.created_at)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
