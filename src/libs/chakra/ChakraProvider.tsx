import { ChakraProvider as ChakraUIProvider } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { system } from "@/theme"

export function ChakraProvider(props: { children: React.ReactNode }) {
  return (
    <ChakraUIProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {props.children}
      </ThemeProvider>
    </ChakraUIProvider>
  )
}