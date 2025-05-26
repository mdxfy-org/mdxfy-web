import { useTranslations } from "next-intl";
import Mdxfy from "../ui/mdxfy";
import Link from "@/components/link";
import { useRouter } from "next/router";

const NotFound: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();

  return (
    <div className="top-1/4 absolute inset-0 flex flex-1 justify-center md:items-center pt-8 md:pt-0 h-96">
      <div className="flex flex-col gap-4 px-8 py-6 w-full max-w-md min-h-max">
        <div className="flex flex-col items-center">
          <Mdxfy.Logo className="w-72 h-min" />
          <p className="py-2 font-semibold text-gray-700 dark:text-gray-200 text-2xl text-center">
            {t("Pages.NotFound.messages.page_not_found")}
          </p>
          {router.asPath === "/404" && (
            <p className="text-gray-700 text-medium dark:text-gray-200 text-center">
              {t("Pages.NotFound.messages.as_expected")}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <Link href="/">{t("Pages.NotFound.messages.back_to_safety")}</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
