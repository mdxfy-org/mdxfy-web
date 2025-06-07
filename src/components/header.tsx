import React from "react";
import Mdxfy from "@/components/ui/mdxfy";
import { cn } from "@/lib/utils";
import Link from "@/components/link";
import { useUser } from "@/contexts/auth-provider";
import UserOptionsButton from "./ux/user-options-button";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import CompactLanguageSelector from "./ux/compact-language-selector";
import { Button, Link as HeroUILink } from "@heroui/react";
import { Pen } from "@solar-icons/react";
import dynamic from "next/dynamic";
import { LazyThemeSwitcher } from "@/components/ui/theme-switcher";

const ThemeSwitcher = dynamic(() => import("@/components/ui/theme-switcher"), {
  ssr: false,
  loading: () => <LazyThemeSwitcher />,
});

const Header: React.FC = () => {
  // const t = useTranslations();
  const { user } = useUser();

  return (
    <Navbar
      className="print:hidden z-50 bg-default-50/60 shadow-sm backdrop-blur-sm border-b border-b-default-100/40 w-full transition-colors duration-200"
      shouldHideOnScroll
    >
      <NavbarBrand className="flex flex-row flex-1 justify-start items-center gap-4">
        <Link href="/">
          <Mdxfy.Logo className="w-28 h-9" />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex space-x-4" justify="center">
        {/* <NavbarItem>
          <Link
            href="/about"
            className="font-bold text-gray-700 hover:text-gray-900 dark:hover:text-gray-300 dark:text-gray-200 hover:underline"
          >
            {t("UI.redirects.about") as string}
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent
        className="flex flex-row flex-1 items-center gap-4"
        justify="end"
      >
        <CompactLanguageSelector />
        <NavbarItem className={user ? "md:flex hidden" : "flex"}>
          <Button
            as={HeroUILink}
            href="/post"
            className={cn(
              "bg-default-100 hover:bg-default-200 shadow-sm text-default-700 duration-100"
            )}
            isIconOnly
          >
            <Pen weight="LineDuotone" size={22} />
          </Button>
        </NavbarItem>
        <NavbarItem className={cn(user ? "md:flex hidden" : "flex")}>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem className="flex justify-center items-center">
          <UserOptionsButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
