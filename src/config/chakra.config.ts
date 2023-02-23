// extend chakra theme

import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "Merriweather, serif",
    body: "Poppins, sans-serif",
  },
  colors: {
    biru: {
      100: "#CFF5E7",
      200: "#A0E4CB",
      500: "#59C1BD",
      600: "#0D4C92",
    },
    birukartu: {
      100: "rgba(168, 198, 233, 0.76)",
      200: "rgba(13, 76, 146, 0.65)",
      300: "rgba(13, 76, 146, 0.95)",
    },
  },
});
