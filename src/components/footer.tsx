import React from "react";
import { motion } from "framer-motion";
import TabItem from "./tab-item";
import Icon from "./icon";
import { ChatLine, HomeAngle, User } from "@solar-icons/react";

const Footer: React.FC = () => {
  return (
    <motion.footer className="sm:hidden bottom-0 left-0 z-50 fixed flex bg-slate-50/95 dark:bg-stone-900/95 shadow-sm backdrop-blur-sm border-t dark:border-t-stone-950/50 w-full transition-colors">
      <div className="flex justify-around items-center mx-auto p-2 px-0 container">
        <TabItem label="Chat" href="/web/chat">
          {({ active }) => (
            <Icon showAlt={active} size={32}>
              <ChatLine weight="LineDuotone" />
              <ChatLine weight="Bold" />
            </Icon>
          )}
        </TabItem>
        <TabItem label="Home" href="/web">
          {({ active }) => (
            <Icon showAlt={active} size={32}>
              <HomeAngle />
              <HomeAngle weight="Bold" />
            </Icon>
          )}
        </TabItem>
        <TabItem label="User" href="/web/profile">
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
