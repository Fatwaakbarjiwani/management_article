"use client";
import { useRouter } from "next/navigation";

interface UserProfileProps {
  user: {
    username: string;
    password: string;
    role: string;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-archivo ">
      <h2 className="text-xl font-semibold mb-6">User Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700 mb-4">
          {user.username?.charAt(0)?.toUpperCase()}
        </div>
        <div className="w-full max-w-xs space-y-3">
          <div className="flex items-center bg-gray-200 px-2 rounded">
            <span className="w-24 text-gray-600 font-medium">Username</span>
            <span className="mx-1 font-bold">:</span>
            <input
              className="flex-1 rounded px-3 py-2 outline-none bg-gray-200"
              value={user.username}
              readOnly
            />
          </div>
          <div className="flex items-center bg-gray-200 px-2 rounded">
            <span className="w-24 text-gray-600 font-medium">Role</span>
            <span className="mx-1 font-bold">:</span>
            <input
              className="flex-1 rounded px-3 py-2 outline-none bg-gray-200"
              value={user.role}
              readOnly
            />
          </div>
        </div>
      </div>
      <button
        className="bg-blue-600 max-w-xs w-full hover:bg-blue-700 text-white rounded px-8 py-2 font-semibold transition"
        onClick={() => router.push("/")}
      >
        Back to home
      </button>
    </div>
  );
}
