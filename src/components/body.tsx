import Head from "next/head";
import Header from "./header";
import { cn } from "@/lib/utils";
import Loading from "./loading";
import { Link, Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import EstoqueTemplate from "./ui/mdxfy";
import {
  Home09Icon,
  MoneyReceive02Icon,
  Settings02Icon,
  ToolsIcon,
} from "@hugeicons/react";
import userPicture from "@public/user-default.png";
import { useState } from "react";
import Image from "./image";

const linkClassName = "w-7 h-7 text-slate-900 dark:text-slate-50";
const links: Link[] = [
  {
    href: "/",
    label: "Início",
    icon: ({ isCurrent }) => (
      <Home09Icon
        variant={isCurrent ? "solid" : "stroke"}
        className={linkClassName}
      />
    ),
  },
  {
    href: "/sells",
    label: "Vendas",
    icon: ({ isCurrent }) => (
      <ToolsIcon
        variant={isCurrent ? "solid" : "stroke"}
        className={linkClassName}
      />
    ),
  },
  {
    href: "/reports",
    label: "Relatórios",
    icon: ({ isCurrent }) => (
      <MoneyReceive02Icon
        variant={isCurrent ? "solid" : "stroke"}
        className={linkClassName}
      />
    ),
  },
  {
    href: "/settings",
    label: "Configurações",
    icon: ({ isCurrent }) => (
      <Settings02Icon
        variant={isCurrent ? "solid" : "stroke"}
        className={linkClassName}
      />
    ),
  },
  {
    href: "/settings",
    label: "Configurações",
    icon: ({ isCurrent }) => (
      <Settings02Icon
        variant={isCurrent ? "solid" : "stroke"}
        className={linkClassName}
      />
    ),
  },
  {
    href: "/settings",
    label: "Configurações",
    icon: ({ isCurrent }) => (
      <Settings02Icon
        variant={isCurrent ? "solid" : "stroke"}
        className={linkClassName}
      />
    ),
  },
  {
    href: "/settings",
    label: "Configurações",
    icon: ({ isCurrent }) => (
      <Settings02Icon
        variant={isCurrent ? "solid" : "stroke"}
        className={linkClassName}
      />
    ),
  },
  {
    href: "/settings",
    label: "Configurações",
    icon: ({ isCurrent }) => (
      <Settings02Icon
        variant={isCurrent ? "solid" : "stroke"}
        className={linkClassName}
      />
    ),
  },
  {
    href: "/settings",
    label: "Configurações",
    icon: ({ isCurrent }) => (
      <Settings02Icon
        variant={isCurrent ? "solid" : "stroke"}
        className={linkClassName}
      />
    ),
  },
  {
    href: "/settings",
    label: "Configurações",
    icon: ({ isCurrent }) => (
      <Settings02Icon
        variant={isCurrent ? "solid" : "stroke"}
        className={linkClassName}
      />
    ),
  },
  {
    href: "/settings",
    label: "Configurações",
    icon: ({ isCurrent }) => (
      <Settings02Icon
        variant={isCurrent ? "solid" : "stroke"}
        className={linkClassName}
      />
    ),
  },
  {
    href: "/settings",
    label: "Configurações",
    icon: ({ isCurrent }) => (
      <Settings02Icon
        variant={isCurrent ? "solid" : "stroke"}
        className={linkClassName}
      />
    ),
  },
  // {
  //   href: "/settings",
  //   label: "Configurações",
  //   icon: ({ isCurrent }) => (
  //     <Settings02Icon
  //       variant={isCurrent ? "solid" : "stroke"}
  //       className={linkClassName}
  //     />
  //   ),
  // },
  // {
  //   href: "/settings",
  //   label: "Configurações",
  //   icon: ({ isCurrent }) => (
  //     <Settings02Icon
  //       variant={isCurrent ? "solid" : "stroke"}
  //       className={linkClassName}
  //     />
  //   ),
  // },
  // {
  //   href: "/settings",
  //   label: "Configurações",
  //   icon: ({ isCurrent }) => (
  //     <Settings02Icon
  //       variant={isCurrent ? "solid" : "stroke"}
  //       className={linkClassName}
  //     />
  //   ),
  // },
  // {
  //   href: "/settings",
  //   label: "Configurações",
  //   icon: ({ isCurrent }) => (
  //     <Settings02Icon
  //       variant={isCurrent ? "solid" : "stroke"}
  //       className={linkClassName}
  //     />
  //   ),
  // },
  // {
  //   href: "/settings",
  //   label: "Configurações",
  //   icon: ({ isCurrent }) => (
  //     <Settings02Icon
  //       variant={isCurrent ? "solid" : "stroke"}
  //       className={linkClassName}
  //     />
  //   ),
  // },
  // {
  //   href: "/settings",
  //   label: "Configurações",
  //   icon: ({ isCurrent }) => (
  //     <Settings02Icon
  //       variant={isCurrent ? "solid" : "stroke"}
  //       className={linkClassName}
  //     />
  //   ),
  // },
  // {
  //   href: "/settings",
  //   label: "Configurações",
  //   icon: ({ isCurrent }) => (
  //     <Settings02Icon
  //       variant={isCurrent ? "solid" : "stroke"}
  //       className={linkClassName}
  //     />
  //   ),
  // },
  // {
  //   href: "/settings",
  //   label: "Configurações",
  //   icon: ({ isCurrent }) => (
  //     <Settings02Icon
  //       variant={isCurrent ? "solid" : "stroke"}
  //       className={linkClassName}
  //     />
  //   ),
  // },
  // {
  //   href: "/settings",
  //   label: "Configurações",
  //   icon: ({ isCurrent }) => (
  //     <Settings02Icon
  //       variant={isCurrent ? "solid" : "stroke"}
  //       className={linkClassName}
  //     />
  //   ),
  // },
  // {
  //   href: "/settings",
  //   label: "Configurações",
  //   icon: ({ isCurrent }) => (
  //     <Settings02Icon
  //       variant={isCurrent ? "solid" : "stroke"}
  //       className={linkClassName}
  //     />
  //   ),
  // },
  // {
  //   href: "/settings",
  //   label: "Configurações",
  //   icon: ({ isCurrent }) => (
  //     <Settings02Icon
  //       variant={isCurrent ? "solid" : "stroke"}
  //       className={linkClassName}
  //     />
  //   ),
  // },
  // {
  //   href: "/settings",
  //   label: "Configurações",
  //   icon: ({ isCurrent }) => (
  //     <Settings02Icon
  //       variant={isCurrent ? "solid" : "stroke"}
  //       className={linkClassName}
  //     />
  //   ),
  // },
  // {
  //   href: "/settings",
  //   label: "Configurações",
  //   icon: ({ isCurrent }) => (
  //     <Settings02Icon
  //       variant={isCurrent ? "solid" : "stroke"}
  //       className={linkClassName}
  //     />
  //   ),
  // },
];

interface BodyProps {
  className?: string;
  children?: React.ReactNode;
  hideHeader?: boolean;
}

const Body: React.FC<BodyProps> = ({ className, children, hideHeader }) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <>
      <Head>
        <title>Nome do Seu Negocio</title>
      </Head>
      <Loading />
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <main
          className={cn(
            "flex md:flex-row flex-col flex-1 bg-slate-50 dark:bg-neutral-800 w-screen h-svh transition-colors overflow-hidden",
            className
          )}
        >
          {!hideHeader && (
            <SidebarBody className="justify-between max-h-svh">
              <div className="flex flex-col pb-4 max-h-[calc(100%-52px)] overflow-hidden">
                <div className="flex flex-row items-center gap-4 px-3">
                  <EstoqueTemplate.Icon className="min-w-9 min-h-9" />
                  <EstoqueTemplate.Logo
                    className={cn(
                      "min-w-min max-w-min h-9 transition-opacity translate-y-1",
                      open ? "opacity-100" : "opacity-0"
                    )}
                  />
                </div>
                <div
                  className={cn(
                    "flex flex-col flex-1 gap-2 mt-7 mr-1 pr-1 pl-3 overflow-x-hidden",
                    "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]",
                    "[&::-webkit-scrollbar-track]:rounded-full",
                    "[&::-webkit-scrollbar-track]:bg-gray-100",
                    "[&::-webkit-scrollbar-thumb]:rounded-full",
                    "[&::-webkit-scrollbar-thumb]:bg-gray-300",
                    "dark:[&::-webkit-scrollbar-track]:bg-neutral-700",
                    "dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500",
                    open ? "overflow-y-auto" : "overflow-y-hidden"
                  )}
                >
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col overflow-hidden">
                <SidebarLink
                  className="mx-3"
                  link={{
                    label: "User name",
                    href: "/user",
                    icon: (
                      <Image
                        src="/manua.png"
                        fallbackSrc={userPicture.src}
                        className="bg-gray-100 dark:bg-gray-500/75 rounded-xl min-w-8 min-h-8 transition-colors"
                        width={32}
                        height={32}
                        alt="Avatar"
                      />
                    ),
                  }}
                />
              </div>
            </SidebarBody>
          )}
          <div className={cn("flex flex-1", 
            hideHeader ? "flex-row" : "flex-col"
          )}>
            {!hideHeader && <Header />}
            {children}
          </div>
        </main>
      </Sidebar>
    </>
  );
};

export default Body;
