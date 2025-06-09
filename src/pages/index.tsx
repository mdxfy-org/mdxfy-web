import Body from "@/components/body";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { getStaticPropsWithMessages } from "@/lib/get-static-props";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/service/api";
import { Post } from "@/types/post";
import { PostsRenderer } from "@/components/ui/posts-renderer";
import { PostForm } from "@/forms/post-form";
import { cn } from "@heroui/react";
import { useUser } from "@/contexts/auth-provider";

export default function UserPosts() {
  const router = useRouter();
  const pt = useTranslations("Pages.Index");

  const { user } = useUser();

  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    if (!router.isReady || posts) return;
    api.get(`/post`).then(({ data }) => {
      setPosts(data);
    });
  }, [router, posts]);

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Body className="flex flex-row justify-center" disableLoading>
        <section className="flex flex-col items-start gap-2 mx-auto p-4 px-6 max-w-[912px] container">
          <PostForm
            className={cn(
              "mb-4 pb-2 border-default-200 border-b-2",
              !!user ? "opacity-100" : "opacity-50 pointer-events-none"
            )}
          />
          <PostsRenderer posts={posts} feed />
        </section>
      </Body>
    </>
  );
}

export const getStaticProps = getStaticPropsWithMessages;
