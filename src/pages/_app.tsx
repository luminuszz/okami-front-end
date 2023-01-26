import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { Roboto } from "@next/font/google";

// Query client
const queryClient = new QueryClient();

// Setting up Roboto font
const roboto = Roboto({
  display: "auto",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <main
          style={{ width: "100vw", height: "100vh" }}
          className={roboto.className}
        >
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
