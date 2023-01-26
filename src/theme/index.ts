import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },

  styles: {
    global: {
      body: {
        backgroundColor: "blue.900",
      },
    },
  },

  fonts: {
    body: "Roboto, sans-serif",
    mono: "Roboto Mono, monospace",
    heading: "Roboto, sans-serif",
  },
});

export default theme;
