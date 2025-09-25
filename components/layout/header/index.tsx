"use client";

import { useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, LogIn, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./laguage-switcher";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const t = useTranslations("header");
  const pathname = usePathname();

  const navigation = t.raw("navigation") as {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
  }[];

  return (
    <header className="fixed top-0 w-full bg-white backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="container mx-auto max-lg:px-6">
        <div className="flex justify-between items-center h-[90px] sm:h-[110px] lg:h-[124px]">
          <div className="flex items-center gap-x-10">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo-come-tome.svg"
                  alt="Logo"
                  width={140}
                  height={70}
                  className="h-auto w-[120px] sm:w-[140px] lg:w-[160px] mr-3"
                />
              </Link>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex relative">
              {navigation.map((item, index) => (
                <div key={index} className="relative">
                  <button
                    className={`capitalize font-semibold text-lg flex items-center py-2 px-4 rounded-md transition-colors ${
                      openDropdown === index
                        ? "bg-black !rounded-full !px-3 text-white"
                        : pathname === item.href
                        ? "font-extrabold text-[#171A1F]"
                        : "text-[#171A1F]"
                    }`}
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                  >
                    {item.children && (
                      <ChevronDown className="mr-[1px] h-6 w-6" />
                    )}
                    {item.label}
                  </button>

                  {item.children && openDropdown === index && (
                    <div className="absolute left-0 mt-2 px-6 py-4 min-w-[260px] space-y-3 bg-[#171A1F] border rounded-lg shadow-lg">
                      {item.children.map((child, i) => (
                        <Link
                          key={i}
                          href={child.href}
                          className={`block text-lg ${
                            pathname === child.href
                              ? "font-extrabold text-white"
                              : "font-normal text-gray-200 hover:text-white"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* CTA Desktop */}
          <div className="hidden lg:flex gap-4 items-center">
            <LanguageSwitcher />
            <Button onClick={() => setIsMenuOpen(false)} size="default">
              {t("cta")}
              <LogIn />
            </Button>
            <Button
              onClick={() => setIsMenuOpen(false)}
              size="default"
              variant="outline"
            >
              {t("singnUp")}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <Button
              aria-label="Toggle Menu"
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-3 pt-4 pb-6 space-y-4 bg-white border-t">
              {navigation.map((item, index) => (
                <div key={index}>
                  <button
                    className="flex w-full justify-between items-center px-3 py-2 text-[#031e32] hover:text-[#FF8200] font-medium"
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                  >
                    {item.label}
                    {item.children && <ChevronDown className="h-4 w-4" />}
                  </button>

                  {item.children && openDropdown === index && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.children.map((child, i) => (
                        <Link
                          key={i}
                          href={child.href}
                          className="block px-3 py-1 text-sm text-[#031e32] hover:text-[#FF8200]"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTA + Language */}
              <div className="flex flex-col gap-4 mt-6">
                <LanguageSwitcher />
                <Button onClick={() => setIsMenuOpen(false)} variant="default">
                  {t("cta")}
                  <LogIn />
                </Button>
                <Button onClick={() => setIsMenuOpen(false)} variant="outline">
                  {t("singnUp")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
