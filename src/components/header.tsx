import React from "react";
import dynamic from "next/dynamic";
import { LazyThemeSwitcher } from "@/components/ui/theme-switcher";
import { AnimatePresence, motion } from "framer-motion";
// import { useTranslations } from "next-intl";
import { Button } from "@nextui-org/react";
import { useSidebar } from "./ui/sidebar";
import { MenuSquareIcon } from "@hugeicons/react";

const ThemeSwitcher = dynamic(() => import("@/components/ui/theme-switcher"), {
  ssr: false,
  loading: () => <LazyThemeSwitcher />,
});

const Header: React.FC = () => {
  // const t = useTranslations();
  const { open, setOpen } = useSidebar();

  return (
    <AnimatePresence>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-slate-100 dark:bg-[#1d1d1d] border-b border-b-neutral-500/15 w-full transition-colors"
      >
        <div className="flex justify-between items-center p-4">
          <div className="flex flex-row flex-1 justify-end items-center gap-4">
            <ThemeSwitcher className="text-2xl" />
            <Button
              color="primary"
              className="text-2xl"
              onPress={() => {
                setOpen(!open);
              }}
              isIconOnly
            >
              <motion.div
                initial="hidden"
                animate={open ? "hidden" : "visible"} 
                className="absolute text-inherit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
              >
                <MenuSquareIcon
                  type="rounded"
                  variant="duotone"
                  className="w-[1em] h-[1em]"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                className="absolute text-inherit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
              >
                <MenuSquareIcon
                  type="rounded"
                  variant="solid"
                  className="w-[1em] h-[1em]"
                />
              </motion.div>
            </Button>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
};

export default Header;
