import { Spinner, ToastProvider } from "@heroui/react";
import { CloseSquare } from "@solar-icons/react";

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
            content: "gap-3 mr-4",
            closeButton:
              "opacity-100 absolute right-3 top-1/2 size-8 -translate-y-1/2",
          },
          loadingIcon: <Spinner />,
          closeIcon: <CloseSquare size={40} />,
        }}
      />
      {children}
    </>
  );
};

export default ToasterProvider;
