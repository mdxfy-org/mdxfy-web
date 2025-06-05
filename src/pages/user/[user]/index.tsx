import Body from "@/components/body";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { GetStaticPaths } from "next";
import { Params } from "next/dist/server/request/params";
import { getStaticPropsWithMessages } from "@/lib/get-static-props";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/service/api";
import { Post } from "@/types/post";
import { PostsRenderer } from "@/components/ui/posts-renderer";
import { User } from "@/types/user";

export default function UserPosts() {
  const router = useRouter();
  const pt = useTranslations("Pages.Index");

  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    if (!router.isReady) return;
    const { user } = router.query as Params;
    api.get(`/user/info/username/${user}`).then(({ data }) => {
      setUser(data.user);
      api.get(`/post/user/${user}`).then(({ data }) => {
        setPosts(data);
      });
    });
  }, [router, posts]);

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Body className="flex flex-row justify-center">
        <section className="flex flex-col items-start gap-2 mx-auto p-4 px-6 max-w-[912px] container">
          {user && (
            <div className="flex flex-col items-start gap-2">
              <h1 className="font-bold text-2xl">{user.username}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          )}
        </section>
        <section className="flex flex-col items-start gap-6 mx-auto p-4 px-6 max-w-[912px] container">
          <PostsRenderer posts={posts} />
        </section>
      </Body>
    </>
  );
}

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps = getStaticPropsWithMessages;
