"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserProfile from "@/components/UserProfile";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AccountPage() {
  const [user, setUser] = useState<{
    username: string;
    password: string;
    role: string;
  }>({ username: "", password: "", role: "" });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/logins");
      return;
    }
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser({
          username: data.username,
          password: data.password || "********",
          role: data.role || "User",
        });
      } catch {
        router.push("/logins");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        Loading...
      </div>
    );
  return <UserProfile user={user} />;
}
