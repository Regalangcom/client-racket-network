import React from "react";
import { AccountMenu } from "./accountMenu/title-menu";
import { UserProfileCard } from "./user-profile-card";
import { AccountMenuItem, AccountMenuItemType } from "./account-menu-Item";
import { useRouter } from "next/navigation";
import { User } from "@/app/(application)/account/page";
import { signOut } from "next-auth/react";

interface MobileAccountViewProps {
  user: User;
  menuItems: AccountMenuItemType[];
}

export const MobileAccountView: React.FC<MobileAccountViewProps> = ({
  user,
  menuItems,
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/sign-in" });
    } catch (err) {
      console.error("Logout gagal:", err);
    }
  };

  return (
    // <div className="w-full min-h-screen px-0">
    //   <div className="w-full h-full mt-24">
    //     <AccountMenu title="Account" />

    //     <div className="">
    //       <UserProfileCard
    //         picture={user.profile.pictureUrl}
    //         username={user.username}
    //         phone={user.email}
    //         onPress={() => {
    //           /* Handle profile press */
    //           router.push("/account/profile");
    //         }}
    //       />

    //       <div className="h-[7px] bg-gray-100 my-2"></div>

    //       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    //         {menuItems.map((item, index) => (
    //           <React.Fragment key={index}>
    //             {index === 4 && <div className="h-[7px] bg-gray-100"></div>}
    //             <AccountMenuItem
    //               {...item}
    //               isLastItem={index === menuItems.length - 1}
    //             />
    //           </React.Fragment>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full min-h-screen px-0">
      <div className="w-full h-full mt-24">
        <AccountMenu title="Account" />
        <div>
          <UserProfileCard
            picture={user.profile.pictureUrl}
            username={user.username}
            phone={user.email}
            onPress={() => router.push("/account/profile")}
          />

          <div className="h-[7px] bg-gray-100 my-2"></div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                {index === 4 && <div className="h-[7px] bg-gray-100"></div>}

                {/* Kalau item logout, panggil handleLogout */}
                {item.title === "Log out" ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center relative">
                      <span className="mr-4 text-xl">
                        {/* <item.icon width={23} height={23} /> */}
                      </span>
                      <span className="text-base">{item.title}</span>
                    </div>
                  </button>
                ) : (
                  <AccountMenuItem
                    {...item}
                    isLastItem={index === menuItems.length - 1}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
