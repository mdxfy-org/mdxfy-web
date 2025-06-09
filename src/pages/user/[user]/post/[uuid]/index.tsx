import Layout from "@/components/layout";
import { getStaticPropsWithMessages } from "@/lib/get-static-props";
import api from "@/service/api";
import { GetStaticPaths } from "next";
import { useTranslations } from "next-intl";
import { Params } from "next/dist/server/request/params";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import { UserPost } from "@/components/user-post";
import { PostForm } from "@/forms/post-form";
import { PostsRenderer } from "@/components/ui/posts-renderer";
import { cn } from "@/lib/utils";
import { Spinner } from "@heroui/react";
import NotFound from "@/components/error/not-found";

export default function Index() {
  const router = useRouter();
  const pt = useTranslations("Pages.Index");

  const [post, setPost] = useState<Post>();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!router.isReady || post) return;
    const { uuid } = router.query as Params;
    if (!uuid) return;
    api
      .get(`/post/${uuid}`)
      .then(({ data }) => {
        setPost(data);
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [router, post]);

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Layout className="flex flex-col gap-10 w-full" disableLoading>
        <section className="flex flex-col items-start gap-2 mx-auto p-4 px-6 max-w-[912px] container">
          {post && (
            <UserPost
              key={post.uuid}
              post={post}
              user={post.user}
              className="mb-2 pb-2"
            />
          )}
          <PostForm
            answerTo={router.query.uuid as string}
            className={cn(
              "mb-2 pb-2 border-default-200 border-b-2 transition-opacity duration-200",
              !!post ? "" : "hidden"
            )}
          />
          {post ? (
            <>
              <PostsRenderer
                posts={post?.answers ?? []}
                placeholder="Não há nenhuma resposta ainda"
              />
            </>
          ) : notFound ? (
            <NotFound>Post não encontrado</NotFound>
          ) : (
            <div className="flex justify-center p-10 w-full">
              <Spinner color="current" label="Carregando" />
            </div>
          )}
        </section>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps = getStaticPropsWithMessages;
