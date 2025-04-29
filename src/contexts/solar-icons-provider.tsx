import { SolarProvider } from "@solar-icons/react";

interface SolarIconsProviderProps {
  children: React.ReactNode;
}

const SolarIconsProvider: React.FC<SolarIconsProviderProps> = ({
  children,
}) => {
  return (
    <SolarProvider
      value={{ size: "24" }}
    >
      {children}
    </SolarProvider>
  );
};

export default SolarIconsProvider;
