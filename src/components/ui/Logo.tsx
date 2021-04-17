import { Box, Image } from '@chakra-ui/react'
import Link from 'next/link'

interface LogoProps {
  maxWidth?: string
}

export default function Logo ({ maxWidth = '100px' }: LogoProps) {
  return (
    <Box
      maxWidth={maxWidth}
      cursor="pointer"
      display="inline-block"
    >
      <Link href="/">
        <Image src="/images/logo.svg" alt="Apply" />
      </Link>
    </Box>
  )
}
