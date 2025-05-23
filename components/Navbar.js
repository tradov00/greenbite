"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Health Goals", href: "/goals" },
    { name: "Community", href: "/community" },
    { name: "Recipes", href: "/recipes" },
  ];

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <nav className="bg-green-600 text-white shadow">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="GreenBite logo"
            width={56}
            height={56}
            className="object-contain"
          />
          <span className="text-2xl font-bold text-white">GreenBite</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded font-semibold transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "bg-white text-green-700 hover:text-orange-600 hover:bg-orange-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          {!user ? (
            <Link
              href="/login"
              className={`px-4 py-2 rounded font-semibold transition ${
                pathname === "/login"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-green-700 hover:text-orange-600 hover:bg-orange-100"
              }`}
            >
              Log In
            </Link>
          ) : (
            <div className="relative inline-block text-left">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold"
                aria-haspopup="true"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-1 z-10 text-green-900">
                  <div className="px-4 py-2 text-sm font-bold">Hello, {user.name}</div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-300"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-green-700 px-6 py-4 space-y-2 text-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 rounded font-semibold transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "bg-white text-green-700 hover:text-orange-600 hover:bg-orange-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          {!user ? (
            <Link
              href="/login"
              className={`block px-4 py-2 rounded font-semibold transition ${
                pathname === "/login"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-green-700 hover:text-orange-600 hover:bg-orange-100"
              }`}
            >
              Log In
            </Link>
          ) : (
            <div className="relative inline-block text-left">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold mx-auto"
                aria-haspopup="true"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-1 z-10 text-green-900">
                  <div className="px-4 py-2 text-sm font-bold">
                    Hello, {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-300"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
