import React from "react";
import dynamic from "next/dynamic";
import { LazyThemeSwitcher } from "@/components/ui/theme-switcher";
import { AnimatePresence, motion } from "framer-motion";
import Mdxfy from "./ui/mdxfy";
import Link from "next/link";
// import { useTranslations } from "next-intl";

const ThemeSwitcher = dynamic(() => import("@/components/ui/theme-switcher"), {
  ssr: false,
  loading: () => <LazyThemeSwitcher />,
});

const Header: React.FC = () => {
  // const t = useTranslations();

  return (
    <AnimatePresence>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-slate-100 dark:bg-[#1d1d1d] border-b border-b-neutral-500/15 w-full transition-colors"
      >
        <div className="flex justify-between items-center mx-auto p-4 container">
          <div>
            <Link href="/">
              <Mdxfy.Logo className="w-28 h-10" />
            </Link>
          </div>
          <div className="flex flex-row flex-1 justify-end items-center gap-4">
            <ThemeSwitcher className="text-2xl" />
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
};

export default Header;
