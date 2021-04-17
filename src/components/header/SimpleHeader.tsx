import { Box } from '@chakra-ui/react'
import Logo from '../ui/Logo'

export default function SimpleHeader () {
  return (
    <Box
      width="100%"
      maxWidth="700px"
      padding="1.5rem 0 0 0"
      margin="2rem auto 0 auto"
      textAlign="center"
    >
      <Logo maxWidth="150px" />
    </Box>
  )
}
