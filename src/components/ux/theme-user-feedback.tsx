import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "@solar-icons/react";

interface ThemeUserFeedbackProps {
  iconSize?: number;
  className?: string;
}

const ThemeUserFeedback: React.FC<ThemeUserFeedbackProps> = ({
  iconSize = 16,
  className = "text-inherit dark:text-inherit",
}) => {
  const { theme } = useTheme();

  return (
    <>
      <motion.div
        initial="hidden"
        animate={theme === "dark" ? "hidden" : "visible"}
        className={cn("absolute text-gray-600 dark:text-gray-200", className)}
        variants={{
          hidden: { opacity: 0, rotate: -90 },
          visible: { opacity: 1, rotate: 0 },
        }}
      >
        <Sun
          size={iconSize}
          weight="LineDuotone"
          className="text-inherit"
        />
      </motion.div>
      <motion.div
        initial="hidden"
        animate={theme === "dark" ? "visible" : "hidden"}
        className={cn("absolute text-gray-600 dark:text-gray-200", className)}
        variants={{
          hidden: { opacity: 0, rotate: 90 },
          visible: { opacity: 1, rotate: 0 },
        }}
      >
        <Moon
          size={iconSize}
          className="text-inherit"
        />
      </motion.div>
    </>
  );
};

export default ThemeUserFeedback;
