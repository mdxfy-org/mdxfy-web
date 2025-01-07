// "use client";

import {
  Button,
  ButtonProps as NextUIButtonProps,
  Spinner,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Moon02Icon, Sun01Icon } from "@hugeicons/react";

interface ThemeSwitcherProps extends NextUIButtonProps {
  className?: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className,
  ...props
}: ThemeSwitcherProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button color="primary" className={className} onPress={toggleTheme} isIconOnly {...props}>
      <motion.div
        initial="hidden"
        animate={theme === "dark" ? "hidden" : "visible"}
        className="absolute text-inherit"
        variants={{
          hidden: { opacity: 0, rotate: -90 },
          visible: { opacity: 1, rotate: 0 },
        }}
      >
        <Sun01Icon
          type="rounded"
          variant="duotone"
          className="w-[1em] h-[1em] text-gray-700 text-inherit dark:text-gray-200"
        />
      </motion.div>
      <motion.div
        initial="hidden"
        animate={theme === "dark" ? "visible" : "hidden"}
        className="absolute text-inherit"
        variants={{
          hidden: { opacity: 0, rotate: 90 },
          visible: { opacity: 1, rotate: 0 },
        }}
      >
        <Moon02Icon
          type="rounded"
          variant="duotone"
          className="w-[1em] h-[1em] text-gray-700 text-inherit dark:text-gray-200"
        />
      </motion.div>
    </Button>
  );
};

export const LazyThemeSwitcher: React.FC = () => {
  return (
    <Button isIconOnly>
      <Spinner />
    </Button>
  );
};

export default ThemeSwitcher;
