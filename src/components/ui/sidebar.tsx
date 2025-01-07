"use client";
import { cn } from "@/lib/utils";
import NextJsLink, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown05Icon,
  ArrowRight04Icon,
  CancelSquareIcon,
} from "@hugeicons/react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

export interface Link {
  label: string;
  href: string;
  icon:
    | React.JSX.Element
    | React.ReactNode
    | ((stats: IconProps) => React.JSX.Element | React.ReactNode);
}

export type IconProps = {
  isCurrent?: boolean;
};

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "transition-colors h-full py-3 pt-4 hidden md:flex md:flex-col bg-slate-100 dark:bg-[#1d1d1d] border-r border-r-neutral-500/15 w-[300px] flex-shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();

  return (
    <div className="md:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "transition-colors fixed flex-1 h-full w-full inset-0 bg-white dark:bg-neutral-900 p-4 z-[100] flex flex-col justify-between",
              className
            )}
          >
            <div className="top-4 right-4 z-50 absolute text-neutral-800 dark:text-neutral-200">
              <Button onPress={() => setOpen(!open)} color="primary" isIconOnly>
                <CancelSquareIcon variant="twotone" type="rounded" />
              </Button>
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Link;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  const router = useRouter();
  const isCurrentPath =
    link.href === router.pathname || link.href === router.asPath;

  return (
    <NextJsLink
      href={link.href}
      className={cn(
        "transition-all duration-200 flex items-center justify-start gap-4 py-2 pl-0 group rounded-2xl",
        open
          ? "bg-neutral-950 dark:bg-neutral-800 bg-opacity-5 pl-2"
          : "bg-opacity-0",
        className
      )}
      {...props}
    >
      <span className="flex justify-center items-center min-w-9 min-h-9">
        {typeof link.icon === "function"
          ? link.icon({ isCurrent: isCurrentPath })
          : link.icon}
      </span>
      <div className="flex justify-between items-center w-full">
        <motion.span
          animate={{
            display: animate
              ? open
                ? "inline-block"
                : "none"
              : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className={cn(
            isCurrentPath ? "font-extrabold" : "font-medium",
            "inline-block !m-0 !p-0 text-base text-neutral-700 dark:text-neutral-200 whitespace-pre transition group-hover:translate-x-1 duration-150"
          )}
        >
          {link.label}
        </motion.span>
        <span
          className={cn(
            isCurrentPath
              ? "-translate-x-3"
              : "opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:-translate-x-3 group-active:-translate-x-2",
            "font-medium text-base text-neutral-700 dark:text-neutral-200 whitespace-pre",
            "inline-block !m-0 !p-0 duration-150"
          )}
        >
          {isCurrentPath ? (
            <ArrowDown05Icon variant="bulk" type="rounded" />
          ) : (
            <ArrowRight04Icon variant="bulk" type="rounded" />
          )}
        </span>
      </div>
    </NextJsLink>
  );
};
