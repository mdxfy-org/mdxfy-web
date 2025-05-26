import { cn } from "@/lib/utils";

export interface FormFooterProps {
  children: React.ReactNode;
  className?: string;
}

const FormFooter: React.FC<FormFooterProps> = ({ children, className }) => {
  return <div className={cn("flex justify-end col-span-full", className)}>{children}</div>;
};

export default FormFooter;
