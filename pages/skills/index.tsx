import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Flex,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import sanityClient from '../../client'
import { useRouter } from 'next/router'
import { GetStaticProps, NextPage } from 'next/types'
import * as React from 'react'
import { LargeText, XSmallText } from '../../components/Typography'
import { useTranslate } from '../../hooks/useTranslate'
import { motion } from 'framer-motion'
import Head from 'next/head'

const MotionBox = motion(Flex)

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}

type SkillsType = {
  skills: { _key: string; skill_name: string; skill_value: number }[]
  skills_title: string
}
interface SkillsPropsI {
  backend: SkillsType
  frontend: SkillsType
  languages: SkillsType
}

export const getStaticProps: GetStaticProps<SkillsPropsI> = async () => {
  const query = `
  *[_type == "skills" ]{skills_title,skills}
  `
  try {
    const skills = await sanityClient.fetch(query)
    if (skills.length === 0) {
      return {
        notFound: true,
      }
    }

    const languagesSkills = skills.filter(
      (skillObj: SkillsType) => skillObj.skills_title === 'Languages'
    )[0]

    const frontendSkills = skills.filter(
      (skillObj: SkillsType) => skillObj.skills_title === 'Frontend'
    )[0]

    const backendSkills = skills.filter(
      (skillObj: SkillsType) => skillObj.skills_title === 'Backend'
    )[0]

    return {
      props: {
        backend: backendSkills,
        frontend: frontendSkills,
        languages: languagesSkills,
      },
      revalidate: 60,
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

const Skills: NextPage<SkillsPropsI> = ({ backend, frontend, languages }) => {
  const router = useRouter()
  const translate = useTranslate(router.locale)

  return (
    <>
      <Head>
        <title>{translate('skills').head.headTitle}</title>
        <meta
          name="description"
          content={translate('skills').head.headDescription}
        />
      </Head>
      <MotionBox
        id="skills-container"
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit"
        transition={{ duration: 0.3 }}
        justifyContent="space-between"
        padding={{ xs: '0.2em', lg: '1.5em' }}
        flexDirection="column"
        h="100%"
      >
        <Box id="skills-header">
          <Flex justifyContent="center">
            <LargeText textProps={{ fontWeight: 'hairline' }}>
              {translate('skills').header}
            </LargeText>
          </Flex>
          <Flex m={{ xs: '0.5em', lg: '0' }} justifyContent="center">
            <Divider w={{ xs: '100%', lg: '25%' }} />
          </Flex>
        </Box>

        <Box margin="1em 0 1em 0" id="languages">
          <Flex
            flexDirection={{
              xs: 'column',
              lg: 'row',
            }}
            justifyContent="space-between"
            alignItems="flex-start"
            rowGap="0.6em"
            width={{ xs: '100%', lg: '50%' }}
            margin="auto"
          >
            <Flex mb={{ md: '1em', lg: 'unset' }} alignSelf="flex-start">
              <LargeText>{translate('skills').subHeadline1}</LargeText>
            </Flex>
            <Flex w={{ xs: '100%', lg: 'auto' }}>
              <SkillsShowCase skills={languages.skills} />
            </Flex>
          </Flex>
        </Box>
        <Flex m={{ xs: '0.5em', lg: '0' }} justifyContent="center">
          <Divider w={{ xs: '100%', lg: '50%' }} />
        </Flex>
        <Box margin="1em 0 1em 0" id="frontend">
          <Flex
            flexDirection={{
              xs: 'column',
              lg: 'row',
            }}
            justifyContent={{
              xs: 'space-between',
              lg: 'space-around',
            }}
            rowGap="0.5em"
            width={{ xs: '100%', lg: '90%' }}
            margin="auto"
          >
            <Flex mb="1em" alignSelf="flex-start">
              <LargeText>Frontend</LargeText>
            </Flex>
            <Flex>
              <SkillsShowCase skills={frontend.skills} />
            </Flex>
          </Flex>
        </Box>
        <Flex m={{ xs: '0.5em', lg: '0' }} justifyContent="center">
          <Divider w={{ xs: '100%', lg: '75%' }} />
        </Flex>
        <Box margin="1em 0 1em 0" id="backend">
          <Flex
            flexDirection={{
              xs: 'column',
              lg: 'row',
            }}
            justifyContent="space-between"
            width="100%"
            margin="auto"
            rowGap="0.5em"
          >
            <Flex mb="1em" alignSelf="flex-start">
              <LargeText>Backend</LargeText>
            </Flex>
            <Flex>
              <SkillsShowCase skills={backend.skills} />
            </Flex>
          </Flex>
        </Box>
        <Flex m={{ xs: '0.5em', lg: '0' }} justifyContent="center">
          <Divider w="100%" />
        </Flex>
      </MotionBox>
    </>
  )
}

interface SkillsShowCaseProps {
  skills: {
    _key: string
    skill_name: string
    skill_value: number
  }[]
}
const SkillsShowCase: React.FC<SkillsShowCaseProps> = ({ skills }) => {
  return (
    <Flex justifyContent="space-around" flexDir="row">
      <UnorderedList
        display="flex"
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        color="#fff"
        margin="0"
      >
        {skills.map(({ _key, skill_name, skill_value }) => {
          return (
            <ListItem
              alignItems="center"
              display="flex"
              flexDir="column"
              key={_key}
              m="0.2em"
            >
              <CircularProgress
                value={skill_value}
                id={skill_name}
                color={skill_value > 50 ? 'green' : 'orange'}
                size="100px"
                thickness="5px"
              >
                <CircularProgressLabel color="#fff">
                  {skill_value}%
                </CircularProgressLabel>
              </CircularProgress>
              <XSmallText>{skill_name}</XSmallText>
            </ListItem>
          )
        })}
      </UnorderedList>
    </Flex>
  )
}

export default Skills
