import React, { createContext, useContext, ReactNode, useState } from "react";

interface OverlayContextProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isPageLoading: boolean;
  setIsPageLoading: (isPageLoading: boolean) => void;
  message: string | undefined;
  setMessage: (message: string | undefined) => void;
  pageMessage: string | undefined;
  setPageMessage: (pageMessage: string | undefined) => void;
}

const OverlayContext = createContext<OverlayContextProps | undefined>(
  undefined
);

export const useOverlay = (): OverlayContextProps => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within a OverlayProvider");
  }
  return context;
};

export const OverlayProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | undefined>();
  const [pageMessage, setPageMessage] = useState<string | undefined>(
    "Messages.info.loading"
  );

  return (
    <OverlayContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isPageLoading,
        setIsPageLoading,
        message,
        setMessage,
        pageMessage,
        setPageMessage,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};
