"use client";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const router = useRouter();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Health Goals", href: "/goals" },
    { name: "Community", href: "/community" },
    { name: "Products", href: "/products" },
  ];

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <nav className="bg-green-600 text-white shadow">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Name (Left) */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="GreenBite logo"
            className="w-14 h-14 object-contain"
          />
          <span className="text-2xl font-bold text-white">GreenBite</span>
        </div>

        {/* Nav Links (Right - Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="bg-white text-green-700 hover:text-orange-600 hover:bg-orange-100 px-4 py-2 rounded font-semibold transition"
            >
              {item.name}
            </Link>
          ))}

          {/* User area */}
          {!user ? (
            <Link
              href="/login"
              className="bg-white text-green-700 hover:text-orange-600 hover:bg-orange-100 px-4 py-2 rounded font-semibold transition"
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
                  <div className="px-4 py-2 text-sm">Hello, {user.name}</div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-middle px-4 py-2 text-sm text-red-600 hover:bg-red-300"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-green-700 px-6 py-4 space-y-2 text-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block bg-white text-green-700 hover:text-orange-600 hover:bg-orange-100 px-4 py-2 rounded font-semibold transition"
            >
              {item.name}
            </Link>
          ))}
          {!user ? (
            <Link
              href="/login"
              className="block bg-white text-green-700 hover:text-orange-600 hover:bg-orange-100 px-4 py-2 rounded font-semibold transition"
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
                  <div className="px-4 py-2 text-sm">Hello, {user.name}</div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-middle px-4 py-2 text-sm text-red-600 hover:bg-red-300"
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
