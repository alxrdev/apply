import Link from 'next/link'
import { Text, TextProps } from '@chakra-ui/react'

interface CustomLinkProps extends TextProps {
  href: string
  text: string
}

export default function CustomLink ({ href, text, ...otherProps }: CustomLinkProps) {
  return (
    <Link href={href}>
      <Text
        as="span"
        color="brand.50"
        textDecoration="none"
        cursor="pointer"
        display="inline"
        fontSize="sm"
        { ...otherProps }
      >
        { text }
      </Text>
    </Link>
  )
}
