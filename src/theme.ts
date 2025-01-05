import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  defineSlotRecipe,
} from "@chakra-ui/react";
import { drawerAnatomy, popoverAnatomy } from "@chakra-ui/react/anatomy";

const inputRecipe = defineRecipe({
  variants: {
    variant: {
      outline: {
        bg: { _light: "transparent", _dark: "whiteAlpha.100" },
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
const drawerSlotRecipe = defineSlotRecipe({
  slots: drawerAnatomy.keys(),
  variants: {
    placement: {
      start: {
        positioner: {
          justifyContent: "flex-start",
        },
        content: {
          _open: {
            animationName: {
              base: "slide-from-left-full",
              _rtl: "slide-from-right-full",
            },
          },
          _closed: {
            animationName: {
              base: "slide-to-left-full",
              _rtl: "slide-to-right-full",
            },
          },
        },
      },
    },
  },
});
const popoverSlotRecipe = defineSlotRecipe({
  slots: popoverAnatomy.keys(),
  base: {
    content: {
      "--popover-bg": { _light: "{colors.white}", _dark: "{#191c24}" },
    },
  },
});

const customConfig = defineConfig({
  theme: {
    recipes: { input: inputRecipe },
    slotRecipes: {
      drawer: drawerSlotRecipe,
      popover: popoverSlotRecipe,
    },
    tokens: {},
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: { _light: "{colors.gray.50}", _dark: "{#121318}" },
          },
          primary: {
            value: { _light: "{colors.white}", _dark: "{#191c24}" },
          },
          secondary: {
            value: { _light: "{colors.gray.100}", _dark: "{#212530}" },
          },
          th: {
            value: { _light: "{colors.gray.100}", _dark: "{#191c24}" },
          },
          th_hover: {
            value: { _light: "{colors.gray.200}", _dark: "{#212530}" },
          },
          hover: {
            value: { _light: "blackAlpha.200", _dark: "whiteAlpha.200" },
          },
        },
      },
    },
  },
  globalCss: {
    "html, body": {
      backgroundColor: "bg",
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
