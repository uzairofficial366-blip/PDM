"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Our Team" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      {/* Top bar */}
      <div className="bg-pdmBlue-500 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>📞 0092-91-5863189 | ✉ zertashiashah@gmail.com</span>
          <span className="hidden sm:block">
            Reg. No: 1331/5/7464 | Societies Act XXI of 1860
          </span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pdmGreen-500 to-pdmBlue-500 flex items-center justify-center shadow-md">
              <span className="text-white font-black text-lg">PDM</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-black text-pdmBlue-600 text-base leading-tight">
                Pak Development
              </div>
              <div className="font-black text-pdmGreen-500 text-base leading-tight">
                Mission
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  pathname === link.href
                    ? "text-pdmGreen-600 bg-pdmGreen-50"
                    : "text-gray-700 hover:text-pdmGreen-600 hover:bg-pdmGreen-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/volunteer"
              className="ml-2 btn-primary text-sm px-4 py-2"
            >
              Join Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === link.href
                    ? "text-pdmGreen-600 bg-pdmGreen-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Link
                href="/volunteer"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full text-sm"
              >
                Join as Volunteer
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
