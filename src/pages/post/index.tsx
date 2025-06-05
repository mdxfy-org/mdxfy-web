"use client";

import Layout from "@/components/layout";
import { getStaticPropsWithMessages } from "@/lib/get-static-props";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Editor from "@/components/mark-down-editor";
import Button from "@/components/button";
import Select from "@/components/input/select";
import { CircularProgress, SelectItem } from "@heroui/react";
import { useEffect, useState } from "react";
import api from "@/service/api";
import Form from "@/components/form/form";
import { useRouter } from "next/router";
import { useDebounce } from "@/hooks/use-debounce";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function Index() {
  const router = useRouter();
  const t = useTranslations();
  const pt = useTranslations("Pages.Index");

  const [loading, setLoading] = useState(false);

  const [storedPost, setStoredPost, removeStoredPost] = useLocalStorage<string>(
    "post",
    ""
  );
  const [debounce] = useDebounce((post: string) => {
    if (!post || post.length < 20) return;
    setStoredPost(post);
  }, 500);

  const [post, setPost] = useState<string>(storedPost);
  const [postLength, setPostLength] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string | string[]>>();

  const [visibility, setVisibility] = useState<
    "public" | "private" | "friends"
  >("public");

  const handleChange = (val: string) => {
    setPost(val);
    debounce(val);
    setErrors(undefined);
  };

  const handleSave = (as: "draft" | "post" = "post") => {
    if (!post) return;
    setLoading(true);
    api
      .post("/post", { content: post, visibility: visibility, as: as })
      .then(({ data }) => {
        removeStoredPost();
        router.push(`/post/${data.uuid}`);
      })
      .catch(({ data }) => {
        setErrors(data.errors);
        setLoading(false);
      });
    // .finally(() => {
    //   setLoading(false);
    // });
  };

  useEffect(() => {
    setPostLength(post.length);
  }, [post]);

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Layout className="flex flex-col gap-10 pb-16 w-full">
        <section className="flex flex-col items-start gap-6 mx-auto p-4 px-6 max-w-[912px] container">
          <Form className="w-full">
            <Editor markdown={post} onChange={handleChange} />
            <div className="flex flex-row justify-between gap-4 w-full h-max overflow-x-auto overflow-y-clip">
              <div className="flex justify-start items-start gap-2">
                <Select
                  name="visibility"
                  placeholder="Selecione a visibilidade"
                  aria-label="Visibilidade"
                  className="w-[200px]"
                  value={visibility}
                  onChange={(e) => {
                    setVisibility(
                      e.target.value as "public" | "private" | "friends"
                    );
                  }}
                >
                  <SelectItem key="public">
                    {t("UI.input.select.public")}
                  </SelectItem>
                  <SelectItem key="private">
                    {t("UI.input.select.private")}
                  </SelectItem>
                  <SelectItem key="friends">
                    {t("UI.input.select.friends")}
                  </SelectItem>
                </Select>
                <CircularProgress
                  aria-label="Caracteres"
                  color={
                    postLength >= 9500
                      ? "danger"
                      : postLength >= 8000
                      ? "warning"
                      : "primary"
                  }
                  size="md"
                  showValueLabel={true}
                  minValue={0}
                  value={postLength}
                  maxValue={10000}
                />
                <div className="flex justify-center items-center h-full">
                  <p className="w-max truncate">
                    {t("UI.placeholders.characters", {
                      number: postLength,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <Button
                  isLoading={loading}
                  type="submit"
                  onPress={() => handleSave("draft")}
                >
                  {t("UI.buttons.save_as_draft")}
                </Button>
                <Button
                  isLoading={loading}
                  type="submit"
                  onPress={() => handleSave("post")}
                  color="primary"
                >
                  {t("UI.buttons.save_post")}
                </Button>
              </div>
            </div>
            <div>
              {errors &&
                Object.values(errors)
                  .flat()
                  .map((error: string, index: number) => (
                    <p
                      key={index}
                      title={error}
                      className="text-danger-500 text-sm"
                    >
                      {error}
                    </p>
                  ))}
            </div>
          </Form>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps = getStaticPropsWithMessages;
