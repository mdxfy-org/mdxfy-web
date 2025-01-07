import Body from "@/components/body";
import { InformationCircleIcon } from "@hugeicons/react";
import {
  Button,
  Code,
  Form,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
} from "@nextui-org/react";
import { useState } from "react";
import EstoqueTemplate from "@/components/ui/mdxfy";
import { numberInputMask } from "@/lib/utils";
import Input from "@/components/input";
import { useTranslations } from "next-intl";
import { getStaticPropsWithMessages } from "@/lib/getStaticProps";
import Head from "next/head";
import Link from "next/link";

export default function ForgotPass() {
  const t = useTranslations();

  const [number, setNumber] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit");
  };

  return (
    <>
      <Head>
        <title>{t("Pages.ForgotPass.meta.title")}</title>
        <meta name="description" content={t("Pages.ForgotPass.meta.description")} />
      </Head>
      <Body className="flex flex-row" hideHeader>
        <div className="flex flex-1 justify-center md:items-center max-h-svh overflow-hidden overflow-y-auto">
          <div className="flex flex-col gap-4 px-8 py-6 w-full max-w-md min-h-max">
            <div className="flex flex-col items-center gap-2">
              <EstoqueTemplate.Logo className="w-40 h-10" />
            </div>
            <p className="pb-2 font-semibold text-2xl text-gray-700 text-left dark:text-gray-200">
              {t("UI.titles.inform_your_number")}
            </p>
            <Form
              className="flex flex-col flex-1 gap-4"
              validationBehavior="native"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col flex-1 md:flex-auto w-full">
                <Input
                  isRequired
                  className="text-gray-700 dark:text-gray-200"
                  endContent={
                    <Popover placement="top-end" radius="sm" offset={8}>
                      <PopoverTrigger>
                        <Button
                          type="button"
                          size="sm"
                          variant="flat"
                          className="-right-[9px]"
                          isIconOnly
                        >
                          <InformationCircleIcon
                            type="rounded"
                            variant="stroke"
                            className="text-default-700 text-xl pointer-events-none"
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="flex flex-col gap-1 px-1 py-2 max-w-xs text-gray-700 dark:text-gray-200">
                          <div className="font-bold text-small">
                            {t("UI.tooltips.write_number.title")}
                          </div>
                          <div className="text-tiny">
                            {t("UI.tooltips.write_number.info")}
                          </div>
                          <div className="text-tiny">
                            {t("UI.tooltips.write_number.example")}
                            <Code className="px-1 p-0.5 text-tiny">
                              +55 99 99999-9999
                            </Code>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  }
                  label={t("UI.labels.number")}
                  labelPlacement="outside"
                  name="text"
                  placeholder={t("UI.placeholders.write_number")}
                  value={number}
                  onChange={(e) => setNumber(numberInputMask(e.target.value))}
                  type="text"
                  variant="bordered"
                />
              </div>
              <Spacer y={8} />
              <div className="flex flex-col gap-4 w-full">
                <p className="text-gray-700 text-small text-start dark:text-gray-200">
                  {t("Legal.agreements.sign_in_terms")}
                </p>
                <Button className="w-full" color="primary" type="submit">
                  {t("UI.buttons.enter")}
                </Button>
                <div className="flex justify-between text-center text-small">
                  <Link
                    href="/sign-in"
                    className="hover:opacity-80 font-medium text-primary text-sm hover:underline transition-all"
                  >
                    {t("UI.redirects.create_account")}
                  </Link>
                  <Link
                    href="/login"
                    className="hover:opacity-80 font-medium text-primary text-sm hover:underline transition-all"
                  >
                    {t("UI.redirects.enter_existing_account")}
                  </Link>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Body>
    </>
  );
}

export const getStaticProps = getStaticPropsWithMessages;
