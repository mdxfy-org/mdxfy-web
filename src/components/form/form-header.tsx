import { cn } from "@/lib/utils";

export interface FormHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ children, className }) => {
  return <div className={cn("col-span-full", className)}>{children}</div>;
};

export default FormHeader;
