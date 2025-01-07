import { Box, Container, Flex, useDisclosure } from "@chakra-ui/react";
import { ReactNode } from "@tanstack/react-router";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function Layout({ children }: { children: ReactNode }) {
  const { open, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex h="100vh">
        <Header onOpenSidebar={onOpen}></Header>
        <Sidebar isOpen={open} onClose={onClose} />
        <Box flex={1} overflow={"auto"} mt={12} ml={12}>
          <Container as="main" maxW={"11/12"} fluid={true} mt={5}>
            {children}
          </Container>
        </Box>
      </Flex>
    </>
  );
}
