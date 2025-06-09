import { Post } from "@/types/post";
import { User } from "@/types/user";
import Link from "next/link";
import Editor from "./mark-down-editor";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar } from "./avatar";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import {
  ChatRound,
  MenuDots,
  Pen,
  TrashBinTrash,
} from "@solar-icons/react";
import { cn } from "@/lib/utils";
import IconOption from "./ui/icon-option";
import { useUser } from "@/contexts/auth-provider";
import api from "@/service/api";
import { useToast } from "@/service/toast";
import { useState } from "react";
import { useRouter } from "next/router";
import { PostIconFeedback } from "./post-icon-feedback";

export interface PostProps {
  post: Post;
  user: User;
  redirect?: boolean;
  className?: string;
}

export const UserPost: React.FC<PostProps> = ({
  post,
  user,
  redirect = false,
  className,
}) => {
  const router = useRouter();
  const toast = useToast();
  const { user: loggedUser } = useUser();

  const postDate = new Date(post.updated_at);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeletePost = () => {
    api
      .delete(`/post/${post.uuid}`)
      .then(() => {
        router.reload();
      })
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
        className={cn(
          "flex flex-col gap-2 pb-6 border-default-200 border-b-2 last:border-b-0 w-full",
          className
        )}
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
                  className="print:hidden right-0 absolute bg-default-200"
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
                    href={`/user/${post.user.username}/post/${post.uuid}/edit`}
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
          <Link
            href={`/user/${post.user.username}/post/${post.uuid}`}
            className="w-full"
          >
            <Editor markdown={post.content} readonly />
          </Link>
        ) : (
          <Editor markdown={post.content} readonly />
        )}
        <data className="flex flex-row items-center gap-2 min-h-7 text-default-500">
          <PostIconFeedback
            href={`/user/${post.user.username}/post/${post.uuid}`}
            title="Comentários"
            icon={<ChatRound size={16} />}
          >
            {post.answers_count}
          </PostIconFeedback>
          {/* <div>
            <EmojiPicker>
              <Button
                className="bg-default-200/75 text-default-500"
                radius="full"
                isIconOnly
                size="sm"
              >
                <EmojiFunnyCircle size={16} />
              </Button>
            </EmojiPicker>
          </div> */}
          {post.see_more && (
            <Link
              href={`/user/${post.user.username}/post/${post.uuid}`}
              className="w-max underline"
            >
              Ver mais...
            </Link>
          )}
        </data>
      </motion.div>
    </AnimatePresence>
  );
};
