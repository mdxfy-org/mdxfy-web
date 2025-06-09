import { cn } from "@/lib/utils";
import { Tooltip, TooltipProps } from "@heroui/react";
import Link from "next/link";
import { linkFocusClasses } from "./link";

export interface PostIconFeedbackProps {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  title?: TooltipProps["title"];
}

export const PostIconFeedback: React.FC<PostIconFeedbackProps> = ({
  className,
  children,
  href,
  icon,
  title,
}) => {
  return (
    <Tooltip content={title} delay={250} closeDelay={100} placement="top">
      <Link href={href ?? ""} className={cn("flex items-center gap-1 rounded-lg", linkFocusClasses, className)}>
        {icon}
        {children}
      </Link>
    </Tooltip>
  );
};
