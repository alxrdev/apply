import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'
import { Box, Flex, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { FiLogOut, FiUser } from 'react-icons/fi'

import { useAuth } from '../../hooks'

import HeaderSignInButton from './HeaderSignInButton'
import HeaderNavigationMenu from './HeaderNavigationMenu'
import HeaderNavigationMenuItem from './HeaderNavigationMenuItem'

export default function HeaderNavigation () {
  const { user } = useAuth()

  return (
    <Box>
      { !user
        ? (<HeaderNavigationDefaultMenu />)
        : (<HeaderNavigationUserMenu />)
      }
    </Box>
  )
}

function HeaderNavigationDefaultMenu () {
  return (
    <>
      <HeaderNavigationMenu>
        <HeaderNavigationMenuItem text="Apply for a job (Free!)" href="/signin" />
        <HeaderNavigationMenuItem text="Register a job" href="/signup" />
      </HeaderNavigationMenu>
      <HeaderSignInButton text="Sign In" href="/signin" />
    </>
  )
}

function HeaderNavigationUserMenu () {
  const { user } = useAuth()
  const route = useRouter()

  return (
    <Flex alignItems="center">
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            fontSize="sm"
            backgroundColor="brand.600"
            color="brand.200"
            icon={
              <Image
                src={user.avatar}
                alt={user.name}
                width="100%"
                maxWidth="40px"
                height="40px"
                borderRadius="100%"
                fontSize="sm"
              />
            }
          />
          <MenuList>
            <MenuItem
              icon={<FiUser size={20} />}
              onClick={() => route.push('/profile')}
            >
              <Text as="span" fontSize="sm">Profile</Text>
            </MenuItem>
            <MenuItem
              icon={<FiLogOut size={20} />}
              onClick={() => signOut({ redirect: true })}
            >
              <Text as="span" fontSize="sm">Log out</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  )
}
