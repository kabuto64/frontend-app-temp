import { defineSlotRecipe } from "@chakra-ui/react";
import { drawerAnatomy } from "@chakra-ui/react/anatomy";

export const drawerSlotRecipe = defineSlotRecipe({
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