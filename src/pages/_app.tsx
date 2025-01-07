import MainProvider from "@/contexts/main-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MainProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </MainProvider>
  );
};

export default App;
