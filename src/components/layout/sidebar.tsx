import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
} from "@/components/ui/drawer";
import { Box, IconButton, VStack } from "@chakra-ui/react";
import { FiHome } from "react-icons/fi";
import { PiListBold } from "react-icons/pi";
import { MdSend } from "react-icons/md";
import { LuCircleHelp } from "react-icons/lu";
import { IoSettingsSharp } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "@tanstack/react-router";
import { Tooltip, TooltipProps } from "@/components/ui/tooltip";
import { LayoutIconButton } from "./icon-button";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarTooltip = (props: TooltipProps) => {
  const { children, ...rest } = props;
  return (
    <Tooltip
      openDelay={500}
      closeDelay={100}
      positioning={{ placement: "right-end" }}
      contentProps={{ zIndex: "modal" }}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  return (
    <>
      <Box
        className="dark"
        bg="bg.panel"
        w={"12"}
        h="100vh"
        position="fixed"
        top={12}
        display={{ base: "none", md: "block" }}
        borderRightColor={"gray.800"}
        borderRightWidth={"1px"}
      >
        <VStack mt={2}>
          <SidebarTooltip content="Home">
            <LayoutIconButton onClick={() => navigate({ to: "/" })}>
              <FiHome />
            </LayoutIconButton>
          </SidebarTooltip>
          <SidebarTooltip content="Feedback">
            <LayoutIconButton>
              <MdSend />
            </LayoutIconButton>
          </SidebarTooltip>
          <SidebarTooltip content="Help">
            <LayoutIconButton>
              <LuCircleHelp />
            </LayoutIconButton>
          </SidebarTooltip>
          <SidebarTooltip content="notification">
            <LayoutIconButton>
              <FaBell />
            </LayoutIconButton>
          </SidebarTooltip>
          <SidebarTooltip content="config">
            <LayoutIconButton>
              <IoSettingsSharp />
            </LayoutIconButton>
          </SidebarTooltip>
        </VStack>
      </Box>
      {/* 展開時のフルサイドバー */}
      <DrawerRoot
        open={isOpen}
        onOpenChange={onClose}
        placement={"start"}
        size={"xs"}
      >
        <DrawerBackdrop />
        <DrawerContent className="dark" bg="bg.panel">
          <DrawerActionTrigger asChild>
            <IconButton
              variant={"ghost"}
              rounded="full"
              color="gray.50"
              _hover={{
                bg: "bg.alpha",
              }}
              position={"absolute"}
              top={1}
              left={1}
              css={{
                _icon: {
                  width: "5",
                  height: "5",
                },
              }}
            >
              <PiListBold />
            </IconButton>
          </DrawerActionTrigger>

          <DrawerHeader></DrawerHeader>
          <DrawerBody></DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </DrawerRoot>
    </>
  );
}
