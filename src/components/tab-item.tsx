import { cn } from "@/lib/utils";
import { Button } from "@heroui/react";
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
}

const TabItem: React.FC<TabItemProps> = ({
  label,
  href,
  className,
  children,
}) => {
  const router = useRouter();

  const isActive = href ? router.asPath == href : false;

  return (
    <Button
      onPress={() => {
        if (href) {
          router.push(href);
        }
      }}
      isIconOnly
      className={cn(
        className,
        "flex flex-col items-center text-sm aspect-square size-14 gap-0.5 bg-transparent"
      )}
    >
      {typeof children === "function"
        ? children({ active: isActive, className: className || "" })
        : children}
      {label}
    </Button>
  );
};

export default TabItem;
