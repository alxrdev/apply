import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'

import customTheme from '../styles/theme'

interface ThemeContainerProps {
  children: ReactNode
}

export default function ThemeContainer ({ children }: ThemeContainerProps) {
  return (
    <ChakraProvider theme={customTheme}>
      { children }
    </ChakraProvider>
  )
}
