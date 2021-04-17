import React from 'react'
import { Image } from '@chakra-ui/image'
import { Box, BoxProps } from '@chakra-ui/layout'

interface JobEmployerAvatarProps extends BoxProps {
  avatar: string
}

export default function JobEmployerAvatar ({ avatar, ...otherProps }: JobEmployerAvatarProps) {
  return (
    <Box
      maxWidth={{ base: '50px', sm: '80px' }}
      marginRight="10px"
      { ...otherProps }
    >
      <Image
        borderRadius=".4rem"
        src={avatar}
      />
    </Box>
  )
}
