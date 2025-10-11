import React from "react";
import { AccountMenu } from "./accountMenu/accountMenu";
import { UserProfileCard } from "./user-profile-card";
import { AccountMenuItem, AccountMenuItemType } from "./account-menu-Item";
import { useRouter } from "next/navigation";
import { User } from "@/app/(application)/account/page";

interface MobileAccountViewProps {
  user: User;
  menuItems: AccountMenuItemType[];
}

export const MobileAccountView: React.FC<MobileAccountViewProps> = ({ user, menuItems }) => {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen px-0">
      <div className="w-full h-full mt-24">
        <AccountMenu title="Account" />

        <div className="">
          <UserProfileCard
            image={user.profile.picture}
            name={user.username}
            phone={user.email}
            onPress={() => {
              /* Handle profile press */
              router.push("/account/profile");
            }}
          />

          <div className="h-[7px] bg-gray-100 my-2"></div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                {index === 4 && <div className="h-[7px] bg-gray-100"></div>}
                <AccountMenuItem {...item} isLastItem={index === menuItems.length - 1} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
