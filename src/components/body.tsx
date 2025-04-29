import Header from "@/components/header";
import { cn } from "@/lib/utils";
import Loading from "@/components/loading";
import Footer from "./footer";

interface BodyProps {
  className?: string;
  children?: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

const Body: React.FC<BodyProps> = ({ className, children, hideHeader, hideFooter }) => {
  return (
    <>
      <Loading />
      {!hideHeader && <Header />}
      <main
        className={cn(
          "bg-slate-50 dark:bg-neutral-900 w-full h-min min-h-svh transition-colors",
          !hideHeader && "pt-16",
          !hideFooter && "pb-16 sm:pb-4",
          className
        )}
      >
        {children}
      </main>
      {!hideFooter && <Footer />}
    </>
  );
};

export default Body;
