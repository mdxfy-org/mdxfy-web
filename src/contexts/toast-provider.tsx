import Loading from "@/components/loading";
import { ToastProvider } from "@heroui/react";
import { Cancel01Icon } from "@hugeicons/react";

interface ToasterProviderProps {
  children: React.ReactNode;
}

const ToasterProvider: React.FC<ToasterProviderProps> = ({ children }) => {
  return (
    <>
      <ToastProvider
        placement="bottom-right"
        maxVisibleToasts={5}
        toastProps={{
          hideIcon: false,
          variant: "flat",
          radius: "md",
          classNames: {
            content: "gap-3",
            closeButton:
            "opacity-100 absolute right-3 top-1/2 -translate-y-1/2",
          },
          loadingIcon: <Loading />,
          closeIcon: <Cancel01Icon variant="bulk" />,
        }}
      />
      {children}
    </>
  );
};

export default ToasterProvider;
