// components/account/AccountPage.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import { ChevronRight } from "lucide-react";

export default function AccountPage() {
  const { isMobile } = useWindowDimension();
  const [user, setUser] = useState({
    name: "Titin Suratin",
    phone: "081234567890",
  });

  const accountMenuItems = [
    {
      icon: "⚙️",
      title: "Settings",
      path: "/account/settings",
      hasNotification: false,
    },
    {
      icon: "📨",
      title: "Inbox",
      path: "/account/inbox",
      hasNotification: true,
    },
    {
      icon: "💰",
      title: "Payment",
      path: "/account/payment",
      hasNotification: false,
    },
    {
      icon: "⭐",
      title: "Review",
      path: "/account/review",
      hasNotification: false,
    },
    {
      icon: "🚪",
      title: "Log out",
      path: "/logout",
      hasNotification: false,
    },
  ];

  // Render Mobile View
  const MobileView = () => (
    <div className="w-[420px] mt-32 min-h-screen px-4">
      <div className="max-w-full mb-4">
        <span className="text-2xl font-bold">Account</span>
      </div>

      <div className="bg-white rounded-lg mb-4 flex max-w-sm">
        {/* note create avatar */}
        <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.phone}</p>
        </div>
        <ChevronRight className="text-2xl text-gray-600" />
      </div>

      {/* Divider */}
      <div className="h-[7px] bg-gray-200"></div>

      <div className="bg-white rounded-lg shadow-md">
        {accountMenuItems.map((item, index) => (
          <>
            {index === 4 && <div className="h-[7px] bg-gray-200"></div>}

            <Link
              key={index}
              href={item.path}
              className={`block ${
                index !== accountMenuItems.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center relative">
                  <span className="mr-4">{item.icon}</span>
                  <span>{item.title}</span>
                  {item.hasNotification && (
                    <span className="absolute -top-2 -right-3 w-3 h-3 bg-red-500 rounded-full"></span>
                  )}
                </div>
                <ChevronRight className="text-2xl text-gray-600" />
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );

  // Render Desktop View
  const DesktopView = () => (
    <div className="flex w-full h-screen">
      {/* Sidebar Profile */}
      <div className="w-1/4 bg-white p-6 border-r">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.phone}</p>
        </div>

        {/* Desktop Menu */}
        <nav className="mt-10">
          {accountMenuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex items-center p-3 hover:bg-gray-100 rounded-lg group"
            >
              <span className="mr-4">{item.icon}</span>
              <span className="flex-grow">{item.title}</span>
              {item.hasNotification && (
                <span className="w-3 h-3 bg-red-500 rounded-full ml-2"></span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 bg-gray-100 p-8">
        {/* Placeholder for account page content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Account Dashboard</h1>
          {/* Add more content here */}
        </div>
      </div>
    </div>
  );

  // Conditional Rendering based on device
  return isMobile ? <MobileView /> : <DesktopView />;
}
