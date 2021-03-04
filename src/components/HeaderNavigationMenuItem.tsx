import { Text, ListItem } from '@chakra-ui/react'
import Link from 'next/link'

interface MenuItemProps {
  text: string
  href: string
}

export default function HeaderNavigationMenuItem ({ text, href }: MenuItemProps) {
  return (
    <ListItem>
      <Link href={href}>
        <Text
          as="span"
          padding="0.5rem 1rem"
          marginLeft="10px"
          color="brand.700"
          fontSize="md"
          textDecoration="none"
          cursor="pointer"
          borderBottom="2px"
          borderBottomStyle="solid"
          borderBottomColor="transparent"
          _hover={{
            borderBottomColor: 'brand.800'
          }}
        >
          { text }
        </Text>
      </Link>
    </ListItem>
  )
}
