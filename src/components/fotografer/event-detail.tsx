"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import { FotograferEvent, FotograferInvitation } from "@/constant/types/fotografer";

interface EventDetailProps {
  event: FotograferEvent;
  invitations?: FotograferInvitation[];
}

type TabKey = "detail" | "invitations" | "other";

const TABS: { key: TabKey; label: string }[] = [
  { key: "detail", label: "Detail" },
  { key: "invitations", label: "Invitations" },
  { key: "other", label: "Other" },
];

export default function FotograferEventDetail({
  event,
  invitations = [],
}: EventDetailProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("detail");

  return (
    <div className="space-y-4">
      {/* Page title — on gray background, outside card */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={22} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{event.event_name}</h1>
      </div>

      {/* White card — starts at tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <nav className="flex">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative flex items-center gap-2 py-4 px-5 text-sm font-medium transition-colors ${
                  activeTab === key
                    ? "text-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {label}
                {key === "invitations" && invitations.length > 0 && (
                  <span className="bg-orange-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none">
                    {invitations.length}
                  </span>
                )}
                {activeTab === key && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gray-900 rounded-t-full" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="p-6">
          {activeTab === "detail" && <DetailTab event={event} />}
          {activeTab === "invitations" && (
            <InvitationsTab invitations={invitations} />
          )}
          {activeTab === "other" && <OtherTab />}
        </div>
      </div>
    </div>
  );
}

/* ─── Detail tab ─────────────────────────────────────────────────────────── */

function DetailTab({ event }: { event: FotograferEvent }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6 py-2">
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Time & date</p>
          <p className="text-sm font-bold text-gray-900">{event.time_date}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Field</p>
          <p className="text-sm font-bold text-gray-900">{event.field}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Club</p>
          <p className="text-sm font-bold text-gray-900">{event.club}</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-800">Photo</p>
        <label className="flex flex-col items-center justify-center gap-2 w-full max-w-[580px] border-2 border-dashed border-gray-300 rounded-md py-10 px-8 cursor-pointer hover:border-gray-400 transition-colors bg-white">
          <input type="file" accept="image/*" multiple className="sr-only" />
          <UploadPhotoIcon />
          <div className="text-sm text-center leading-5 text-gray-500 mt-1">
            <span>Upload photo</span>
            <br />
            <span>or drag from </span>
            <span className="text-blue-500 underline underline-offset-2">Gallery</span>
          </div>
        </label>
      </div>

      <button className="inline-flex items-center justify-center h-9 px-5 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors text-sm font-medium text-gray-700">
        Copy Link
      </button>
    </div>
  );
}

/* ─── Invitations tab ────────────────────────────────────────────────────── */

function InvitationsTab({ invitations }: { invitations: FotograferInvitation[] }) {
  if (invitations.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-gray-400">No invitations yet</p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {invitations.map((person) => (
        <InvitationCard key={person.id} person={person} />
      ))}
    </div>
  );
}

function InvitationCard({ person }: { person: FotograferInvitation }) {
  return (
    <div className="flex items-center gap-4 bg-gray-100 rounded-xl px-4 py-4">
      {/* Avatar */}
      <div className="shrink-0 w-14 h-14 rounded-full bg-gray-300 overflow-hidden">
        {person.avatar ? (
          <img
            src={person.avatar}
            alt={person.name}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>

      {/* Name + actions */}
      <div className="flex flex-col gap-2 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{person.name}</p>
        <div className="flex items-center gap-2">
          {/* Accept */}
          <button
            className="w-8 h-8 rounded-full border-2 border-green-500 bg-white flex items-center justify-center hover:bg-green-50 transition-colors"
            aria-label="Accept"
          >
            <Check size={14} className="text-green-500" strokeWidth={2.5} />
          </button>
          {/* Reject */}
          <button
            className="w-8 h-8 rounded-full border-2 border-red-500 bg-white flex items-center justify-center hover:bg-red-50 transition-colors"
            aria-label="Reject"
          >
            <X size={14} className="text-red-500" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Other tab ──────────────────────────────────────────────────────────── */

function OtherTab() {
  return (
    <p className="py-12 text-center text-sm text-gray-400">No content</p>
  );
}

/* ─── Upload icon ────────────────────────────────────────────────────────── */

function UploadPhotoIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-400"
    >
      <rect x="2" y="5" width="26" height="22" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2 21l7-7 5 5 4-4 10 8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="9" cy="12" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="29" cy="27" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.5" />
      <line x1="29" y1="24" x2="29" y2="30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="26" y1="27" x2="32" y2="27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
