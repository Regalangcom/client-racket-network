import React from "react";
import Link from "next/link";
// import { AccountMenuItemType } from './AccountMenuItem';
import { AccountMenuItemType } from "./account-menu-Item";
import Image from "next/image";

interface DesktopAccountViewProps {
  user: {
    name: string;
    phone: string;
  };
  menuItems: AccountMenuItemType[];
}

export const DesktopAccountView: React.FC<DesktopAccountViewProps> = ({
  user,
  menuItems,
}) => (
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
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className="flex items-center p-3 hover:bg-gray-100 rounded-lg group transition-colors"
          >
            <span className="mr-4 text-xl">
              <Image src={item.icon} width={23} height={23} alt="image" />
            </span>
            <span className="flex-grow text-base">{item.title}</span>
            {item.hasNotification && (
              <span className="w-3 h-3 bg-red-500 rounded-full ml-2"></span>
            )}
          </Link>
        ))}
      </nav>
    </div>

    {/* Main Content Area */}
    <div className="w-3/4 bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Account Dashboard</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
            <ul className="space-y-2">
              <li className="border-b pb-2">Payment processed</li>
              <li className="border-b pb-2">Profile updated</li>
              <li>New message received</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                Update Profile
              </button>
              <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">
                Manage Payments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
