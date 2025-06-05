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
