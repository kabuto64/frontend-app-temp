import { defineTokens } from "@chakra-ui/react";
import "@fontsource/noto-sans-jp";
import "@fontsource/noto-sans-jp/100.css";
import "@fontsource/noto-sans-jp/200.css";
import "@fontsource/noto-sans-jp/300.css";
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/500.css";
import "@fontsource/noto-sans-jp/600.css";
import "@fontsource/noto-sans-jp/700.css";
import "@fontsource/noto-sans-jp/800.css";
import "@fontsource/noto-sans-jp/900.css";
import "@fontsource/outfit";
import "@fontsource/outfit/100.css";
import "@fontsource/outfit/200.css";
import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/outfit/800.css";
import "@fontsource/outfit/900.css";

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
