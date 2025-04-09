import Header from "./header";
import { cn } from "@/lib/utils";
import Loading from "./loading";

interface BodyProps {
  className?: string;
  children?: React.ReactNode;
  hideHeader?: boolean;
}

const Body: React.FC<BodyProps> = ({ className, children, hideHeader }) => {
  return (
    <>
      <Loading />
      {!hideHeader && <Header />}
      <main
        className={cn(
          "bg-slate-50 dark:bg-neutral-900 w-full h-min min-h-svh transition-colors",
          !hideHeader && "pt-20",
          className
        )}
      >
        {children}
      </main>
    </>
  );
};

export default Body;
