"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";

export default function SuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [hasAuthenticated, setHasAuthenticated] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const getToken = searchParams.get("token");

  useEffect(() => {
    const handleAuthentication = async () => {
      if (getToken) {
        try {
          const result = await signIn("credentials", {
            access_token: getToken,
            redirect: false,
          });
          if (result?.ok) {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_URL_API}/api/v1/users/me`,
              { withCredentials: true }
            );
            const userData = response.data.data;
            localStorage.setItem("user", JSON.stringify(userData));
            // setUsers(userData);
            router.push("/profile");
          } else if (result?.error) {
            router.push("/sign-in");
          }
        } catch (error) {
          console.error("Authentication Error:", error);
          setError("Authentication failed. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    handleAuthentication();
  }, [getToken, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-center">
          <h2 className="text-xl font-semibold mb-2">
            Completing authentication...
          </h2>
          <p>Please wait while we set up your session</p>
        </div>
      </div>
    );
  }

  if (error) {
    // if (users) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Authentication Error</h2>
          <p>{error}</p>
          <button
            onClick={() =>
              (window.location.href = "http://localhost:8000/auth/google")
            }
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
    // }
  }

  return null;
}
