"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Phone, Menu, X, Globe } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/context";

const translations = {
  en: {
    services: "Services",
    about: "About",
    contact: "Contact",
    quote: "Get Quote",
  },
  es: {
    services: "Servicios",
    about: "Nosotros",
    contact: "Contacto",
    quote: "Cotizar",
  },
};

export function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const t = translations[language];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div ref={headerRef} className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src="/logo.png"
              alt="Coldman JP"
              className={`h-10 sm:h-12 w-auto transition-all duration-300 ${
                isScrolled ? "" : "brightness-0 invert"
              }`}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { href: "#services", label: t.services },
              { href: "#about", label: t.about },
              { href: "#contact", label: t.contact },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors font-medium ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+17875256934"
              className={`flex items-center gap-2 transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">(787) 525-6934</span>
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className={
                isScrolled
                  ? "text-gray-700"
                  : "text-white hover:bg-white/10"
              }
              title={language === "en" ? "Cambiar a Español" : "Switch to English"}
            >
              <Globe className="w-4 h-4" />
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {t.quote}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className={
                isScrolled
                  ? "text-gray-700"
                  : "text-white hover:bg-white/10"
              }
            >
              <Globe className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={
                isScrolled
                  ? "text-gray-700"
                  : "text-white hover:bg-white/10"
              }
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 pb-4 border-t border-white/20 pt-4"
          >
            <nav className="flex flex-col gap-4">
              {[
                { href: "#services", label: t.services },
                { href: "#about", label: t.about },
                { href: "#contact", label: t.contact },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`transition-colors ${
                    isScrolled
                      ? "text-gray-700 hover:text-blue-600"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+17875256934"
                className={`flex items-center gap-2 ${
                  isScrolled ? "text-gray-700" : "text-white/90"
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>(787) 525-6934</span>
              </a>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t.quote}
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
