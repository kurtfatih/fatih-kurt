import * as React from 'react'
import Image from 'next/image'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import sanityClient from '../../client'
import { Badge, Box, Button, Flex } from '@chakra-ui/react'
import { MediumText, SmallText, XSmallText } from '../../components/Typography'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslate } from '../../hooks/useTranslate'
import Head from 'next/head'

interface JobDetailProps {
  _createdAt: string
  _id: string
  description: string
  mainImage: string
  imageCollection: { asset: { url: string } }[]
  slug: string
  tags: string[]
  title: string
  projectUrl: string
  sourceUrl: string
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  try {
    const isTurkish = locale?.toLowerCase() === 'tr'
    const title = isTurkish ? 'content.title.tr' : 'content.title.en'
    const description = isTurkish
      ? 'content.description.tr_long'
      : 'content.description.en_long'
    const query = `
    *[_type == "jobs" && slug.current == "${params?.slug}"][0] {_createdAt,_id,"title":${title},"description":${description},"slug":slug.current,"mainImage":image.asset->url,"imageCollection":image_collection[]{asset->{url}},"tags":content.tags,"projectUrl":project_url,"sourceUrl":source_url}
  `
    const job = await sanityClient.fetch(query)

    if (!job) {
      return {
        notFound: true,
      }
    }

    return { props: { ...job }, revalidate: 30 }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const jobs = await sanityClient.fetch(
    `
    *[_type == "jobs"] | order(_createdAt desc) {"slug":slug.current}
  `
  )

  const pathsEn = jobs.map(({ slug }: { slug: string }) => {
    const path = { params: { slug: slug }, locale: 'en' }
    return path
  })
  const pathsTr = jobs.map(({ slug }: { slug: string }) => {
    const path = { params: { slug: slug }, locale: 'tr' }
    return path
  })

  const paths = [...pathsEn, ...pathsTr]

  return { paths, fallback: 'blocking' }
}

const JobDetail: NextPage<JobDetailProps> = ({
  _createdAt,
  _id,
  description,
  imageCollection,
  mainImage,
  projectUrl,
  tags,
  title,
  sourceUrl,
}) => {
  const router = useRouter()
  const translate = useTranslate(router.locale)
  return (
    <>
      <Head>
        <title>{`${translate('jobs').head.headTitle} / ${title} `}</title>
        <meta name="description" content={description} />
      </Head>
      <Box
        h="inherit"
        id={`detail-container-box-${_id}`}
        padding="1em"
        bgColor="white"
        overflowWrap="break-word"
      >
        {/* header */}
        <Box id="detail-header">
          <XSmallText textProps={{ color: 'blackAlpha.500' }}>
            {title}
          </XSmallText>
        </Box>
        <Flex
          id="detail-wrapper"
          justifyContent="space-between"
          h="100%"
          flexDir={{ xs: 'column', lg: 'row' }}
        >
          <Flex
            id="left"
            w={{ xs: '100%', lg: '70%' }}
            h="100%"
            flexDir="column"
          >
            <Flex
              flexDir={{ xs: 'column', lg: 'row' }}
              display={{ xs: 'none', lg: 'flex' }}
              h="50%"
              w="100%"
              id="image-collection-wrapper"
            >
              {imageCollection.map(({ asset }, index) => (
                <Box key={index} w="100%" position="relative">
                  <Image
                    objectFit="contain"
                    alt="collection-image"
                    src={asset.url}
                    layout="fill"
                  />
                </Box>
              ))}
            </Flex>
            <Flex
              h={{ xs: '100%', lg: '50%' }}
              w="100%"
              id="main-image-container"
            >
              <Box w="100%" position="relative">
                <Image
                  objectFit="contain"
                  alt="collection-image"
                  src={mainImage}
                  layout="fill"
                />
              </Box>
            </Flex>
          </Flex>
          <Flex id="right" w={{ xs: '100%', lg: '30%' }}>
            <Flex
              flex="1"
              h="100%"
              justifyContent="space-between"
              flexDirection="column"
              id="right-wrapper"
            >
              <Flex flexDirection="column" id="top">
                <Box alignSelf="flex-end" id="published-at">
                  <XSmallText textProps={{ color: 'blackAlpha.500' }}>
                    {translate('jobs_detail').createdAtText}
                  </XSmallText>
                  <XSmallText textProps={{ color: 'blackAlpha.500' }}>
                    {new Date(_createdAt).toLocaleDateString(router.locale)}
                  </XSmallText>
                </Box>
                <Box id="title-header" maxW="70%" mb="1em">
                  <MediumText
                    textProps={{ fontWeight: 'bold', color: 'blackk' }}
                  >
                    {title}
                  </MediumText>
                </Box>
                <Box id="tags">
                  {tags.map((tag, index) => (
                    <Badge
                      m="0 0.1em 0 0.1em"
                      colorScheme={
                        index === 0
                          ? 'linkedin'
                          : index === 1
                          ? 'orange'
                          : 'facebook'
                      }
                      key={index}
                    >
                      {tag}
                    </Badge>
                  ))}
                </Box>

                <Box marginTop="3em" alignSelf="details">
                  <Box id="descriptions">
                    <SmallText
                      textProps={{ color: 'black', lineHeight: 'taller' }}
                    >
                      {description}
                    </SmallText>
                  </Box>
                </Box>
              </Flex>
              <Flex flexDirection="column" padding="1em" alignItems="flex-end">
                <Box m="0.3em">
                  <Link href={sourceUrl ?? '#'} passHref>
                    <a target="_blank">
                      <Button
                        colorScheme="whatsapp"
                        disabled={!sourceUrl}
                        id="go-to-source-button"
                      >
                        {translate('jobs_detail').goToSourceButtonText}
                      </Button>
                    </a>
                  </Link>
                </Box>
                <Box m="0.3em">
                  <Link href={projectUrl ?? ''} passHref>
                    <a target="_blank">
                      <Button
                        colorScheme="teal"
                        disabled={!projectUrl}
                        id="go-to-site-button"
                      >
                        {translate('jobs_detail').goToProjectButtonText}
                      </Button>
                    </a>
                  </Link>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
export default JobDetail
