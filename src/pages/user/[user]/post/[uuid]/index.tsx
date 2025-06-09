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
import { Divider, Spinner } from "@heroui/react";
import NotFound from "@/components/error/not-found";

export default function Index() {
  const router = useRouter();
  const pt = useTranslations("Pages.Index");

  const [post, setPost] = useState<Post>();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const { uuid } = router.query as Params;
    if (!uuid) return;
    setPost(undefined);
    setNotFound(false);
    api
      .get(`/post/${uuid}`)
      .then(({ data }) => {
        setPost(data);
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [router.isReady, router.query, router.query.uuid]);

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
              className="mb-0 pb-0"
            />
          )}
          <Divider className="bg-default-200 mb-2 h-[2px]" />
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
                hideHideAnswersTo
                feed
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
