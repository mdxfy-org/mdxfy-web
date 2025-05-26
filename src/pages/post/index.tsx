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

export default function Index() {
  // const t = useTranslations();
  const pt = useTranslations("Pages.Index");

  const [, setLoading] = useState(false);
  const [post, setPost] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");

  const handleSave = (as: "draft" | "post" = "post") => {
    if (!post) return;
    setLoading(true);
    api
      .post("/post", { content: post, visibility: visibility, as: as })
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Layout className="flex flex-col gap-10 pt-20 w-full">
        <section className="flex flex-col items-start gap-6 mx-auto p-4 max-w-[912px] container">
          <Editor value={post} onChange={setPost} />
          <div className="flex flex-row justify-between gap-4 w-full">
            <div>
              <Select
                name="visibility"
                placeholder="Selecione a visibilidade"
                aria-label="Visibilidade"
                className="w-[200px]"
                onChange={(e) => {
                  setVisibility(e.target.value);
                }}
              >
                <SelectItem key="public">Publico</SelectItem>
                <SelectItem key="private">Privado</SelectItem>
                <SelectItem key="friends">Amigos</SelectItem>
              </Select>
            </div>
            <div className="flex flex-row gap-4">
              <Button onPress={() => handleSave("draft")}>
                Salvar como rascunho
              </Button>
              <Button onPress={() => handleSave("post")} color="primary">
                Fazer post
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps = getStaticPropsWithMessages;
