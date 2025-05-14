"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Health Goals", href: "/goals" },
    { name: "Community", href: "/community" },
    { name: "Products", href: "/products" },
    { name: "Login", href: "/login" },
  ];

  return (
    <nav className="bg-green-600 text-white shadow">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Name (Left) */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="GreenBite logo" className="w-14 h-14 object-contain" />
          <span className="text-2xl font-bold text-white">GreenBite</span>
        </div>

        {/* Nav Links (Right - Desktop) */}
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="bg-white text-green-700 hover:text-orange-600 hover:bg-orange-100 px-4 py-2 rounded font-semibold transition"
            >
              {item.name}
            </a>
          ))}
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
            <a
              key={item.name}
              href={item.href}
              className="block bg-white text-green-700 hover:text-orange-600 hover:bg-orange-100 px-4 py-2 rounded font-semibold transition"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
