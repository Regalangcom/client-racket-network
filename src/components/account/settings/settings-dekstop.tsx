import React, { useState } from "react";
// import Link from "next/link";
// import { AccountMenuItemType } from './AccountMenuItem';
import { AccountMenuItemType } from "../account-menu-Item";
import Image from "next/image";

interface DesktopSettingsViewProps {
  user: {
    name: string;
    phone: string;
  };
  menuItems: AccountMenuItemType[];
}

export const DesktopSettingsView: React.FC<DesktopSettingsViewProps> = ({
  menuItems,
}) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(menuItems[0]);

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar Menu */}
      <div className="w-1/4 bg-white p-6 border-r">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
          <h2 className="text-xl font-semibold"></h2>
          <p className="text-gray-500"></p>
        </div>
        <nav className="mt-10">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedMenuItem(item)}
              className={`flex items-center p-3 cursor-pointer ${
                selectedMenuItem.title === item.title
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              } rounded-lg transition-colors`}
            >
              <span className="mr-4 text-xl">
                <Image src={item.icon} width={23} height={23} alt="icon" />
              </span>
              <span className="flex-grow text-base">{item.title}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 bg-gray-100 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">
            {selectedMenuItem.title} Settings
          </h1>
          {/* Render specific content based on selected menu item */}
          {selectedMenuItem.title === "Security" && <SecuritySettingsContent />}
          {selectedMenuItem.title === "Notifications" && (
            <NotificationsSettingsContent />
          )}
          {/* Add more conditional renderings */}
        </div>
      </div>
    </div>
  );
};

// Example content components
const SecuritySettingsContent = () => (
  <div>
    <h2>Security Settings</h2>
    {/* Add security-related settings */}
  </div>
);

const NotificationsSettingsContent = () => (
  <div>
    <h2>Notification Preferences</h2>
    {/* Add notification settings */}
  </div>
);
