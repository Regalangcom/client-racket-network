"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FotograferEvent } from "@/constant/types/fotografer";

interface EventTableProps {
  eventList: FotograferEvent[];
}

export default function FotograferEventTable({ eventList }: EventTableProps) {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      eventList.filter((e) =>
        e.event_name.toLowerCase().includes(search.toLowerCase())
      ),
    [eventList, search]
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const paginated = filtered.slice(start, start + rowsPerPage);

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleRowsPerPage = (val: number) => {
    setRowsPerPage(val);
    setPage(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-4xl font-semibold mb-5">Event List</h2>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="relative w-52">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-8 h-9 text-sm"
          />
        </div>
        <Button className="bg-background-button-rc h-9 text-sm px-4">
          <span className="text-[#E1FFA0]">Add Event</span>
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-3 font-medium text-gray-500 w-12">No</th>
              <th className="text-left py-3 px-3 font-medium text-gray-500">Event</th>
              <th className="text-left py-3 px-3 font-medium text-gray-500">
                <button className="flex items-center gap-1 hover:text-gray-700">
                  Time &amp; date <ChevronsUpDown size={12} />
                </button>
              </th>
              <th className="text-left py-3 px-3 font-medium text-gray-500">
                <button className="flex items-center gap-1 hover:text-gray-700">
                  Field <ChevronsUpDown size={12} />
                </button>
              </th>
              <th className="text-left py-3 px-3 font-medium text-gray-500">
                <button className="flex items-center gap-1 hover:text-gray-700">
                  Club <ChevronsUpDown size={12} />
                </button>
              </th>
              <th className="text-right py-3 px-3 font-medium text-gray-500">Details</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  No events found
                </td>
              </tr>
            ) : (
              paginated.map((event, idx) => (
                <tr
                  key={event.id}
                  className={`border-b border-gray-100 transition-colors hover:opacity-90 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <td className="py-3 px-3 text-gray-500">{start + idx + 1}</td>
                  <td className="py-3 px-3 font-medium">{event.event_name}</td>
                  <td className="py-3 px-3 text-gray-600">{event.time_date}</td>
                  <td className="py-3 px-3 text-gray-600">{event.field}</td>
                  <td className="py-3 px-3 text-gray-600">{event.club}</td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href={`/dashboard/event/${event.id}`}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-4 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => handleRowsPerPage(Number(e.target.value))}
            className="border border-gray-200 rounded px-1 py-0.5 text-sm outline-none"
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <span>
          {filtered.length === 0
            ? "0"
            : `${start + 1}–${Math.min(start + rowsPerPage, filtered.length)}`}{" "}
          of {filtered.length}
        </span>

        <div className="flex items-center gap-1">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
