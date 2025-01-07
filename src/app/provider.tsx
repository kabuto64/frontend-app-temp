import { QueryProvider } from "@/libs/tanstack/query/QueryProvider"
import { ChakraProvider } from "@/libs/chakra/ChakraProvider"
import { RouterProvider } from "@/libs/tanstack/router/RouterProvider"

export function AppProvider() {
  return (
    <QueryProvider>
      <ChakraProvider>
        <RouterProvider />
      </ChakraProvider>
    </QueryProvider>
  )
}