import { useState } from "react";
import { useCombobox } from "downshift";
import { Box, Flex, Input, List } from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group";
import { LuSearch } from "react-icons/lu";
import { IoArrowForward } from "react-icons/io5";
import { IconType } from "react-icons";
import { LinkOptions, useNavigate } from "@tanstack/react-router";
import { FiHome } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";

interface Item {
  id: string;
  name: string;
  kana: string;
  katakana: string;
  romaji: string;
  icon: IconType;
  link: LinkOptions;
}

const items: Item[] = [
  {
    id: "1",
    name: "Home",
    kana: "ほーむ",
    katakana: "ホーム",
    romaji: "home",
    icon: FiHome,
    link: { to: "/" },
  },
  {
    id: "2",
    name: "Example",
    kana: "えぐざんぷる",
    katakana: "エグザンプル",
    romaji: "example",
    icon: IoMdSettings,
    link: { to: "/example" },
  },
];

function SearchBar() {
  const [inputItems, setInputItems] = useState(items);
  const navigate = useNavigate();

  // 検索ロジック
  const filterItems = (inputValue: string) => {
    const lowerInput = inputValue.toLowerCase();

    return items.filter((item) => {
      return (
        item.name.includes(inputValue) || // 漢字・漢字混じり
        item.kana.includes(inputValue) || // ひらがな
        item.katakana.includes(inputValue) || // カタカナ
        item.romaji.includes(lowerInput) // ローマ字（大文字小文字区別なし）
      );
    });
  };

  const { isOpen, getMenuProps, getInputProps, getItemProps, reset } =
    useCombobox({
      items: inputItems,
      onInputValueChange: ({ inputValue }) => {
        setInputItems(filterItems(inputValue ?? ""));
      },
      onSelectedItemChange: ({ selectedItem }) => {
        if (selectedItem) {
          navigate(selectedItem.link);
          reset();
        }
      },
    });

  return (
    <Box position="relative" w={"100%"}>
      <InputGroup flex="1" w={"100%"} startElement={<LuSearch />}>
        <Input
          color={"white"}
          size={"sm"}
          w={"100%"}
          {...getInputProps()}
          placeholder="Type to search..."
        />
      </InputGroup>
      <List.Root
        {...getMenuProps()}
        position="absolute"
        bg={"bg.panel"}
        width="100%"
        boxShadow="sm"
        borderRadius="md"
        mt={2}
        maxH="400px"
        overflowY="auto"
        display={isOpen ? "block" : "none"}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <List.Item
              key={`${item}${index}`}
              {...getItemProps({
                item,
                index,
              })}
              px={4}
              py={2}
              _hover={{ bg: "bg.muted" }}
              fontSize={"sm"}
              color={"fg.muted"}
              cursor="pointer"
              listStyleType={"none"}
            >
              <Flex justifyContent="space-between">
                <Box>
                  <List.Indicator asChild>
                    <item.icon />
                  </List.Indicator>
                  {item.name}
                </Box>
                <Box>
                  <List.Indicator>
                    <IoArrowForward />
                  </List.Indicator>
                </Box>
              </Flex>
            </List.Item>
          ))}
      </List.Root>
    </Box>
  );
}

export default SearchBar;
