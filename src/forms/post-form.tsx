import Form from "@/components/form/form";
import Editor from "@/components/mark-down-editor";
import { useUser } from "@/contexts/auth-provider";
import { useDebounce } from "@/hooks/use-debounce";
import { useSessionStorage } from "@/hooks/use-session-storage";
import api from "@/service/api";
import {
  Button,
  CircularProgress,
  cn,
  Select,
  SelectItem,
} from "@heroui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface PostFormProps {
  uuid?: string;
  answerTo?: string;
  className?: string;
}

export const PostForm: React.FC<PostFormProps> = ({ uuid, answerTo, className }) => {
  const router = useRouter();
  const t = useTranslations();

  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [storedPost, setStoredPost, removeStoredPost] = useSessionStorage<string>(
    `post-${uuid ?? "new"}${answerTo ? `-answer-${answerTo}` : ""}`,
    ""
  );
  const [debounce] = useDebounce((post: string) => {
    setStoredPost(post);
  }, 1250);

  const [postHistory, setPostHistory] = useState<string>(storedPost);
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
    const data = {
      content: post,
      visibility,
      as,
      answer_to: answerTo,
    };
    const request = uuid
      ? api.put(`/post/${uuid}`, data)
      : api.post("/post", data);
    request
      .then(({ data }) => {
        removeStoredPost();
        console.log(data);
      
        router.push(`/user/${user?.username}/post/${data.uuid}`);
      })
      .catch(({ data }) => {
        setErrors(data.errors);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (uuid && !isDataLoaded) {
      setLoading(true);
      api
        .get(`/post/${uuid}`)
        .then(({ data }) => {
          setPost(data.content);
          setPostHistory(data.content);
          debounce(data.content);
          setErrors(undefined);
          setVisibility(data.visibility);
          setIsDataLoaded(true);
          setLoading(false);
        })
        .catch(() => {
          setIsDataLoaded(true);
          setLoading(false);
        });
    } else {
      setIsDataLoaded(true);
    }
  }, [uuid, router.query, isDataLoaded, debounce]);

  useEffect(() => {
    setPostLength(post?.length ?? 0);
  }, [post]);

  return (
    <Form
      className={cn(
        "w-full transition-opacity",
        (uuid && !isDataLoaded) || loading
          ? "opacity-35 pointer-events-none"
          : "opacity-100",
        className
      )}
    >
      <Editor
        markdown={post}
        before={postHistory}
        onChange={handleChange}
        contentEditableClassName={cn(postLength <= 0 ? "!text-default-400" : "!text-default-700")}
        placeholder="Escreva seu post aqui..."
      />
      <div className="flex flex-row justify-between gap-4 w-full h-max overflow-x-auto overflow-y-clip">
        <div className="flex justify-start items-start gap-2">
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
            <SelectItem key="public">{t("UI.input.select.public")}</SelectItem>
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
              <p key={index} title={error} className="text-danger-500 text-sm">
                {error}
              </p>
            ))}
      </div>
    </Form>
  );
};
