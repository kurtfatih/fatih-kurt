import {
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Flex,
  HStack,
  VStack,
} from '@chakra-ui/react'
import sanityClient from '../../client'
import { useRouter } from 'next/router'
import { GetStaticProps, NextPage } from 'next/types'
import * as React from 'react'
import { LargeText, XSmallText } from '../../components/Typography'
import { useTranslate } from '../../hooks/useTranslate'
import { motion } from 'framer-motion'
import Head from 'next/head'

const MotionBox = motion(VStack)

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
        rowGap={{ base: '1em', '2xl': '5em' }}
        px={{ base: '1em', md: '5em' }}
        pb={{ base: '3em', md: '5em' }}
        spacing="0"
        h="auto"
        justifyContent="space-between"
      >
        <VStack
          w="full"
          justifyContent="flex-start"
          alignItems="flex-start"
          id="skills-header"
        >
          <Flex justifyContent="center">
            <LargeText textProps={{ fontWeight: 'hairline' }}>
              {translate('skills').header}
            </LargeText>
          </Flex>
          <Divider mt="1em" w={{ xs: '100%', lg: '100%' }} />
        </VStack>

        <VStack w="full" rowGap="1em" id="languages">
          <HStack w="full" justifyContent="center">
            <LargeText>{translate('skills').subHeadline1}</LargeText>
            <Divider mt="1em" w={{ xs: '100%', lg: '100%' }} />
          </HStack>
          <VStack
            w="full"
            flexWrap="wrap"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <SkillsShowCase skills={languages.skills} />
          </VStack>
        </VStack>
        <VStack w="full" id="frontend">
          <HStack w="full" justifyContent="center">
            <LargeText>Frontend</LargeText>
            <Divider mt="1em" w={{ xs: '100%', lg: '100%' }} />
          </HStack>
          <VStack w="full" justifyContent="flex-start" alignItems="flex-start">
            <SkillsShowCase skills={frontend.skills} />
          </VStack>
        </VStack>
        <VStack w="full" id="backend">
          <HStack w="full" justifyContent="center">
            <LargeText>Backend</LargeText>
            <Divider mt="1em" w={{ xs: '100%', lg: '100%' }} />
          </HStack>
          <VStack
            w="full"
            flexWrap="wrap"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <SkillsShowCase skills={backend.skills} />
          </VStack>
        </VStack>
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
    <HStack
      flexWrap="wrap"
      justifyContent={{ base: 'center', md: 'flex-start' }}
      alignItems={{ base: 'center', md: 'flex-start' }}
      rowGap="0.5em"
      columnGap="0.5em"
      color="#fff"
      margin="0"
      spacing="0"
      w="full"
    >
      {skills.map(({ _key, skill_name, skill_value }) => {
        return (
          <VStack
            alignItems="center"
            display="flex"
            flexDir="column"
            key={_key}
            textAlign="center"
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
          </VStack>
        )
      })}
    </HStack>
  )
}

export default Skills
