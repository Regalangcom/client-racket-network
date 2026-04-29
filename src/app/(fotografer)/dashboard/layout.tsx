import React from "react";
import FotograferSidebar from "@/components/fotografer/sidebar";
import FotograferTopNavbar from "@/components/fotografer/top-navbar";

export default function FotograferDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <FotograferSidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <FotograferTopNavbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
