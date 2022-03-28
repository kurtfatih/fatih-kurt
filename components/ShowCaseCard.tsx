import { Box, Badge, Flex } from '@chakra-ui/react'
import Image from 'next/image'

import * as React from 'react'
import { MediumText, SmallText } from './Typography'
interface ShowCaseCardProps {
  img: { src: string; _alt: string }
  tags: string[]
  title: string
  description: string
  createdAt: string
  slug: string
  onClick: (slug: string) => void
}
export const ShowCaseCard: React.FC<ShowCaseCardProps> = ({
  img,
  tags,
  title,
  description,
  onClick,
  slug,
}) => {
  return (
    <Box
      id="card-container"
      width="35%"
      height="max-content"
      minWidth={{ xs: '330px', sm: '350px', md: '400px' }}
      minHeight="400px"
      borderRadius="0.2em 0.2em 0 0"
      boxShadow="rgba(255, 255, 255, 0.4) -5px 5px, rgba(255, 255, 255, 0.3) -10px 10px, rgba(0, 0, 0, 0.2) -15px 15px, rgba(0, 0, 0, 0.1) -20px 20px, rgba(0, 0, 0, 0.05) -25px 25px;"
      backgroundColor="#fff"
      flexDirection="column"
      transition="transform .3s"
      transform={'translateY(3px)'}
      _hover={{
        transform: 'translateY(0px)',
        cursor: 'pointer',
      }}
      onClick={() => onClick(slug)}
    >
      <Flex
        id="card-wrapper"
        flexDir="column"
        justifyContent="space-between"
        h="100%"
      >
        <Flex id="card-preview-container" justifyContent="center" flex="2">
          <Image
            alt={img._alt}
            src={img.src}
            layout="fixed"
            objectFit="cover"
            objectPosition="center"
            height="300px"
            width="500px"
          />
        </Flex>
        <Flex
          id="card-body-container"
          flexDir="column"
          justifyContent="space-between"
          flex="1"
          rowGap="1em"
          padding="2em"
        >
          <Box id="card-title-container">
            <MediumText textProps={{ color: 'black', fontWeight: 'hairline' }}>
              {title}
            </MediumText>
          </Box>
          <Box id="card-description-container">
            <SmallText textProps={{ color: 'blackAlpha.600' }}>
              {description}
            </SmallText>
          </Box>
          <Box id="card-footer-container" alignSelf="flex-end">
            {tags.map((tag, index) => (
              <Badge
                m="0 0.1em 0 0.1em"
                colorScheme={
                  index === 0 ? 'linkedin' : index === 1 ? 'orange' : 'facebook'
                }
                key={index}
              >
                {tag}
              </Badge>
            ))}
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
