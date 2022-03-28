import type { NextPage } from 'next'
import GitHubLogo from '../public/githubLogo.png'
import LinkedInLogo from '../public/linkedin.svg'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Flex, Box, useTheme, useMediaQuery, Button } from '@chakra-ui/react'
import {
  LargeText,
  MediumText,
  SmallText,
  XSmallText,
} from '../components/Typography'
import { useRouter } from 'next/router'
import { useTranslate } from '../hooks/useLanguage'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}

const Home: NextPage = () => {
  const router = useRouter()
  const theme = useTheme()
  const t = useTranslate(router.locale)

  const [isMobile] = useMediaQuery(
    `(max-width: ${theme.__breakpoints?.asObject.lg})`
  )
  const [isSmallMobile] = useMediaQuery(
    `(max-width: ${theme.__breakpoints?.asObject.sm})`
  )

  return (
    <>
      <Head>
        <title>{t('home').headTitle}</title>
        <meta name="description" content="Fatih Kurt Home Page" />
        <meta name="description" content="Hi I Am Fatih And I Am Learnerest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Hero  */}
      <MotionBox
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit"
        transition={{ duration: 1 }}
        id="hero-container"
        h="50%"
        w={{ xs: '100%', md: '50%' }}
        padding={{
          xs: '0.09em',
          sm: '0.4em',
          mds: '0.8em',
          lg: '2em',
        }}
      >
        <Flex
          h="70%"
          rowGap="1em"
          justifyContent="center"
          flexDirection="column"
        >
          <Box>
            <LargeText textProps={{ fontWeight: 'normal' }}>
              {t('home').heroHeadline}
            </LargeText>
          </Box>
          <Box>
            <MediumText textProps={{ fontWeight: 'hairline' }}>
              {t('home').heroSubText}
            </MediumText>
          </Box>
        </Flex>
        <Link href="/fatih-kurt-cv.pdf" locale={'en'} passHref>
          <Button
            disabled={router.locale === 'en'}
            borderRadius="35px"
            padding="1em"
            background="purpleToBlue"
            _hover={{
              transform: 'scale(1.1)',
            }}
            _active={{
              background: 'black',
            }}
          >
            <XSmallText textProps={{ fontWeight: 'hairline' }}>
              {t('home').heroButtonText}
            </XSmallText>
          </Button>
        </Link>
      </MotionBox>
      <MotionBox
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit"
        transition={{ duration: 1 }}
        id="home-footer"
        h="50%"
        padding={{
          xs: '0.09em',
          sm: '0.4em',
          mds: '0.8em',
          lg: '2em',
        }}
      >
        <Flex
          id="footer-flex-container"
          w="100%"
          h={{ xs: '90%', lg: '100%' }}
          alignItems="flex-end"
        >
          <Flex
            id="social-container"
            w={{ xs: '100%', lg: '35%' }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex id="social-left" w="50%" flexDirection="column">
              <MediumText textProps={{ fontWeight: 'thin' }}>
                Full-Stack
              </MediumText>
              <SmallText textProps={{ fontWeight: 'thin' }}>
                App Developer
              </SmallText>
            </Flex>
            {!isMobile && (
              <Flex id="social-right" w="62%" justifyContent="space-evenly">
                <Link href="https://github.com/kurtfatih" passHref>
                  <a target="_blank">
                    <Box
                      cursor="pointer"
                      _hover={{
                        transform: 'scale(1.2)',
                      }}
                    >
                      <Image
                        width={
                          isMobile ? (isSmallMobile ? '30px' : '45px') : '50px'
                        }
                        height={
                          isMobile ? (isSmallMobile ? '30px' : '45px') : '50px'
                        }
                        src={GitHubLogo}
                        alt="github-logo"
                        layout="fixed"
                      />
                    </Box>
                  </a>
                </Link>

                <Link
                  href="https://www.linkedin.com/in/fatih-kurt387/"
                  passHref
                >
                  <a target="_blank">
                    <Box
                      cursor="pointer"
                      _hover={{
                        transform: 'scale(1.2)',
                      }}
                      borderRadius="50px"
                    >
                      <Image
                        src={LinkedInLogo}
                        alt="linked-in-logo"
                        width={
                          isMobile ? (isSmallMobile ? '30px' : '45px') : '52px'
                        }
                        height={
                          isMobile ? (isSmallMobile ? '30px' : '45px') : '52px'
                        }
                        layout="fixed"
                      />
                    </Box>
                  </a>
                </Link>
                {/* <Box
                  cursor="pointer"
                  _hover={{
                    transform: 'scale(1.2)',
                  }}
                >
                  <Image
                    src={GitHubLogo}
                    width={
                      isMobile ? (isSmallMobile ? '30px' : '45px') : '52px'
                    }
                    height={
                      isMobile ? (isSmallMobile ? '30px' : '45px') : '52px'
                    }
                    layout="fixed"
                  />
                </Box>
                <Box
                  cursor="pointer"
                  _hover={{
                    transform: 'scale(1.2)',
                  }}
                >
                  <Image
                    src={GitHubLogo}
                    width={
                      isMobile ? (isSmallMobile ? '30px' : '45px') : '52px'
                    }
                    height={
                      isMobile ? (isSmallMobile ? '30px' : '45px') : '52px'
                    }
                    layout="fixed"
                  />
                </Box> */}
              </Flex>
            )}
          </Flex>
        </Flex>
      </MotionBox>
    </>
  )
}

export default Home
