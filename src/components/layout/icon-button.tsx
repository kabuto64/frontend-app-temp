"use client";

import {
  ClientOnly,
  IconButton,
  IconButtonProps,
  Skeleton,
} from "@chakra-ui/react";
import React from "react";

export const LayoutIconButton = React.forwardRef<
  HTMLButtonElement,
  IconButtonProps
>(function LayoutIconButton(props, ref) {
  const { children, ...rest } = props;
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        rounded="full"
        variant={"ghost"}
        size="sm"
        color="gray.50"
        bg="transparent"
        _hover={{
          bg: "bg.alpha",
        }}
        css={{
          _icon: {
            width: "5",
            height: "5",
          },
        }}
        ref={ref}
        {...rest}
      >
        {/* icon */}
        {children}
      </IconButton>
    </ClientOnly>
  );
});
