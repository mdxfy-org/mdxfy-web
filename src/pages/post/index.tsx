import Layout from "@/components/layout";
import { getStaticPropsWithMessages } from "@/lib/get-static-props";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Editor from "@/components/mark-down-editor";
import Button from "@/components/button";
import Select from "@/components/input/select";
import { SelectItem } from "@heroui/react";
import { useState } from "react";
import api from "@/service/api";
import Form from "@/components/form/form";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  // const t = useTranslations();
  const pt = useTranslations("Pages.Index");

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<string>("");
  const [visibility, setVisibility] = useState<
    "public" | "private" | "friends"
  >("public");

  const handleSave = (as: "draft" | "post" = "post") => {
    if (!post) return;
    setLoading(true);
    api
      .post("/post", { content: post, visibility: visibility, as: as })
      .then(({ data }) => {
        console.log(data);
        router.push(`/post/${data.uuid}`);
      })
      .catch(() => {});
    // .finally(() => {
    //   setLoading(false);
    // });
  };

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Layout className="flex flex-col gap-10 w-full">
        <section className="flex flex-col items-start gap-6 mx-auto p-4 px-6 max-w-[912px] container">
          <Form className="w-full">
            <Editor
              markdown={post}
              onChange={(val) => {
                setPost(val);
              }}
            />
            <div className="flex flex-row justify-between gap-4 w-full">
              <div>
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
                  <SelectItem key="public">Publico</SelectItem>
                  <SelectItem key="private">Privado</SelectItem>
                  <SelectItem key="friends">Amigos</SelectItem>
                </Select>
              </div>
              <div className="flex flex-row gap-4">
                <Button
                  isLoading={loading}
                  type="submit"
                  onPress={() => handleSave("draft")}
                >
                  Salvar como rascunho
                </Button>
                <Button
                  isLoading={loading}
                  type="submit"
                  onPress={() => handleSave("post")}
                  color="primary"
                >
                  Fazer post
                </Button>
              </div>
            </div>
          </Form>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps = getStaticPropsWithMessages;
