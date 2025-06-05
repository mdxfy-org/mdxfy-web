import { Post } from "@/types/post";
import { Spinner } from "@heroui/react";
import { UserPost } from "../user-post";

export interface PostsRendererProps {
  posts?: Post[];
  feed?: boolean;
}

export const PostsRenderer: React.FC<PostsRendererProps> = ({
  posts,
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
                />
              ))}
            </>
          ) : (
            <>Nada para ver por aqui.</>
          )}
        </>
      ) : (
        <Spinner
          color="current"
          className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 re"
          label="Carregando"
        />
      )}
    </>
  );
};
