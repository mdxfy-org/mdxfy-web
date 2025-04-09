import { cn } from "@/lib/utils";
import {
  ScrollShadow as HeroUIScrollShadow,
  ScrollShadowProps as HeroUIScrollShadowProps,
} from "@heroui/react";

export interface ScrollShadowProps extends HeroUIScrollShadowProps {
  children?: React.ReactNode;
  className?: string;
}

const ScrollShadow = ({ children, className, ...props }: ScrollShadowProps) => {
  return (
    <HeroUIScrollShadow
      className={cn(
        "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]",
        "[&::-webkit-scrollbar-track]:rounded-full",
        "[&::-webkit-scrollbar-thumb]:rounded-full",
        "[&::-webkit-scrollbar-track]:bg-gray-100",
        "[&::-webkit-scrollbar-thumb]:bg-gray-300",
        "dark:[&::-webkit-scrollbar-track]:bg-neutral-800",
        "dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600",
        className
      )}
      {...props}
    >
      {children}
    </HeroUIScrollShadow>
  );
};

export default ScrollShadow;
