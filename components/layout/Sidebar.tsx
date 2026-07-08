"use client";

import React, { useState } from "react";
import { Menu, X, ChevronDown, Send, Package, Truck, Award, Users, Phone, FileText } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const languages = ["FR", "EN", "AR"];

  const navItems = [
    { name: "HOME", href: "#", icon: Users },
    { name: "PRODUCTS", href: "#", icon: Package },
    { name: "LOGISTICS", href: "#", icon: Truck },
    { name: "QUALITY & CERTIFICATION", href: "#", icon: Award },
    { name: "ABOUT US", href: "#", icon: FileText },
    { name: "CONTACT", href: "#", icon: Phone },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-md bg-[#ff6b00] p-2 text-white lg:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-80 transform bg-[#0b132b] text-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-gray-800 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6b00]">
                <span className="text-xl font-black text-white">AM</span>
              </div>
              <div>
                <div className="text-lg font-bold tracking-wide">ALGERIA METAL</div>
                <div className="text-[9px] tracking-wider text-gray-400">EXPORT SOLUTIONS</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-md p-1 text-gray-400 hover:text-white lg:hidden"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition hover:bg-white/10"
              >
                <item.icon size={18} />
                {item.name}
              </a>
            ))}
          </nav>

          {/* RFQ Button */}
          <div className="p-4">
            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#ff6b00] py-2.5 text-sm font-bold transition hover:bg-[#e05e00]">
              <Send size={16} />
              REQUEST QUOTATION
            </button>
          </div>

          {/* Language selector */}
          <div className="border-t border-gray-800 p-4">
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex w-full items-center justify-between rounded-md border border-gray-700 px-3 py-2 text-sm hover:border-[#ff6b00]"
              >
                <span>{selectedLanguage}</span>
                <ChevronDown size={14} className={`transition-transform ${languageOpen ? "rotate-180" : ""}`} />
              </button>
              {languageOpen && (
                <div className="absolute bottom-full left-0 mb-1 w-full rounded-md border border-gray-700 bg-[#0b132b] shadow-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setLanguageOpen(false);
                      }}
                      className={`block w-full px-3 py-2 text-left text-sm hover:bg-white/10 ${
                        selectedLanguage === lang ? "text-[#ff6b00]" : ""
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
