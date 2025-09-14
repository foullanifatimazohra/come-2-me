"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useEffect, useRef, useState } from "react";

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  const languages: Record<string, { name: string; flag: string }> = {
    fr: { name: "Français", flag: "🇫🇷" },
    en: { name: "English", flag: "🇬🇧" },
    ar: { name: "العربية", flag: "🇩🇿" },
  };

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        window.innerWidth >= 640 // sm breakpoint
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left w-full sm:w-auto"
    >
      {/* Dropdown Button */}
      <Button
        aria-label="Language switch"
        onClick={() => setIsOpen(!isOpen)}
        size="default"
        className="flex items-center justify-center gap-2 w-full sm:w-auto"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.892 16.7636L14.412 7.8036C14.3036 7.58682 14.082 7.44989 13.8396 7.44989C13.5973 7.44989 13.3757 7.58682 13.2672 7.8036L11.5304 11.278C10.1691 11.2015 8.85924 10.7312 7.76004 9.9244C9.04971 8.54717 9.83112 6.77129 9.97524 4.89L11.92 4.89C12.2735 4.89 12.56 4.60346 12.56 4.25C12.56 3.89654 12.2735 3.61 11.92 3.61L7.44004 3.61L7.44004 2.33C7.44004 1.97654 7.1535 1.69 6.80004 1.69C6.44658 1.69 6.16004 1.97654 6.16004 2.33L6.16004 3.61L1.68004 3.61C1.32658 3.61 1.04004 3.89654 1.04004 4.25C1.04004 4.60346 1.32658 4.89 1.68004 4.89L8.69044 4.89C8.54789 6.45852 7.88208 7.93356 6.80004 9.078C6.12577 8.36654 5.60798 7.52173 5.28004 6.598C5.20664 6.37864 5.02059 6.21596 4.7934 6.17248C4.56621 6.129 4.33324 6.2115 4.18404 6.38826C4.03484 6.56502 3.99263 6.80854 4.07364 7.0252C4.45545 8.1051 5.0569 9.09416 5.84004 9.93C4.63425 10.8161 3.17638 11.2927 1.68004 11.29C1.32658 11.29 1.04004 11.5765 1.04004 11.93C1.04004 12.2835 1.32658 12.57 1.68004 12.57C3.53651 12.5721 5.33977 11.9499 6.80004 10.8036C7.9917 11.7347 9.41424 12.324 10.9152 12.5084L8.78724 16.7636C8.62906 17.0797 8.75711 17.4642 9.07324 17.6224C9.38937 17.7806 9.77386 17.6525 9.93204 17.3364L11.0352 15.13L16.644 15.13L17.7472 17.3364C17.8558 17.5533 18.0775 17.6902 18.32 17.69C18.5418 17.6899 18.7477 17.5749 18.8643 17.3862C18.9808 17.1975 18.9913 16.9619 18.892 16.7636ZM11.6752 13.85L13.84 9.5212L16.004 13.85L11.6752 13.85Z"
            fill="#DEE1E6"
          />
        </svg>

        <span className="">{languages[locale]?.name}</span>
      </Button>

      {/* Accordion style on mobile / Dropdown style on desktop */}
      {isOpen && (
        <div
          className={`
            mt-2 w-full bg-[#171A1F] border rounded-lg shadow-lg 
            ${
              window.innerWidth >= 640
                ? "absolute sm:right-0 sm:w-25"
                : "relative"
            }
          `}
        >
          <div className="py-2">
            {routing.locales.map((lang: string) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`flex items-center gap-2 w-full px-4 py-2 text-left text-white text-lg transition-colors ${
                  lang === locale ? "font-extrabold" : "font-normal"
                } hover:bg-gray-700`}
              >
                <span>{languages[lang]?.flag}</span>
                <span className="hidden sm:inline">
                  {lang.toLocaleUpperCase()}
                </span>
                <span className="sm:hidden">{lang.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
