import React from "react";
import Mdxfy from "@/components/ui/mdxfy";
import dynamic from "next/dynamic";
import { LazyThemeSwitcher } from "@/components/ui/theme-switcher";
import { useTranslations } from "next-intl";
import { LazyLanguageSelector } from "@/components/ui/language-selector";
import { cn, getPortfolioUrl, getWebUrl } from "@/lib/utils";
import Link from "@/components/link";
import { useUser } from "@/contexts/auth-provider";
import UserOptionsButton from "./ux/user-options-button";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";

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
  const { user } = useUser();

  return (
    <Navbar
      className="top-0 left-0 z-50 fixed bg-slate-50/60 dark:bg-stone-900/60 shadow-sm backdrop-blur-sm border-b dark:border-b-stone-950/50 w-full transition-colors"
      shouldHideOnScroll
    >
      <NavbarBrand className="flex flex-row flex-1 justify-start items-center gap-4">
        <Link href="/">
          <Mdxfy.Logo className="w-36 h-9 translate-y-1" />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex space-x-4" justify="center">
        <NavbarItem>
          <Link
            href={`${getPortfolioUrl()}/about`}
            className="font-bold text-gray-700 hover:text-gray-900 dark:hover:text-gray-300 dark:text-gray-200 hover:underline"
          >
            {t("UI.redirects.about") as string}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href={`${getWebUrl()}`}
            className="font-bold text-gray-700 hover:text-gray-900 dark:hover:text-gray-300 dark:text-gray-200 hover:underline"
          >
            {t("UI.redirects.application") as string}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent
        className="flex flex-row flex-1 items-center gap-4"
        justify="end"
      >
        <LanguageSelector className="text-2xl" />
        <NavbarItem>
          <ThemeSwitcher className={cn(user ? "md:flex hidden" : "flex")} />
        </NavbarItem>
        {user && (
          <NavbarItem>
            <UserOptionsButton />
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
