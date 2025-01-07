import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Spinner } from "@nextui-org/react";
import { useOverlay } from "@/contexts/overlay-provider";

const Loading = () => {
  const { isLoading, message } = useOverlay();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className={cn(
        isLoading ? "pointer-events-auto" : "pointer-events-none",
        "flex flex-col gap-8 items-center justify-center",
        "transition-all fixed w-screen h-screen top-0 left-0 z-[150]",
        "text-slate-800 dark:text-slate-50 bg-zinc-400/35 dark:bg-zinc-800/35 backdrop-blur-[1px]"
      )}
    >
      <Spinner size="lg" color="current" />
      {message && <div className="max-w-56 font-medium text- text-center">{message}</div>}
    </motion.div>
  );
};

export default Loading;
