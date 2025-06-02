import Layout from "@/components/layout";
import Editor from "@/components/mark-down-editor";
import { getStaticPropsWithMessages } from "@/lib/get-static-props";
import api from "@/service/api";
import { User } from "@/types/user";
import { Image } from "@heroui/react";
import { GetStaticPaths } from "next";
import { useTranslations } from "next-intl";
import { Params } from "next/dist/server/request/params";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import userPicture from "@public/img/user-default.png";
import { Post } from "@/types/post";

export default function Index() {
  const router = useRouter();
  // const t = useTranslations();
  const pt = useTranslations("Pages.Index");

  const [post, setPost] = useState<Post>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!router.isReady) return;
    const { uuid } = router.query as Params;
    if (!uuid) return;
    api
      .get(`/post/${uuid}`)
      .then(({ data }) => {
        setPost(data.post);
        setUser(data.user);
      })
      .catch(() => {
        // router.push("/post");
      });
  }, [router]);

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Layout className="flex flex-col gap-10 w-full">
        <section className="flex flex-col items-start gap-2 mx-auto p-4 max-w-[912px] container">
          {post && (
            <>
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={user?.profile_picture}
                  fallbackSrc={userPicture.src}
                  alt="Foto de perfil"
                  width={40}
                  height={40}
                />
                <Link href={`/user/${user?.username}`}>{user?.name}</Link>
              </div>
              <Editor markdown={post.content} readonly />
            </>
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
