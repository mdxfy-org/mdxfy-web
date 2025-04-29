import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Loading from "@/components/loading";
import Footer from "./footer";

interface LayoutProps {
  className?: string;
  children?: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ className, children, hideHeader, hideFooter }) => {
  return (
    <>
      <Loading />
      {!hideHeader && <Header />}
      <main
        className={cn(
          "bg-slate-50 dark:bg-neutral-900 pb-16 sm:pb-4 w-full min-h-svh overflow-hidden overflow-y-auto transition-colors",
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
