import Form from "@/components/form/form";
import Editor from "@/components/mark-down-editor";
import { useDebounce } from "@/hooks/use-debounce";
import { useLocalStorage } from "@/hooks/use-local-storage";
import api from "@/service/api";
import { Button, Select, SelectItem } from "@heroui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface PostFormProps {
  uuid?: string;
}

export const PostForm: React.FC<PostFormProps> = ({ uuid }) => {
  const router = useRouter();
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
  const [errors, setErrors] = useState<string[]>();

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
        setErrors(data.errors.content);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (uuid) {
      setLoading(true);
      api
        .get(`/post/${uuid}`)
        .then(({ data }) => {
          setPost(data.content);
          setVisibility(data.visibility);
          setLoading(false);
        })
        .catch(({ data }) => {
          setErrors(data.errors.content);
          setLoading(false);
        }
      );
    }
  }, [uuid, storedPost, setStoredPost, removeStoredPost, setLoading]);

  return (
    <Form className="w-full">
      <Editor markdown={post} onChange={handleChange} />
      <div className="flex flex-row justify-between gap-4 w-full">
        <div>
          <Select
            name="visibility"
            placeholder="Selecione a visibilidade"
            aria-label="Visibilidade"
            className="w-[200px]"
            value={visibility}
            onChange={(e) => {
              setVisibility(e.target.value as "public" | "private" | "friends");
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
      <div>
        {errors &&
          errors.map((error, index) => (
            <p key={index} className="text-danger-500 text-sm">
              {error}
            </p>
          ))}
      </div>
    </Form>
  );
};
