import React from 'react'
import { Text, TextProps } from '@chakra-ui/react'

const XSmallText: React.FC<{ textProps?: Omit<TextProps, 'fontSize'> }> = ({
  textProps,
  children,
}) => {
  return (
    <Text
      color="white"
      fontSize={{ xs: 'xs', md: 'xs', '2xl': 'sm' }}
      {...textProps}
    >
      {children}
    </Text>
  )
}

const SmallText: React.FC<{ textProps?: Omit<TextProps, 'fontSize'> }> = ({
  textProps,
  children,
}) => {
  return (
    <Text
      color="white"
      fontSize={{ xs: 'sm', md: 'sm', '2xl': 'md' }}
      {...textProps}
    >
      {children}
    </Text>
  )
}

const MediumText: React.FC<{ textProps?: Omit<TextProps, 'fontSize'> }> = ({
  textProps,
  children,
}) => {
  return (
    <Text
      fontSize={{ base: 'l' }}
      color="white"
      {...textProps}
      lineHeight={{ xs: 'short', sm: 'base' }}
    >
      {children}
    </Text>
  )
}
const LargeText: React.FC<{ textProps?: Omit<TextProps, 'fontSize'> }> = ({
  textProps,
  children,
}) => {
  return (
    <Text
      color="white"
      fontSize={{ base: 'xl' }}
      lineHeight={{ base: 'short' }}
      {...textProps}
    >
      {children}
    </Text>
  )
}

export { SmallText, MediumText, LargeText, XSmallText }
