import { cn } from "@/lib/utils";
import { Button, Link } from "@heroui/react";
import { useRouter } from "next/router";

interface TabItemChildrenProps {
  active?: boolean;
  className?: string;
}

interface TabItemProps {
  label: string;
  href?: string;
  className?: string;
  children?:
    | React.ReactNode
    | ((params: TabItemChildrenProps) => React.ReactNode);
  disabled?: boolean;
}

const TabItem: React.FC<TabItemProps> = ({
  label,
  href,
  className,
  children,
  disabled,
}) => {
  const router = useRouter();

  const isActive = href ? router.asPath == href : false;

  return (
    <Button
      onPress={() => {
        if (href && !disabled) {
          router.push(href);
        }
      }}
      as={Link}
      isIconOnly
      className={cn(
        className,
        "flex flex-col items-center text-sm aspect-square size-14 gap-0.5 text-default-900 bg-transparent"
      )}
      isDisabled={disabled}
    >
      {typeof children === "function"
        ? children({ active: isActive, className: className || "" })
        : children}
      {label}
    </Button>
  );
};

export default TabItem;
