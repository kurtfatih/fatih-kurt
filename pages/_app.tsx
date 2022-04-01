import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { NavBar } from '../components/Navbar'
import { chakraConfig } from '../lib/chakra'
import { Fonts } from '../components/Fonts'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { Section } from '../components/Section'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/google/gtag'

const theme = extendTheme({
  ...chakraConfig,
})
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (process.env.NODE_ENV === 'production') gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Layout>
        <Header>
          <NavBar />
        </Header>
        <Section>
          <Component {...pageProps} />
        </Section>
      </Layout>
    </ChakraProvider>
  )
}

// MyApp.getInitialProps = async (appContext: any) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const pageProps = await App.getInitialProps(appContext)

//   return { ...pageProps }
// }

export default MyApp
