import { cn } from "@/lib/utils";
import { IconProps } from "@solar-icons/react/lib/types";
import React from "react";

interface ComponentsProps extends IconProps {
  children:
    | React.ReactElement<IconProps>
    | [React.ReactElement, React.ReactElement?];
  className?: string;
  iconClassName?: string;
  iconFirstClassName?: string;
  iconSecondClassName?: string;
  transition?: boolean;
  showAlt?: boolean;
}

const Icon: React.FC<ComponentsProps> = ({
  children,
  className,
  iconClassName,
  iconFirstClassName,
  iconSecondClassName,
  transition,
  showAlt,
  ...props
}) => {
  const childClasses = cn(
    transition && "*:transition-opacity duration-75 ease-in-out",
    "top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2"
  );

  const FirstChild = Array.isArray(children) ? children[0] : children;
  const LastChild = Array.isArray(children) ? children[1] : undefined;

  return (
    <div
      className={cn(
        className,
        "relative",
        showAlt
          ? "[&>*:last-child]:opacity-100 [&>*:first-child]:opacity-0"
          : LastChild && "[&>*:last-child]:opacity-0"
      )}
      style={{
        width: props.size,
        height: props.size,
      }}
    >
      {React.isValidElement(FirstChild) &&
        React.cloneElement(FirstChild as React.ReactElement<IconProps>, {
          className: cn(iconClassName, iconFirstClassName, childClasses),
          ...props,
        })}
      {LastChild &&
        React.isValidElement(LastChild) &&
        React.cloneElement(LastChild as React.ReactElement<IconProps>, {
          className: cn(iconClassName, iconSecondClassName, childClasses),
          ...props,
        })}
    </div>
  );
};

export default Icon;
