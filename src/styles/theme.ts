import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#085ff7', // primary-color
    800: '#0044e3', // primary-color-dark
    1000: '#4b4b4b', // text-color
    1100: '#a0a0a0', // text-color-light
    1200: '#000000', // title-color
    1300: '#a0a0a0', // gray
    1400: '#f2f2f2' // gray-light
  }
}

const customTheme = extendTheme({
  colors,
  fonts: {
    body: 'Poppins',
    heading: 'Poppins'
  },
  styles: {
    global: {
      body: {
        fontSize: '1.6rem',
        fontWeight: '500',
        color: 'brand.1000'
      },
      input: {
        fontSize: '1.6rem',
        fontWeight: '500',
        color: 'brand.1000'
      },
      button: {
        fontSize: '1.6rem',
        fontWeight: '500',
        color: 'brand.1000'
      }
    }
  }
})

export default customTheme
