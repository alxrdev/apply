import { Text } from '@chakra-ui/react'
import Link from 'next/link'

interface HeaderSignInButtonProps {
  text: string
  href: string
}

export default function HeaderSignInButton ({ text, href }: HeaderSignInButtonProps) {
  return (
    <Link href={href} passHref>
      <Text
        as="span"
        display={{ md: 'none' }}
        padding="0.4rem 0.7rem"
        color="brand.50"
        textDecoration="none"
        fontWeight="700"
        fontSize="sm"
        border="1px"
        borderStyle="solid"
        borderColor="brand.50"
        borderRadius="8px"
        transition="ease 0.3s"
        cursor="pointer"
        _hover={{
          backgroundColor: 'brand.50',
          color: '#fff'
        }}
      >
        { text }
      </Text>
    </Link>
  )
}
