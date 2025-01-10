import { Avatar } from "@/components/ui/avatar";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Box, Flex, HStack, IconButton, Input, Text } from "@chakra-ui/react";
import { PiListBold } from "react-icons/pi";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchBar from "./searchbar";
interface HeaderProps {
  onOpenSidebar: () => void;
}

export function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <>
      <Box
        className="dark"
        bg="bg.panel"
        w={"100%"}
        px={1}
        position="fixed"
        top="0"
        zIndex={"sticky"}
        borderBottomColor={"gray.800"}
        borderBottomWidth={"1px"}
      >
        <Flex h={12} alignItems="center" justifyContent="space-between">
          <IconButton
            variant={"ghost"}
            rounded="full"
            color="gray.50"
            onClick={onOpenSidebar}
            _hover={{
              bg: "bg.alpha",
            }}
          >
            <PiListBold />
          </IconButton>
          <Box flex={1} maxW={"600px"}>
            <SearchBar />
            {/* <InputGroup flex="1" px={5} w={"100%"} startElement={<LuSearch />}>
              <Input color={"white"} size={"sm"} w={"100%"} />
            </InputGroup> */}
          </Box>
          <HStack>
            <ColorModeButton
              color="gray.50"
              _hover={{
                bg: "bg.alpha",
              }}
            ></ColorModeButton>
            <PopoverRoot>
              <PopoverTrigger asChild>
                <IconButton variant={"ghost"} bg={"transparent"}>
                  <Avatar colorPalette="gray" size="xs" mr={2} />
                </IconButton>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  <PopoverTitle fontWeight="medium">Naruto Form</PopoverTitle>
                  <Text my="4">
                    Naruto is a Japanese manga series written and illustrated by
                    Masashi Kishimoto.
                  </Text>
                  <Input placeholder="Your fav. character" size="sm" />
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}
export default Header;
