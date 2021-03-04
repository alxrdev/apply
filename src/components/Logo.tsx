import { Box, Image } from '@chakra-ui/react'
import Link from 'next/link'

export default function Logo () {
  return (
    <Box width="100%" maxWidth="100px">
      <Link href="/index">
        <Image src="/images/logo.svg" alt="Apply" />
      </Link>
    </Box>
  )
}
