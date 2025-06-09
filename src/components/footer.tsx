import React from "react";
import { motion } from "framer-motion";
import TabItem from "./tab-item";
import Icon from "./icon";
import {
  AddSquare,
  // ChatLine,
  HomeAngle,
  User,
} from "@solar-icons/react";
import { useUser } from "@/contexts/auth-provider";

const Footer: React.FC = () => {
  const { user } = useUser();

  return (
    <motion.footer className="sm:hidden bottom-0 left-0 z-50 fixed flex bg-slate-50/95 dark:bg-stone-900/95 shadow-sm backdrop-blur-sm border-t dark:border-t-stone-950/50 w-full transition-colors">
      <div className="flex justify-around items-center mx-auto p-2 px-0 container">
        {/* <TabItem label="Chat" href="/chat">
          {({ active }) => (
            <Icon showAlt={active} size={32}>
              <ChatLine weight="LineDuotone" />
              <ChatLine weight="Bold" />
            </Icon>
          )}
        </TabItem> */}
        <TabItem label="Home" href="/">
          {({ active }) => (
            <Icon showAlt={active} size={32}>
              <HomeAngle />
              <HomeAngle weight="Bold" />
            </Icon>
          )}
        </TabItem>
        <TabItem label="Post" href="/post" disabled={!user}>
          {({ active }) => (
            <Icon showAlt={active} size={32}>
              <AddSquare />
              <AddSquare weight="Bold" />
            </Icon>
          )}
        </TabItem>
        <TabItem label="User" href={`/user/${user?.username}`} disabled={!user}>
          {({ active }) => (
            <Icon showAlt={active} size={32}>
              <User />
              <User weight="Bold" />
            </Icon>
          )}
        </TabItem>
      </div>
    </motion.footer>
  );
};

export default Footer;
