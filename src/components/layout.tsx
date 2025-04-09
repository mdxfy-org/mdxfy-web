import Head from "next/head";
import { cn } from "@/lib/utils";
import Header from "./header";

interface LayoutProps {
  className?: string;
  children?: React.ReactNode;
  hideHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ className, children, hideHeader }) => {
  return (
    <>
      <Head>
        <title>Agrofast</title>
      </Head>
      {!hideHeader && <Header />}
      <main
        className={cn(
          "bg-slate-50 dark:bg-neutral-900 w-full min-h-svh overflow-hidden overflow-y-auto transition-colors",
          className
        )}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
