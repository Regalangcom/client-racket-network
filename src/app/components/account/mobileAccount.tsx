import React from "react";
import { AccountHeader } from "./accountHeader";
import { UserProfileCard } from "./userProfileCard";
import { AccountMenuItem, AccountMenuItemType } from "./accountMenuItem";

interface MobileAccountViewProps {
  user: {
    name: string;
    phone: string;
  };
  menuItems: AccountMenuItemType[];
}

export const MobileAccountView: React.FC<MobileAccountViewProps> = ({
  user,
  menuItems,
}) => (
  <div className="w-full min-h-screen px-0">
    <div className="w-full h-full mt-24">
      <AccountHeader title="Account" />

      <div className="">
        <UserProfileCard
          name={user.name}
          phone={user.phone}
          onPress={() => {
            /* Handle profile press */
          }}
        />

        <div className="h-[7px] bg-gray-100 my-2"></div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {index === 4 && <div className="h-[7px] bg-gray-100"></div>}
              <AccountMenuItem
                {...item}
                isLastItem={index === menuItems.length - 1}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  </div>
);
