import { Post } from "@/types/post";
import { User } from "@/types/user";
import Link from "next/link";
import Editor from "./mark-down-editor";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar } from "./avatar";
// import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
// import { MenuDots } from "@solar-icons/react";

export interface PostProps {
  post: Post;
  user: User;
}

export const UserPost: React.FC<PostProps> = ({ post, user }) => {
  const postDate = new Date(post.updated_at);

  return (
    <AnimatePresence>
      <motion.div
        key={post.uuid}
        className="flex flex-col gap-2 pb-6 border-default-200 border-b-2 last:border-b-0 w-full"
      >
        <div className="relative flex flex-row items-center gap-2">
          <Link
            className="flex flex-row items-center gap-2 min-w-max truncate"
            href={`/user/${user.username}`}
          >
            <Avatar src={user.profile_picture} />
            {user?.name}
            <span className="min-w-max text-default-500">@{user.username}</span>
          </Link>
          <p className="hidden sm:block min-w-max text-default-500">
            {" - "}
            {postDate.toLocaleString()}
          </p>
          {/* <Popover radius="sm" placement="bottom-end" offset={8}>
            <PopoverTrigger>
              <Button className="right-0 absolute bg-default-200" size="sm" isIconOnly>
                <MenuDots weight="Bold" className="text-default-600 rotate-90" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>a</PopoverContent>
          </Popover> */}
        </div>
        {post.see_more ? (
          <Link href={`/post/${post.uuid}`} className="w-full">
            <Editor markdown={post.excerpt} readonly />
          </Link>
        ) : (
          <Editor markdown={post.content} readonly />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
