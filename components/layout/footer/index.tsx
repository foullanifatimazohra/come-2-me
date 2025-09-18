/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { languages } from "../header/laguage-switcher";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
          {/* Logo */}
          <div className="col-span-1 flex flex-col items-start">
            <Image
              src="/logo.svg"
              alt="Come 2 Me Logo"
              width={140}
              height={50}
              className="mb-6"
            />
          </div>

          {/* Columns from translations */}
          {t.raw("columns").map((col: any, idx: number) => (
            <div key={idx}>
              <h3 className="font-semibold text-center text-[22px] mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2 text-center text-sm text-gray-700">
                {col.links.map((link: any, i: number) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="hover:underline font-medium text-lg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* App Stores */}
          <div className="flex gap-4">
            <Link href="#">
              <Image
                src="/google-play.svg"
                alt="Google Play"
                width={140}
                height={45}
              />
            </Link>
            <Link href="#">
              <Image
                src="/app-store.svg"
                alt="App Store"
                width={140}
                height={45}
              />
            </Link>
          </div>
          <div className="space-y-5 flex flex-col items-center">
            {/* Social Media */}
            <div className="flex gap-4 items-center">
              <Link href={t("social.facebook")}>
                <Image
                  src="/images/facebook.svg"
                  alt="Facebook"
                  width={34}
                  height={34}
                />
              </Link>
              <Link href={t("social.instagram")}>
                <Image
                  src="/images/instagram.svg"
                  alt="Instagram"
                  width={39}
                  height={39}
                />
              </Link>
              <Link href={t("social.tiktok")}>
                <Image
                  src="/images/tiktok.svg"
                  alt="TikTok"
                  className="object-fill"
                  width={34}
                  height={34}
                />
              </Link>
              <Link href={t("social.youtube")}>
                <Image
                  src="/images/youtube.svg"
                  alt="YouTube"
                  className="object-cover"
                  width={42}
                  height={42}
                />
              </Link>
            </div>
            {/* Language & Country */}
            <div className="flex gap-4">
              <Button
                aria-label="Language switch"
                size="default"
                className="gap-2"
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
              <Button className="flex gap-2">
                <Image
                  src="/images/algeria.svg"
                  alt="Algeria"
                  width={22}
                  height={22}
                />
                {t("country")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-4 border-t bg-black border-gray-200 py-6 text-center text-sm text-white">
        {t("bottom.copyright")}
      </div>
    </footer>
  );
};

export default Footer;
