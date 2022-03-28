import { Box } from "@chakra-ui/react"
import * as React from "react"

export const Header: React.FC = ({ children }) => {
  return (
    <Box as="header" margin="1.5em">
      {children}
    </Box>
  )
}
