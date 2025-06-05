import { Post } from "@/types/post";
import { Spinner } from "@heroui/react";
import { UserPost } from "../user-post";

export interface PostsRendererProps {
  posts?: Post[];
}

export const PostsRenderer: React.FC<PostsRendererProps> = ({ posts }) => {
  return (
    <>
      {posts ? (
        <>
          {posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <UserPost key={post.uuid} post={post} user={post.user} />
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
