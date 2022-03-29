import { GlobalStyleProps } from '@chakra-ui/theme-tools'

// add an alias for object responsive prop
export const chakraConfig = {
  styles: {
    global: (props: GlobalStyleProps) => ({
      [`@media screen and (max-width: ${props.theme.breakpoints.xl})`]: {
        body: {
          backgroundPosition: '25%',
        },
      },
      body: {
        backgroundColor: 'rgba(0,0,0,0.76)',
        backgroundImage: `url(/bg.jpeg)`,
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
      },
      li: {
        listStyleType: 'none',
      },
      img: {
        borderRadius: '0.2em 0.2em 0 0',
      },
    }),
  },
  colors: {
    white: '#fff',
    black: '#000',
    purpleToBlue: 'linear-gradient(90deg, #321825 4.42%, #012A46 100%)',
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  fontSizes: {
    xs: '0.813em',
    sm: '1em',
    md: '1.5em',
    l: '2em',
    xl: '3em',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    normal: 400,
    bold: 700,
  },
  lineHeights: {
    normal: 'normal',
    short: '0.952em',
    base: '1em',
    medium: '2.344em',
    tall: '3.516em',
  },
  breakpoints: {
    xs: '0',
    sm: '387px',
    mds: '436px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    xxl: '1600px',
  },
}
