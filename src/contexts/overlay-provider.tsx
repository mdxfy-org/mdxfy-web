import React, { createContext, useContext, ReactNode, useState } from "react";
interface OverlayContextProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  message: string | undefined;
  setMessage: (message: string | undefined) => void;
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
  const [message, setMessage] = useState<string | undefined>();

  return (
    <OverlayContext.Provider
      value={{ isLoading, setIsLoading, message, setMessage }}
    >
      {children}
    </OverlayContext.Provider>
  );
};
