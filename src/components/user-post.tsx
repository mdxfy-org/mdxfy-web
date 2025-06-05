import { Post } from "@/types/post";
import { User } from "@/types/user";
import Link from "next/link";
import Editor from "./mark-down-editor";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar } from "./avatar";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { MenuDots, Pen, TrashBinTrash } from "@solar-icons/react";
import { cn } from "@/lib/utils";
import IconOption from "./ui/icon-option";
import { useUser } from "@/contexts/auth-provider";
import api from "@/service/api";
import { useToast } from "@/service/toast";
import { useState } from "react";

export interface PostProps {
  post: Post;
  user: User;
  redirect?: boolean;
}

export const UserPost: React.FC<PostProps> = ({
  post,
  user,
  redirect = false,
}) => {
  const toast = useToast();
  const { user: loggedUser } = useUser();

  const postDate = new Date(post.updated_at);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeletePost = () => {
    api
      .delete(`/post/${post.uuid}`)
      .then(() => {})
      .catch(() => {
        toast.error({
          description: "Erro ao excluir o post. Tente novamente mais tarde.",
        });
      });
  };

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
          {loggedUser?.id === post.user.id && (
            <Popover radius="sm" placement="bottom-end" offset={8}>
              <PopoverTrigger>
                <Button
                  className="right-0 absolute bg-default-200"
                  size="sm"
                  isIconOnly
                >
                  <MenuDots
                    weight="Bold"
                    className="text-default-600 rotate-90"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={cn(
                  "flex flex-col gap-0 p-1 w-full min-w-44 h-m text-gray-700 dark:text-gray-200 transition-all in",
                  isModalOpen && "opacity-25 duration-100 pointer-events-none"
                )}
              >
                <>
                  <IconOption
                    href={`/post/${post.uuid}/edit`}
                    disabled={!user}
                    icon={<Pen />}
                  >
                    Editar
                  </IconOption>
                  <IconOption
                    disabled={!user}
                    icon={<TrashBinTrash className="text-danger-500" />}
                    className="text-danger-500"
                    onClick={handleDeletePost}
                    confirmAction
                    confirmActionInfo={{
                      onConfirmModalChanged: setIsModalOpen,
                    }}
                  >
                    Deletar
                  </IconOption>
                </>
              </PopoverContent>
            </Popover>
          )}
        </div>
        {redirect ? (
          <Link href={`/post/${post.uuid}`} className="w-full">
            <Editor markdown={post.content} readonly />
          </Link>
        ) : (
          <Editor markdown={post.content} readonly />
        )}
        {post.see_more && (
          <Link className="w-max" href={`/post/${post.uuid}`}>
            Ver mais...
          </Link>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
