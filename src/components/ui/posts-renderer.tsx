import { Post } from "@/types/post";
import { Divider, Spinner } from "@heroui/react";
import { UserPost } from "../user-post";

export interface PostsRendererProps {
  posts?: Post[];
  placeholder?: React.ReactNode;
  hideInteractions?: boolean;
  hideHideAnswersTo?: boolean;
  feed?: boolean;
}

export const PostsRenderer: React.FC<PostsRendererProps> = ({
  posts,
  placeholder,
  hideInteractions = false,
  hideHideAnswersTo = false,
  feed = false,
}) => {
  return (
    <>
      {posts ? (
        <>
          {posts.length > 0 ? (
            <>
              {posts.map((post, index) => (
                <>
                  <UserPost
                    key={post.uuid}
                    post={post}
                    user={post.user}
                    redirect={feed}
                    className="px-0 pb-0"
                    hideInteractions={hideInteractions}
                    hideHideAnswersTo={hideHideAnswersTo}
                  />
                  {posts.length - 1 > index && (
                    <Divider className="bg-default-200 mb-4 h-[2px]" />
                  )}
                </>
              ))}
            </>
          ) : (
            <div className="w-full text-center">
              {placeholder ?? "Nada para ver por aquí"}
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center p-10 w-full">
          <Spinner color="current" label="Carregando" />
        </div>
      )}
    </>
  );
};
