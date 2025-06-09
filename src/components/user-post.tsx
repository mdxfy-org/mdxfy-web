import { Post } from "@/types/post";
import { User } from "@/types/user";
import Link from "next/link";
import Editor from "./mark-down-editor";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar } from "./avatar";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { ChatRound, MenuDots, Pen, TrashBinTrash } from "@solar-icons/react";
import { cn } from "@/lib/utils";
import IconOption from "./ui/icon-option";
import { useUser } from "@/contexts/auth-provider";
import api from "@/service/api";
import { useToast } from "@/service/toast";
import { useState } from "react";
import { useRouter } from "next/router";
import { PostIconFeedback } from "./post-icon-feedback";
import { linkFocusClasses } from "./link";

export interface PostProps {
  post: Post;
  user: User;
  redirect?: boolean;
  hideInteractions?: boolean;
  hideHideAnswersTo?: boolean;
  className?: string;
}

export const UserPost: React.FC<PostProps> = ({
  post,
  user,
  redirect = false,
  hideInteractions = false,
  hideHideAnswersTo = false,
  className,
}) => {
  const router = useRouter();
  const toast = useToast();
  const { user: loggedUser } = useUser();

  const answer = post.answers_to;

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
        id={`${post.uuid}`}
        key={post.uuid}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 100 }}
        viewport={{ once: false, margin: "-80px 0px" }}
        transition={{ duration: 0.2 }}
        className={cn("flex flex-col gap-2 px-2 pb-6 w-full", className)}
      >
        <div className="relative flex flex-row items-center gap-2">
          <Link
            className={cn(
              "flex flex-row items-center gap-2 min-w-max truncate !transition-none duration-0",
              linkFocusClasses
            )}
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
          {loggedUser?.id === post?.user?.id && !hideInteractions && (
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
            className={cn("w-full", linkFocusClasses)}
          >
            <Editor markdown={post.content} readonly />
          </Link>
        ) : (
          <Editor markdown={post.content} readonly />
        )}
        {!!answer && !hideHideAnswersTo && (
          <>
            <div className="relative flex flex-row items-center gap-2 text-default-600 text-sm">
              <Link href={`/user/${answer.user?.username}/post/${answer.uuid}`}>
                Respondeu{" "}
                <Link
                  className="font-medium hover:underline"
                  href={`/user/${answer.user?.username}`}
                >
                  {answer.user?.name}
                </Link>
              </Link>
            </div>
            <div className="relative flex flex-row items-center gap-2 text-sm">
              <Link
                href={`/user/${answer.user?.username}/post/${answer.uuid}`}
                className={linkFocusClasses}
              >
                <UserPost
                  post={answer}
                  user={answer.user}
                  className="p-4 border-2 border-default-200 !border-b-2 rounded-2xl max-h-[180px] overflow-hidden"
                  hideInteractions
                  redirect
                />
              </Link>
            </div>
          </>
        )}
        {!hideInteractions && (
          <div className="flex flex-row items-center gap-2 min-h-7 text-default-500">
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
                className="w-max decoration-default-400 hover:underline"
              >
                Ver mais...
              </Link>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
