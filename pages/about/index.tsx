import { Box, Divider, Flex, ListItem, UnorderedList } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import * as React from 'react'
import { LargeText, MediumText, SmallText } from '../../components/Typography'
import { useTranslate } from '../../hooks/useTranslate.ts'

const MotionBox = motion(Flex)

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}

const About: NextPage = () => {
  const router = useRouter()
  const translate = useTranslate(router.locale)
  return (
    <>
      <Head>
        <title>{translate('aboutme').head.headTitle}</title>
        <meta
          name="description"
          content={translate('aboutme').head.headDescription}
        />
      </Head>
      <MotionBox
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit"
        transition={{ duration: 0.3 }}
        height="100%"
        padding={{ xs: '0', md: '2em' }}
        flexDirection="column"
      >
        <Box id="about-me-header-container" marginBottom="1em">
          <Flex justifyContent={'center'}>
            <LargeText>{translate('aboutme').header}</LargeText>
          </Flex>
        </Box>
        <Divider m="1.5em 0" orientation="horizontal" />
        <Box padding="1em" lineHeight="1.8em">
          <MediumText>{translate('aboutme').greetings.headline}</MediumText>
          <Box padding="1em">
            <SmallText>{translate('aboutme').greetings.subtext1}</SmallText>
            <SmallText>{translate('aboutme').greetings.subtext2}</SmallText>
            <UnorderedList mt="0.4em">
              <ListItem>
                <SmallText>{translate('aboutme').greetings.subtext3}</SmallText>
              </ListItem>
              <ListItem>
                <SmallText>{translate('aboutme').greetings.subtext4}</SmallText>
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
        <Divider m="1.5em 0" orientation="horizontal" />
        <Box padding="1em" lineHeight="1.8em">
          <MediumText>{translate('aboutme').social.headline}</MediumText>
          <Box padding="1em">
            <UnorderedList>
              <ListItem>
                <Link
                  href="https://www.youtube.com/channel/UCDyFIpOt_mOYvT_scc1MzcQ"
                  passHref
                >
                  <a target="_blank">
                    <SmallText>Youtube</SmallText>
                  </a>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="mailto:fatihkurt387@gmail.com" passHref>
                  <a target="_blank">
                    <SmallText>Email</SmallText>
                  </a>
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.linkedin.com/in/fatih-kurt387/"
                  passHref
                >
                  <a target="_blank">
                    <SmallText>LinkedIn</SmallText>
                  </a>
                </Link>
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
        <Divider m="1.5em 0" orientation="horizontal" />
        <Box padding="1em" lineHeight="1.8em">
          <MediumText>{translate('aboutme').languages.headline}</MediumText>
          <Box padding="1em">
            <UnorderedList>
              <ListItem>
                <SmallText>{translate('aboutme').languages.subText1}</SmallText>
              </ListItem>
              <ListItem>
                <SmallText>{translate('aboutme').languages.subText2}</SmallText>
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
        <Divider m="1.5em 0" orientation="horizontal" />
        <Box padding="1em" lineHeight="1.8em">
          <MediumText>{translate('aboutme').quote.headline}</MediumText>
          <Box padding="1em">
            <SmallText>{translate('aboutme').quote.subText1}</SmallText>
          </Box>
        </Box>
      </MotionBox>
    </>
  )
}

export default About
