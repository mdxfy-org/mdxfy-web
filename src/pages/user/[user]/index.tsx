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
import { Avatar } from "@/components/avatar";
import { Skeleton } from "@heroui/react";
import { UserProfileUpdateModal } from "@/components/ui/user-profile-update-modal";
import { useUser } from "@/contexts/auth-provider";

export default function UserPosts() {
  const router = useRouter();
  const pt = useTranslations("Pages.Index");

  const { user: loggedUser } = useUser();

  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    if (!router.isReady) return;
    const { user: userQuery } = router.query as Params;
    api.get(`/user/info/username/${userQuery}`).then(({ data }) => {
      setUser(data);
      api.get(`/post/user/${userQuery}`).then(({ data }) => {
        setPosts(data);
      });
    });
  }, [router.isReady, router.query]);

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Body className="flex flex-col justify-center">
        <section className="relative flex flex-col items-start gap-2 mx-auto p-4 px-6 max-w-[912px] container">
          <div className="flex flex-row gap-4">
            <Skeleton isLoaded={!!user} className="rounded-lg">
              <Avatar
                photoView
                src={user?.profile_picture}
                className="size-24"
                fallbackIconProps={{
                  size: 96,
                }}
                radius="sm"
              />
            </Skeleton>
            <div className="flex flex-col items-start gap-1">
              <Skeleton isLoaded={!!user} className="rounded-lg w-48 min-w-max">
                <div className="flex flex-row items-center gap-2">
                  <h1 className="w-max font-bold text-xl">
                    {user?.name ?? "user_name"}
                  </h1>
                  -
                  <p className="w-max text-gray-500 text-sm">
                    {user?.username ?? "username"}
                  </p>
                </div>
              </Skeleton>
              <Skeleton isLoaded={!!user} className="rounded-lg w-40">
                <p className="w-max text-gray-600">
                  {user?.email ?? "user_email"}
                </p>
              </Skeleton>
            </div>
          </div>
          {user && loggedUser?.id === user?.id && <UserProfileUpdateModal />}
        </section>
        <section className="flex flex-col items-start gap-6 mx-auto p-4 px-6 max-w-[912px] container">
          <PostsRenderer posts={posts} feed />
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
