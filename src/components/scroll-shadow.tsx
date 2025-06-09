import { cn } from "@/lib/utils";
import {
  ScrollShadow as HeroUIScrollShadow,
  ScrollShadowProps as HeroUIScrollShadowProps,
} from "@heroui/react";
import { scrollClasses } from "./scroll";

export interface ScrollShadowProps extends HeroUIScrollShadowProps {
  children?: React.ReactNode;
  className?: string;
}

const ScrollShadow = ({ children, className, ...props }: ScrollShadowProps) => {
  return (
    <HeroUIScrollShadow className={cn(scrollClasses, className)} {...props}>
      {children}
    </HeroUIScrollShadow>
  );
};

export default ScrollShadow;
