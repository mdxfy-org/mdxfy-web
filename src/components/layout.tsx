import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "./footer";
import Loading from "./loading";

interface LayoutProps {
  className?: string;
  children?: React.ReactNode;
  disableLoading?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
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
          "sm:pb-4 w-full h-min overflow-hidden overflow-y-auto transition-colors",
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

export default Layout;
