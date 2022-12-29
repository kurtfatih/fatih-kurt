import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  ListItem,
  Select,
  UnorderedList,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import * as React from 'react'
import { useTheme } from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/theme-tools/node_modules/@chakra-ui/utils'

import GitHubLogo from '../public/githubLogo.png'
import LinkedInLogo from '../public/linkedin.svg'
import { useTranslate } from '../hooks/useTranslate.ts'
import HamburgerIcon from '../public/hamburger.svg'
import { MediumText, SmallText } from './Typography'

export const NavBar: React.FC = () => {
  const theme = useTheme()
  const [isMobile] = useMediaQuery(
    `(max-width: ${theme.__breakpoints?.asObject.lg})`
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef<FocusableElement>(null)

  return (
    <Flex justifyContent="flex-end">
      {isMobile ? (
        <Box
          onClick={onOpen}
          cursor="pointer"
          minHeight="48px"
          id="hamburger_menu_container"
        >
          <Flex id="hamburger_menu_icon">
            {!isOpen && <Image src={HamburgerIcon} alt="hamburger_menu_icon" />}
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent bgColor="rgba(0,0,0,70%)">
                <DrawerCloseButton color="white" />
                <DrawerHeader fontSize={'1.25rem'}></DrawerHeader>
                <DrawerBody overflow="hidden">
                  <NavBarItemWrapper isSideBar />
                </DrawerBody>
                <DrawerFooter>
                  <Flex id="social-right" w="100%" justifyContent="flex-end">
                    <Link href="https://github.com/kurtfatih" passHref>
                      <a target="_blank">
                        <Box
                          cursor="pointer"
                          margin="5px"
                          _hover={{
                            transform: 'scale(1.2)',
                          }}
                        >
                          <Image
                            src={GitHubLogo}
                            width={'50px'}
                            height={'50px'}
                            layout="fixed"
                            alt="github-logo"
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
                          margin="5px"
                          _hover={{
                            transform: 'scale(1.2)',
                          }}
                          borderRadius="50px"
                        >
                          <Image
                            src={LinkedInLogo}
                            alt="linked-in-logo"
                            width="52px"
                            height="52px"
                            layout="fixed"
                          />
                        </Box>
                      </a>
                    </Link>
                  </Flex>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Flex>
        </Box>
      ) : (
        <NavBarItemWrapper />
      )}
    </Flex>
  )
}

const NavBarItemWrapper: React.FC<{
  isSideBar?: boolean
}> = ({ isSideBar = false }) => {
  const router = useRouter()
  const translate = useTranslate(router.locale)
  const navbarItems = [
    {
      path: translate('navbar').home,
      href: '/',
    },
    {
      path: translate('navbar').aboutme,
      href: '/about',
    },
    {
      path: translate('navbar').skills,
      href: '/skills',
    },
    {
      path: translate('navbar').jobs,
      href: '/jobs',
    },
  ]
  const selectLangValue = (selectedLangValue: string) => {
    if (selectedLangValue === 'en') {
      router.push(router.asPath, router.asPath, {
        locale: 'en',
      })
    }
    if (selectedLangValue === 'tr') {
      router.push(router.asPath, router.asPath, { locale: 'tr' })
    }
  }
  const langValue = router.locale?.toLowerCase() === 'tr' ? 'tr' : 'en'

  return (
    <UnorderedList
      flexDirection={isSideBar ? 'column' : 'row'}
      w={
        isSideBar
          ? '100%'
          : {
              xs: '50%',
              xl: router.locale?.toLocaleLowerCase() === 'tr' ? '40%' : '30%',
            }
      }
      justifyContent="space-evenly"
      display="flex"
      h={isSideBar ? '50%' : 'auto'}
    >
      {navbarItems.map(({ href, path }, index) => (
        <ListItem key={index}>
          <Link href={href} scroll={false} passHref>
            <a>
              {isSideBar ? (
                <MediumText
                  textProps={{
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'medium',
                    _hover: {
                      borderRadius: '10px',
                      padding: '0.2em',
                    },
                    transition: 'all 0.5s ease-out',
                  }}
                >
                  {path}
                </MediumText>
              ) : (
                <SmallText
                  textProps={{
                    color: isSideBar ? 'black' : 'white',
                    cursor: 'pointer',
                    _hover: {
                      transform: 'scale(1.1)',
                      textDecoration: 'underline',
                      textUnderlinePosition: 'under',
                      textUnderlineOffset: '0.2em',
                    },
                    transition: 'all 0.2s ease-in',
                  }}
                >
                  {path}
                </SmallText>
              )}
            </a>
          </Link>
        </ListItem>
      ))}
      <Flex w="max-content" alignSelf={isSideBar ? 'flex-end' : 'unset'}>
        <Select
          id="language-selector"
          alignSelf="flex-end"
          onChange={(e) => {
            selectLangValue(e.target.value)
          }}
          bgColor="white"
          variant="flashed"
          value={langValue}
        >
          <option value="en">EN</option>
          <option value="tr">TR</option>
        </Select>
      </Flex>
    </UnorderedList>
  )
}
