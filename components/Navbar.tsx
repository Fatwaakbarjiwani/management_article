"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

export default function Navbar() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const pathname = usePathname();
  const [navbar, setNavbar] = useState<string>("mode1");
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ username?: string; role?: string }>({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getMe = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers: Record<string, string> = {
          Authorization: `Bearer ${token}`,
        };
        const response = await fetch(`${BASE_URL}/auth/profile`, {
          headers,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to fetch user data. Please log in again.",
          icon: "error",
        }).finally(() => {
          localStorage.removeItem("token");
          if (pathname !== "/logins" && pathname !== "/registers") {
            router.push("/logins");
          }
        });
        return error;
      }
    };
    getMe();
  }, [BASE_URL, router, pathname]);

  useEffect(() => {
    if (pathname.startsWith("/detailArticles/") || pathname === "/account") {
      setNavbar("mode2");
    } else {
      setNavbar("mode1");
    }
  }, [pathname]);

  useEffect(() => {
    if (navbar !== "mode1") return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navbar]);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout",
      text: "Are you sure want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2563eb",
    });
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      router.push("/logins");
    }
  };

  if (pathname === "/logins" || pathname === "/registers") {
    return null;
  }

  return (
    <div
      className={`p-4 md:p-6 w-full font-archivo border-b border-gray-200 sm:border-none fixed top-0 z-50 flex items-center justify-between
        ${
          navbar === "mode1"
            ? `${
                isScrolled
                  ? "backdrop-blur-md bg-primary/30 shadow"
                  : "bg-transparent"
              } transition-colors duration-300`
            : "bg-white border-b border-gray-200 shadow"
        }
      `}
    >
      {navbar === "mode1" ? (
        <>
          <img
            src="/iconLogo2.svg"
            className="hidden sm:block cursor-pointer"
            alt="Logo"
            onClick={() => router.push("/")}
          />
          <img
            src="/iconLogo.svg"
            className="sm:hidden block cursor-pointer"
            alt="Logo"
            onClick={() => router.push("/")}
          />
        </>
      ) : (
        <>
          <img
            src="/iconLogo.svg"
            className="block cursor-pointer"
            alt="Logo"
            onClick={() => router.push("/")}
          />
        </>
      )}
      <div className="flex gap-2 items-center relative">
        <div
          className="p-2 rounded-full text-2xl border border-blue-200 flex items-center justify-center w-8 h-8 bg-blue-200 cursor-pointer"
          onClick={() => setDropdownOpen((v) => !v)}
        >
          <p className="text-blue-900">
            {user?.username?.charAt(0)?.toUpperCase() || ""}
          </p>
        </div>
        <p
          className={`${
            navbar === "mode1" ? "text-white" : "text-blue-900"
          } underline underline-offset-3 text-base hidden sm:block cursor-pointer`}
          onClick={() => setDropdownOpen((v) => !v)}
        >
          {user?.username}
        </p>
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50 animate-fade-in"
          >
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-t-lg"
              onClick={() => {
                setDropdownOpen(false);
                router.push("/account");
              }}
            >
              My Account
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 rounded-b-lg"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
