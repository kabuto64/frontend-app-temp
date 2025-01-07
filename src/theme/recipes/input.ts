import { defineRecipe } from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  variants: {
    variant: {
      outline: {
        bg: { _light: "transparent", _dark: "whiteAlpha.200" },
        focusVisibleRing: "mixed",
        focusRingColor: "cyan.focusRing",
      },
      subtle: {
        focusVisibleRing: "mixed",
        focusRingColor: "cyan.focusRing",
      },
    },
  },
});