import { defineTokens } from "@chakra-ui/react";
import "@fontsource/noto-sans-jp";
import "@fontsource/outfit";

const fallback = `-apple-system, BlinkMacSystemFont, Outfit, Noto Sans JP, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

export const fonts = defineTokens.fonts({
  heading: {
    value: `Inter, ${fallback}`,
  },
  body: {
    value: `Inter, ${fallback}`,
  },
  mono: {
    value: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
  },
});
