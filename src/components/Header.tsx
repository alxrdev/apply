import { ReactNode } from 'react'
import { Container, Flex } from '@chakra-ui/react'

import Logo from './Logo'
import HeaderNavigation from './HeaderNavigation'

interface HeaderProps {
  children?: ReactNode
}

function Header ({ children }: HeaderProps) {
  return (
    <Container maxW="full" borderBottom="1px" borderBottomStyle="solid" borderBottomColor="brand.1400">
      <Container maxWidth="container.xl">
        <Flex direction="row" justifyContent="space-between" alignItems="center" padding={{ base: '.3rem 0', lg: '.3rem 1.6rem' }}>
          <Logo />
          <HeaderNavigation />
        </Flex>

        { children }
      </Container>
    </Container>
  )
}

export default Header
