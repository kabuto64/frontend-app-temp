import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { inputRecipe } from "./recipes/input";
import { drawerSlotRecipe } from "./recipes/drawer";
import { tableSlotRecipe } from "./recipes/table";
import { fonts } from "./tokens/fonts";
import { semanticColors } from "./semantic-tokens/colors";
import { tabsSlotRecipe } from "./recipes/tabs";

const customConfig = defineConfig({
  theme: {
    recipes: {
      input: inputRecipe,
    },
    slotRecipes: {
      drawer: drawerSlotRecipe,
      table: tableSlotRecipe,
      tabs: tabsSlotRecipe,
    },
    tokens: {
      fonts,
    },
    semanticTokens: {
      colors: semanticColors,
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
