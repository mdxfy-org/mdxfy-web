import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { LazyThemeSwitcher } from "../ui/theme-switcher";
import dynamic from "next/dynamic";
import { Bug01Icon } from "@hugeicons/react";
import { LazyLanguageSelector } from "@/components/ui/language-selector";
import { useOverlay } from "@/contexts/overlay-provider";

const ThemeSwitcher = dynamic(() => import("@/components/ui/theme-switcher"), {
  ssr: false,
  loading: () => <LazyThemeSwitcher />,
});

const LanguageSelector = dynamic(
  () => import("@/components/ui/language-selector"),
  {
    ssr: false,
    loading: () => <LazyLanguageSelector size="sm" />,
  }
);

const RouteSelector = () => {
  const routes = [
    "/",
    "/login",
    "/sign-up",
    "/auth-code",
    "/forgot-pass",
    "/recover-token",
  ];
  const router = useRouter();

  const handleRouteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(event.target.value);
  };

  return (
    <Select
      onChange={handleRouteChange}
      className="max-w-[65%] text-medium"
      classNames={{
        popoverContent: "rounded-md",
      }}
      size="sm"
      radius="sm"
      aria-label="Route"
      placeholder="Select route"
    >
      {routes.map((route) => (
        <SelectItem key={route} value={route}>
          {route}
        </SelectItem>
      ))}
    </Select>
  );
};

const DebugOptions = () => {
  const { isLoading, setIsLoading } = useOverlay();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="right-4 bottom-4 z-[150] fixed">
      <Popover radius="sm" placement="top-end" offset={8}>
        <PopoverTrigger>
          <Button size="md" color="success" isIconOnly>
            <Bug01Icon
              type="rounded"
              variant="twotone"
              className="p-0.5 text-white pointer-events-none"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2 px-1 py-2 min-w-80 text-gray-700 dark:text-gray-200">
            <div className="font-bold text-small">Development debug panel</div>
            <div className="flex flex-row justify-between items-center text-tiny">
              <ThemeSwitcher size="sm" className="text-medium" />
              <hr className="flex-1 mx-2 border-dashed" />
              <p>Change theme</p>
            </div>
            <div className="flex flex-row justify-between items-center text-tiny">
              <Switch
                size="sm"
                defaultChecked={isLoading}
                onChange={(value) => {
                  setIsLoading(value.target.checked);
                }}
                className="text-medium"
              />
              <hr className="flex-1 mx-2 border-dashed" />
              <p>Loading</p>
            </div>
            <div className="flex flex-row justify-between items-center text-tiny">
              <LanguageSelector size="sm" />
              <hr className="flex-1 mx-2 border-dashed" />
              <p>Change language</p>
            </div>
            <div className="flex flex-row justify-between items-center text-tiny">
              <RouteSelector />
              <hr className="flex-1 mx-2 border-dashed" />
              <p>Change route</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DebugOptions;
