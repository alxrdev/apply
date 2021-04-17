import React, { ReactNode } from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import { MdWork, MdQueryBuilder } from 'react-icons/md'

import { Job } from '../../types'
import JobEmployerAvatar from './JobEmployerAvatar'

interface JobItemProps {
  job: Job
}

export default function JobItem ({ job }: JobItemProps) {
  return (
    <Flex
      padding="1.1rem"
      margin="0 auto"
      marginBottom="20px"
      background="white"
      shadow="base"
      rounded="lg"
      cursor="pointer"
    >
      <JobEmployerAvatar avatar={job.user.avatar} />
        <Box
          flex="1"
          width="50"
          lineHeight="1.5rem"
          marginBottom="5px"
          marginLeft="10px"
        >
          <Heading
            as="h5"
            color="brand.200"
            fontSize="md"
            fontWeight="600"
          >
            {job.title}
          </Heading>

          <Text
            color="brand.300"
            as="span"
            fontSize="sm"
          >
            {`${job.user.name} - ${job.address.city}, ${job.address.state}`}
          </Text>

          <Text
            fontSize="sm"
            margin="10px 0"
            display={{ base: 'none', md: 'block' }}
          >
            {`${job.description.slice(0,160)}...`}
          </Text>

          <Flex
            alignItems={{ md: 'center' }}
            justifyContent="space-between"
            width="fit-content"
            marginTop="5px"
          >
            <JobItemMeta
              text={job.jobType}
              icon={<MdWork size={18} />}
            />

            <JobItemMeta
              text={Intl.DateTimeFormat('pt-BR').format(new Date(job.createdAt))}
              icon={<MdQueryBuilder size={18} />}
            />
          </Flex>
        </Box>
    </Flex>
  )
}

interface JobItemMetaProps {
  text: string
  icon ?: ReactNode
}

function JobItemMeta ({ text, icon }: JobItemMetaProps) {
  return (
    <Flex
      alignItems="center"
      marginRight="10px"
      color="brand.300"
    >
      {icon && (icon)}
      <Text
        as="span"
        marginLeft="5px"
        fontSize="sm"
      >
        {text}
      </Text>
    </Flex>
  )
}
