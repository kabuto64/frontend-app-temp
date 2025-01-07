import { defineSlotRecipe } from "@chakra-ui/react";
import { tableAnatomy } from "@chakra-ui/react/anatomy";

export const tableSlotRecipe = defineSlotRecipe({
  slots: tableAnatomy.keys(),
  base: {
    row: {
      _selected: {
        bg: "bg.subtle",
      },
    },
  },

  variants: {
    interactive: {
      true: {
        body: {
          "& tr": {
            _hover: {
              bg: "bg.subtle",
            },
          },
        },
      },
    },
  },
});