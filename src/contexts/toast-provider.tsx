import { Toaster } from "react-hot-toast";

interface ToasterProviderProps {
  children: React.ReactNode;
}

const ToasterProvider: React.FC<ToasterProviderProps> = ({ children }) => {
  return (
    <>
      <Toaster
        position="top-right"
        // gutter={8}
        // containerStyle={{ zIndex: 200 }}
        toastOptions={{
          className: "bg-slate-50 dark:bg-neutral-900",
        }}
      />
      {children}
    </>
  );
};

export default ToasterProvider;
