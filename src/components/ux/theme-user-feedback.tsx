import { motion } from "framer-motion";
import { Moon02Icon, Sun01Icon } from "@hugeicons/react";
import { useTheme } from "next-themes";
// import { cn } from "@/lib/utils";

interface ThemeUserFeedbackProps {
  iconSize?: number;
}

const ThemeUserFeedback: React.FC<ThemeUserFeedbackProps> = ({
  // className,
  iconSize = 16,
}) => {
  const { theme } = useTheme();

  return (
    <>
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
          size={iconSize}
          type="rounded"
          variant="stroke"
          className="w-[1em] h-[1em] text-gray-600 text-inherit dark:text-gray-200"
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
          size={iconSize}
          type="rounded"
          variant="duotone"
          className="w-[1em] h-[1em] text-gray-600 text-inherit dark:text-gray-200"
        />
      </motion.div>
    </>
  );
};

export default ThemeUserFeedback;
