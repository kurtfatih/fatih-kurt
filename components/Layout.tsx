import { Box } from "@chakra-ui/react"
import * as React from "react"

export const Layout: React.FC = ({ children }) => {
  return (
    <Box
      overflow="hidden"
      maxWidth={{ base: "1382px", xl: "1600px" }}
      height="100vh"
      margin="auto"
      as="main"
    >
      {children}
    </Box>
  )
}
