import { ReactNode } from 'react'
import { Container, Flex } from '@chakra-ui/react'

import Logo from '../ui/Logo'
import HeaderNavigation from './HeaderNavigation'

interface HeaderProps {
  children?: ReactNode
}

export default function Header ({ children }: HeaderProps) {
  return (
    <Container
      maxW="full"
      background="white"
      borderBottom="1px"
      borderBottomStyle="solid"
      borderBottomColor="brand.600"
    >
      <Container maxWidth="container.xl">
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={{ base: '.3rem 0', lg: '.3rem 1.6rem' }}
        >
          <Logo />
          <HeaderNavigation />
        </Flex>
        { children }
      </Container>
    </Container>
  )
}
