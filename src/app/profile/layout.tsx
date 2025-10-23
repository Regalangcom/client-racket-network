"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

interface User {
  id: number;
  email: string;
  profile: {
    id: number;
    pictureUrl: string;
    location: string;
    picture: string;
    // bio: string;
    userId: number;
  };
}

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Debug session
  useEffect(() => {
    console.log("Full session:", session);
    console.log("Status:", status);
    console.log("Access token:", session?.user?.access_token);
  }, [session, status]);

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  // Fetch user data
  useEffect(() => {
    const fetchProfile = async () => {
      // Check for access token in user object OR at session level
      const accessToken = session?.user?.access_token || session?.access_token;

      if (status === "authenticated" && accessToken) {
        console.log("Access Token:", accessToken);

        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_URL_API}/auth/api/v1/users/me`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setUser(response?.data.data);
          setError(null);
        } catch (error) {
          console.error("Error fetching user:", error);
          if (axios.isAxiosError(error)) {
            setError(error.response?.data?.message || "Failed to fetch user");
          } else {
            setError("An unknown error occurred");
          }
        }
      }
    };

    fetchProfile();
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Please sign in</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 mb-4">
        <p className="mb-2">
          <strong>Email:</strong> {user?.email || "Loading..."}
        </p>
        <p>
          <strong>ID:</strong> {user?.id || "Loading..."}
          <Image
            width={96}
            height={96}
            src={
              user?.profile?.pictureUrl
                ? user.profile.pictureUrl
                : user?.profile?.picture &&
                  user.profile.picture.startsWith("http")
                ? user.profile.picture
                : user?.profile?.picture
                ? `/${user.profile.picture}`
                : "/default-avatar.png"
            }
            alt="Profile Picture"
            onError={(e) => {
              // Fallback jika gambar gagal dimuat
              e.currentTarget.src = "/default-avatar.png";
            }}
          />
        </p>
      </div>

      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Debug Info:</h2>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold">Session:</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
          <div className="bg-gray-100 p-4 rounded mt-4">
            <h3 className="font-semibold">Profile:</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
