import React from "react";
import { AccountMenuItemType, AccountMenuItem } from "../accountMenuItem";
import { SettingsHeader } from "./settingsHeader";

interface MobileSettingsViewProps {
  menuItems: AccountMenuItemType[];
}

export const SettingMobileView: React.FC<MobileSettingsViewProps> = ({
  menuItems,
}) => (
  <div className="w-full min-h-screen px-0">
    <div className="mt-24">
      <SettingsHeader title="Settings" showBackButton={true} />
      <div className="h-[7px] bg-gray-100 my-2"></div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {menuItems.map((item, index) => (
          <AccountMenuItem
            key={index}
            {...item}
            isLastItem={index === menuItems.length - 1}
          />
        ))}
      </div>
    </div>
  </div>
);
