import { cn } from "@/lib/utils";
import React, { JSX } from "react";
import Link, { LinkProps } from "../link";

export type LinkOptionIcon = React.ElementType;

export interface LinkOptionProps extends LinkProps {
  icon?: LinkOptionIcon | JSX.Element;
  noRedirect?: boolean;
}

const LinkOption = ({
  icon,
  noRedirect = false,
  className,
  children,
  onClick,
  ...props
}: LinkOptionProps) => {
  const onClickProp = onClick
    ? {
        onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
          if (noRedirect) {
            e.preventDefault();
            onClick?.(e);
            return;
          }
          onClick?.(e);
        },
      }
    : {};

  return (
    <Link
      className={cn(
        "flex flex-row items-center gap-2 bg-default-100 bg-opacity-0 hover:bg-opacity-75 p-1 rounded-md w-full text-gray-700 dark:text-gray-200 duration-75",
        className
      )}
      {...onClickProp}
      {...props}
    >
      {icon && (
        <span className="flex justify-center items-center w-4 h-4 font-medium text-gray-700 dark:text-gray-200">
          {React.isValidElement(icon)
            ? icon
            : React.createElement(icon as React.ElementType, {
                className: "w-4 h-4",
              })}
        </span>
      )}
      {children}
    </Link>
  );
};

export default LinkOption;
