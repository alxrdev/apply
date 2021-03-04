import { UnorderedList } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface HeaderNavigationProps {
  children: ReactNode
}

export default function HeaderNavigationMenu ({ children }: HeaderNavigationProps) {
  return (
    <UnorderedList display={{ base: 'none', md: 'flex' }} listStyleType="none">
      { children }
    </UnorderedList>
  )
}
