"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/logins" || pathname === "/registers") {
    return null;
  }
  return (
    <footer className="bg-[#4A90E2] w-full p-8 mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-white text-sm font-archivo">
        <img src="iconLogo2.svg" alt="" />
        <span className="mx-2">© 2025 Blog genzet. All rights reserved.</span>
      </div>
    </footer>
  );
}
