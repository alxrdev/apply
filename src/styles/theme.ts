import { extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  colors: {
    brand: {
      50: '#085ff7', // primary-color
      100: '#0044e3', // primary-color-dark
      200: '#4b4b4b', // text-color
      300: '#a0a0a0', // text-color-light
      400: '#000000', // title-color
      500: '#a0a0a0', // gray
      600: '#f2f2f2' // gray-light
    }
  },
  fonts: {
    body: 'Poppins',
    heading: 'Poppins'
  },
  styles: {
    global: {
      body: {
        fontSize: '1.6rem',
        fontWeight: '500',
        color: 'brand.200',
        background: 'brand.600'
      },
      input: {
        fontSize: '1.6rem',
        fontWeight: '500'
      },
      select: {
        fontSize: '1.6rem',
        fontWeight: '500'
      },
      button: {
        fontSize: '1.6rem',
        fontWeight: '500'
      }
    }
  }
})

export default customTheme
