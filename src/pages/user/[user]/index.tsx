import Body from "@/components/body";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { GetStaticPaths } from "next";
import { Params } from "next/dist/server/request/params";
import { getStaticPropsWithMessages } from "@/lib/get-static-props";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { useRouter } from "next/router";
import api from "@/service/api";
import { Post } from "@/types/post";
import userPicture from "@public/img/user-default.png";
import { Image } from "@heroui/react";
import Link from "next/link";
import Editor from "@/components/mark-down-editor";

export default function UserPosts() {
  const router = useRouter();
  // const t = useTranslations();
  const pt = useTranslations("Pages.Index");

  const [posts, setPosts] = useState<Post[]>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!router.isReady) return;
    const { user } = router.query as Params;
    if (!user || posts) return;
    api
      .get(`/post/user/${user}`)
      .then(({ data }) => {
        setUser(data.user);
        setPosts(data.posts);
      })
      .catch(() => {
        // router.push("/post");
      });
  }, [router, posts]);
  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Body className="flex flex-row justify-center">
        <section className="flex flex-col items-start gap-6 mx-auto p-4 max-w-[912px] container">
          {posts &&
            posts.map((post) => (
              <div key={post.uuid} className="flex flex-col gap-2 pb-6 border-divider border-b last:border-b-0 w-full">
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
              </div>
            ))}
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
