import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { NavBar } from '../components/Navbar'
import { chakraConfig } from '../config/chakraConfig'
import { Fonts } from '../components/Fonts'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { Section } from '../components/Section'

const theme = extendTheme({
  ...chakraConfig,
})
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />

      {/* Navbar */}
      <Layout>
        <Header>
          <NavBar />
        </Header>
        <Section>
          <Component {...pageProps} />
        </Section>
      </Layout>
      {/* Content */}
      {/* Footer */}
    </ChakraProvider>
  )
}

// MyApp.getInitialProps = async (appContext: any) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const pageProps = await App.getInitialProps(appContext)

//   return { ...pageProps }
// }

export default MyApp
