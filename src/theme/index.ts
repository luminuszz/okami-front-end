import { extendTheme, Theme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },

  fonts: {
    body: "Roboto, sans-serif",
  },
} as Theme);

export default theme;
