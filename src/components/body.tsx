import Head from "next/head";
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
      <Head>
        <title>Nome do Seu Negocio</title>
      </Head>
      <Loading />
      <main
        className={cn(
          "flex md:flex-row flex-col flex-1 bg-slate-50 dark:bg-neutral-800 w-screen h-svh transition-colors overflow-hidden",
          className
        )}
      >
        <div
          className={cn("flex flex-1 items-center", hideHeader ? "flex-row" : "flex-col")}
        >
          {!hideHeader && <Header />}
          {children}
        </div>
      </main>
    </>
  );
};

export default Body;
