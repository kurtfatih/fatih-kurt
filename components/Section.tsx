import { Box } from '@chakra-ui/react'
import * as React from 'react'

export const Section: React.FC = ({ children }) => {
  return (
    <Box
      as="section"
      sx={{
        '&::-webkit-scrollbar': {
          width: '1em',
          borderRadius: '0.5em',
          backgroundColor: `rgba(255, 255, 255 ,0.5)`,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: `rgba(0, 0, 0 ,0.7)`,
        },
      }}
      overflowY="auto"
      overflowX="hidden"
      height="90vh"
    >
      {children}
    </Box>
  )
}
