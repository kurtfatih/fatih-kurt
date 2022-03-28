import * as React from 'react'
import sanityClient from '../../client'
import { ShowCaseCard } from '../../components/ShowCaseCard'
import { Box, Flex } from '@chakra-ui/react'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useTranslate } from '../../hooks/useLanguage'

interface PostsProps {
  posts: {
    _createdAt: string
    _id: string
    description: string
    title: string
    slug: string
    imageUrl: string
    tags: string[]
  }[]
}

export const getStaticProps: GetStaticProps<PostsProps> = async ({
  locale,
}) => {
  const isTurkish = locale?.toLowerCase() === 'tr'
  const title = isTurkish ? 'content.title.tr' : 'content.title.en'
  const description = isTurkish
    ? 'content.description.tr'
    : 'content.description.en'

  const query = `
    *[_type == "jobs"] | order(_createdAt asc) {_createdAt,_id,"title":${title},"description":${description},"slug":slug.current,"imageUrl": image.asset->url,"tags":content.tags}
  `
  try {
    const posts = await sanityClient.fetch(query)
    if (posts.length === 0) {
      return {
        notFound: true,
      }
    }

    return { props: { posts } }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

type JobItems = {
  id: string
  tags: string[]
  description: string
  title: string
  img: { _alt: string; src: string }
  slug: string
}[]

const Jobs: NextPage<PostsProps> = ({ posts }) => {
  // posts.map(({ body }) => console.log(body.map({children})))
  // post.map(({ title, description }) => console.log(title, desription))
  const router = useRouter()
  const translate = useTranslate(router.locale)
  const jobsItems: JobItems = posts.map(
    ({ _id, description, tags, title, imageUrl, slug }) => {
      const newJobItem = {
        id: _id,
        title,
        description,
        img: { _alt: 'ipsum', src: imageUrl },
        slug,
        tags,
      }
      return newJobItem
    }
  )

  const handleShowCaseCardClick = (slug: string) => {
    router.push(router.pathname + `/${slug}`)
  }

  return (
    <>
      <Head>
        <title>{translate('jobs').head.headTitle}</title>
        <meta
          name="description"
          content={translate('jobs').head.headDescription}
        />
      </Head>
      <Box h="100%" padding="3em" id="jobs-container">
        <Flex
          id="jobs-wrapper"
          alignItems="flex-start"
          justifyContent="space-evenly"
          h="100%"
          margin="auto"
          flexWrap="wrap"
          rowGap="1em"
        >
          {jobsItems.map(({ id, slug, tags, description, img, title }) => {
            return (
              <ShowCaseCard
                onClick={handleShowCaseCardClick}
                slug={slug}
                key={id}
                tags={tags}
                description={description}
                title={title}
                img={img}
                createdAt="new"
              />
            )
          })}
        </Flex>
      </Box>
    </>
  )
}
export default Jobs
// export async function getStaticProps() {

//   // It's important to default the slug so that it doesn't return "undefined"
//   const post = await client.fetch(
//     `
//     *[_type == "post" && slug.current == $slug][0]
//   `,
//     { slug }
//   )
//   return {
//     props: {
//       post
//     }
//   }
// }
