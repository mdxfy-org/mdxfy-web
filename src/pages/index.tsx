import Body from "@/components/body";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { getStaticPropsWithMessages } from "@/lib/get-static-props";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/service/api";
import { Post } from "@/types/post";
import { UserPost } from "@/components/user-post";

export default function UserPosts() {
  const router = useRouter();
  // const t = useTranslations();
  const pt = useTranslations("Pages.Index");

  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    if (!router.isReady || posts) return;
    api
      .get(`/post`)
      .then(({ data }) => {
        setPosts(data);
      })
      .catch(() => {});
  }, [router, posts]);

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Body className="flex flex-row justify-center">
        <section className="flex flex-col items-start gap-6 mx-auto p-4 px-6 max-w-[912px] container">
          {posts &&
            posts.map((post) => (
              <UserPost key={post.uuid} post={post} user={post.user} />
            ))}
        </section>
      </Body>
    </>
  );
}

export const getStaticProps = getStaticPropsWithMessages;
