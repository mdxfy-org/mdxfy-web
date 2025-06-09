import { Post } from "@/types/post";
import { Spinner } from "@heroui/react";
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
              {posts.map((post) => (
                <UserPost
                  key={post.uuid}
                  post={post}
                  user={post.user}
                  redirect={feed}
                  hideInteractions={hideInteractions}
                  hideHideAnswersTo={hideHideAnswersTo}
                />
              ))}
            </>
          ) : (
            <div className="w-full text-center">{placeholder ?? 'Nada para ver por aquí'}</div>
          )}
        </>
      ) : (
        <div className="flex justify-center p-10 w-full">
          <Spinner
            color="current" 
            label="Carregando"
          />
        </div>
      )}
    </>
  );
};
