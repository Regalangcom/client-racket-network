// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { LockIcon, LogOutIcon, UserIcon } from "lucide-react";
// import profileImage from "@/app/images/profile.jpeg";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { getSession, useSession } from "next-auth/react";

// function ProfileLayout({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [profile, setProfile] = useState<any | null>(null);
//   const [profileGoogle, setProfileGoogle] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { data: session, status } = useSession({
//     required: true,
//     onUnauthenticated() {
//       router.push("/sign-in");
//     },
//   });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const session = await getSession();
//         console.log("session", session);
//         if (!session) {
//           router.push("/sign-in");
//         }
//         if (session) {
//           setProfile(session.user); // Simpan data user dari session
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         router.push("/sign-in");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [session, status, router]);

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:8000/api/v1/users/logout", {
//         withCredentials: true,
//       });

//       sessionStorage.removeItem("userProfile");
//       router.push("/sign-in");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // Pastikan kode ini hanya berjalan di sisi klien
//       const userData = localStorage.getItem("user");
//       if (userData) {
//         const parsedUserData = JSON.parse(userData);
//         console.log("Parsed user data:", parsedUserData);
//         setProfileGoogle(parsedUserData); // Simpan data ke state
//       }
//     }
//   }, []); // Hanya dijalankan sekali saat komponen pertama kali dimuat

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   return (
//     <section>
//       <header className="py-3 w-full bg-zinc-50 rounded mb-3 flex justify-end px-4">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="secondary" size="icon" className="rounded-full">
//               <Avatar className="h-9 w-9">
//                 <AvatarImage
//                   src={profileGoogle?.profile?.picture || profileImage.src}
//                   // src={profile?.profile?.picture || profileImage.src}
//                   alt={profileGoogle?.name}
//                 />
//                 <AvatarFallback>{profile?.name?.charAt(0)}</AvatarFallback>
//               </Avatar>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             <DropdownMenuLabel>{profile?.name}</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>
//               <UserIcon className="mr-2 h-4 w-4" />
//               Edit Profile
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <LockIcon className="mr-2 h-4 w-4" />
//               Change Password
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               className="text-destructive"
//               onClick={handleLogout}
//             >
//               <LogOutIcon className="mr-2 h-4 w-4" />
//               Logout
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </header>
//       {children}
//     </section>
//   );
// }

// export default ProfileLayout;
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
  id: number;
  email: string;
}

const ProfilePage = () => {
  const { data: session, status } = useSession();
  console.log("session", session?.user);
  const accessToken = session;
  console.log("Access Token:", accessToken); // Pastikan token ada di sini

  const [profile, setProfile] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in"); // Arahkan ke halaman login jika tidak ada session
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.access_token) {
      // console.log("Access Token 2:", session.user.access_token);
      const fetchProfile = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_URL_API}/auth/api/v1/users/me`,
            {
              headers: {
                Authorization: `Bearer ${session.access_token}`,
              },
            }
          );
          setProfile(response.data.data); // Menyimpan data pengguna
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // if (!profile) {
  //   return <div>No profile data available</div>;
  // }

  return (
    <div>
      <h1>Profile</h1>
      {/* <p>Name: {profile.name}</p> */}
      <p>Email: {profile?.email}</p>
      {/* <img src={profile.picture || "/default-profile.jpg"} alt="Profile" /> */}
    </div>
  );
};

export default ProfilePage;
