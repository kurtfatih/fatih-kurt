import { Button } from '@chakra-ui/react'
import React from 'react'
import { XSmallText } from './Typography'

interface ButtonI {
  onClick?: () => void
  buttonText: string
}
export const ButtonComponent: React.FC<ButtonI> = ({ onClick, buttonText }) => {
  return (
    <Button
      borderRadius="35px"
      padding="1em"
      onClick={onClick}
      background="purpleToBlue"
      _hover={{
        transform: 'scale(1.1)',
      }}
      _active={{
        background: 'black',
      }}
    >
      <XSmallText textProps={{ fontWeight: 'hairline' }}>
        {buttonText}
      </XSmallText>
    </Button>
  )
}
