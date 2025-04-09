import React from "react";
import Agrofast from "@/components/ui/agrofast";

import dynamic from "next/dynamic";
import { LazyThemeSwitcher } from "@/components/ui/theme-switcher";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LazyLanguageSelector } from "@/components/ui/language-selector";
import { cn, getPortfolioUrl, getWebUrl } from "@/lib/utils";
import Link from "@/components/link";
import UserOptionsMenu from "./ui/user-options-menu";
import { AccountSetting02Icon, Logout01Icon } from "@hugeicons/react";
import { useAuth } from "@/contexts/auth-provider";
import LinkOption from "./ui/link-option";
import ThemeUserFeedback from "./ux/theme-user-feedback";
import { useTheme } from "next-themes";

const ThemeSwitcher = dynamic(() => import("@/components/ui/theme-switcher"), {
  ssr: false,
  loading: () => <LazyThemeSwitcher />,
});

const LanguageSelector = dynamic(
  () => import("@/components/ui/language-selector"),
  {
    ssr: false,
    loading: () => <LazyLanguageSelector />,
  }
);

const Header: React.FC = () => {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const { logout, user } = useAuth();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.header className="top-0 left-0 z-50 fixed bg-slate-50/60 dark:bg-stone-900/60 shadow-sm backdrop-blur-sm border-b dark:border-b-stone-950/50 w-full transition-colors">
      <div className="flex justify-between items-center mx-auto p-4 container">
        <div className="flex flex-row flex-1 justify-start items-center gap-4">
          <Link href="/">
            <Agrofast.Logo className="w-36 h-9 translate-y-1" />
          </Link>
        </div>
        <div className="hidden md:block space-x-4">
          <Link
            href={`${getPortfolioUrl()}/about`}
            className="font-bold text-gray-700 hover:text-gray-900 dark:hover:text-gray-300 dark:text-gray-200 hover:underline"
          >
            {t("UI.redirects.about") as string}
          </Link>
          <Link
            href={`${getWebUrl()}`}
            className="font-bold text-gray-700 hover:text-gray-900 dark:hover:text-gray-300 dark:text-gray-200 hover:underline"
          >
            {t("UI.redirects.application") as string}
          </Link>
        </div>
        <div className="flex flex-row flex-1 justify-end items-center gap-4">
          <LanguageSelector className="text-2xl" />
          <ThemeSwitcher
            className={cn("text-2xl", user ? "md:flex hidden" : "flex")}
          />
          {user && (
            <UserOptionsMenu>
              <LinkOption href="/profile" icon={AccountSetting02Icon}>
                {t("UI.redirects.profile")}
              </LinkOption>
              <LinkOption
                href=""
                onClick={toggleTheme}
                className="md:hidden flex"
                icon={<ThemeUserFeedback />}
              >
                {t("UI.redirects.change_theme")}
              </LinkOption>
              <LinkOption onClick={logout} href="/login" icon={Logout01Icon}>
                {t("UI.redirects.logout")}
              </LinkOption>
            </UserOptionsMenu>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
