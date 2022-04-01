import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_PROJECT_DATA_SET, // or the name you chose in step 1
  useCdn: process.env.SANITY_PROJECT_USE_CDN, // `false` if you want to ensure fresh data
  apiVersion: process.env.SANITY_PROJECT_API_VERSION,
})
