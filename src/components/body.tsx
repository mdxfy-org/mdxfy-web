import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "./footer";
import Loading from "./loading";

interface BodyProps {
  className?: string;
  children?: React.ReactNode;
  disableLoading?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

const Body: React.FC<BodyProps> = ({
  className,
  children,
  disableLoading = false,
  hideHeader,
  hideFooter,
}) => {
  return (
    <>
      {!disableLoading && <Loading />}
      {!hideHeader && <Header />}
      <main
        className={cn(
          "w-full h-min transition-colors",
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
