import "@/styles/globals.css";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { Roboto } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Query client
export const queryClient = new QueryClient();

// Setting up Roboto font
const roboto = Roboto({
  display: "auto",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <main
            style={{ width: "100%", height: "100%" }}
            className={roboto.className}
          >
            <Hydrate state={pageProps?.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </main>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}
