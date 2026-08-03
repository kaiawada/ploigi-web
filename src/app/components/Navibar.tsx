'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = { label: string; href: string };

const navLinks: Record<string, NavLink[]> = {
  "/": [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blogs" },
  ],
  "/about": [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blogs" },
  ],
  "/blogs": [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ],
};

export default function Navibar() {
  const pathname = usePathname();

  // ブログ詳細ページ（/blogs/sorevi/...）はblogsと同じ項目にする
  const key = pathname.startsWith("/blogs/") ? "/blogs" : pathname;
  const links = navLinks[key] ?? navLinks["/"];

  return (
    <header className="text-gray-600 body-font">
      <div className="w-full flex p-5 flex-row items-center">
        <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="text-xl"></span>
        </Link>
        <div className="ml-auto flex items-center">
          <nav className="flex flex-wrap items-center text-base">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="mr-5 text-gray-500 hover:text-gray-900 hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/login" className="inline-flex items-center text-gray-500 hover:text-gray-900 hover:underline text-base">
            Login
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
