import { cn } from "@heroui/react";

export interface ScrollProps {
  children?: React.ReactNode;
  className?: string;
}

export const scrollClasses = [
  "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]",
  "[&::-webkit-scrollbar-track]:rounded-full",
  "[&::-webkit-scrollbar-thumb]:rounded-full",
  "[&::-webkit-scrollbar-track]:bg-default-100",
  "[&::-webkit-scrollbar-thumb]:bg-default-300",
];

export const Scroll: React.FC<ScrollProps> = ({ children, className }) => {
  return (
    <div
      className={cn("w-[300px] h-64 overflow-y-auto", scrollClasses, className)}
    >
      {children}
    </div>
  );
};
