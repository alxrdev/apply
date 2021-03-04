import Link from 'next/link'
import { Text } from '@chakra-ui/react'

interface CustomLinkProps {
  href: string
  text: string
}

export default function CustomLink ({ href, text }: CustomLinkProps) {
  return (
    <Link href={href}>
      <Text
        as="span"
        color="brand.900"
        textDecoration="none"
        cursor="pointer"
        display="inline"
      >
        { text }
      </Text>
    </Link>
  )
}
