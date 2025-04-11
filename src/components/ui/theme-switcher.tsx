// "use client";

import {
  Button,
  ButtonProps as HeroUIButtonProps,
  Spinner,
} from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ThemeUserFeedback from "../ux/theme-user-feedback";

interface ThemeSwitcherProps extends HeroUIButtonProps {
  className?: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className,
  ...props
}: ThemeSwitcherProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-color-mode", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", theme || "light");
    setMounted(true);
  }, [theme]);

  if (!mounted) return null;

  return (
    <Button className={cn("bg-default-100 hover:bg-default-200 shadow-sm duration-100", className)} onPress={toggleTheme} isIconOnly {...props}>
      <ThemeUserFeedback />
    </Button>
  );
};

export const LazyThemeSwitcher: React.FC = () => {
  return (
    <Button isIconOnly>
      <Spinner size="sm" color="default" />
    </Button>
  );
};

export default ThemeSwitcher;
