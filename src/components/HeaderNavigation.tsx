import { Box, Flex, Image } from '@chakra-ui/react'
// import { FiLogOut, FiUser } from 'react-icons/fi'

import { useAuth } from '../hooks'
import HeaderLoginButton from './HeaderLoginButton'
import HeaderNavigationMenu from './HeaderNavigationMenu'
import HeaderNavigationMenuItem from './HeaderNavigationMenuItem'

export default function HeaderNavigation () {
  const { user } = useAuth()

  return (
    <Box>
      { !user
        ? (
          <>
            <HeaderNavigationMenu>
              <HeaderNavigationMenuItem text="Apply for a job (Free!)" href="/login" />
              <HeaderNavigationMenuItem text="Register a job" href="/signup" />
            </HeaderNavigationMenu>
            <HeaderLoginButton text="Log In" href="/login" />
          </>
          )
        : (
          <Flex alignItems="center">
            <Image
              src="https://github.com/alxrdev.png"
              alt="Alex Rodrigues Moreira"
              width="100%"
              maxWidth="36px"
              height="36px"
              marginRight="5px"
              border="1px"
              borderStyle="solid"
              borderColor="brand.1300"
              borderRadius="1.1rem"
            />
          </Flex>
          ) }
    </Box>
  )
}
